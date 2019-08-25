import * as ddragon from '../utils/ddragon';
import lambdaApi from './lambda-api';
import * as riotApi from '../../lambda/utils/riot-api';
import randomBiased from '../utils/random-biased';

/**
 * To make it mockable.
 */
export type ChampionServiceApi = {
  getChampions: () => Promise<ddragon.Champion[]>;
  getSummonerMatches: (summonerName: string) => Promise<riotApi.Match[]>;
}

export class ChampionService {

  /**
   * Cached champions, so that the api only has to be called once.
   */
  champions: Promise<ddragon.Champion[]>;

  /**
   * Cached matches for summoners. Avoid multiple equal api requests.
   */
  summonerMatches: Map<string, Promise<riotApi.Match[]>> = new Map();


  constructor(private api: ChampionServiceApi) {
    this.champions = this.api.getChampions();
  }

  /**
   * @param tag Only include champions of a specific type
   */
  getRandomChampion = (tag?: ddragon.ChampionTag, summonerName?: string): Promise<ddragon.Champion> =>
    this.champions
      // Filter champs by type
      .then(champs => this.filterChampionsByTag(champs, tag))
      .then(champs => {
        if (!summonerName) {
          const randomIndex = Math.floor(Math.random() * champs.length);
          return champs[randomIndex];
        } else {
          return this.getSummonerMatches(summonerName)
            .then(matches => {
              if (!matches)
                return Promise.reject();
              const championBiases = this.getChampionBiases(champs, matches);
              const biasesOnly = championBiases.map(([_, bias]) => bias);
              const randomIndex = randomBiased(biasesOnly);
              return this.getChampionByKey(championBiases[randomIndex][0].toString());
            }).then(randomChamp =>
              // Just in case no champion was found, try getting one without summoner name
              randomChamp || this.getRandomChampion(tag)
            ).catch(() => this.getRandomChampion(tag));
        }
      });

  getChampionByName = (name: string): Promise<ddragon.Champion | undefined> =>
    this.champions
      .then(champions => champions.find(champ => champ.name === name));

  /**
   * Champion key is a number as string.
   */
  getChampionByKey = (key: string): Promise<ddragon.Champion | undefined> =>
    this.champions
      .then(champions => champions.find(champ => champ.key === key));

  /**
   * @param tag If undefined, the list will not be filtered at all.
   */
  private filterChampionsByTag = (champions: ddragon.Champion[], tag?: ddragon.ChampionTag): ddragon.Champion[] =>
    !tag ? champions :
      champions.filter(({ tags }) =>
        tags.map(tag => tag.toLowerCase())
          .includes(tag.toLowerCase())
      );

  /**
   * In order to bias champions depending on how often and when they were played,
   * this function adds a weight to each champion.
   * @return [champion key, bias]
   */
  private getChampionBiases = (champions: ddragon.Champion[], matches: riotApi.Match[]): [number, number][] => {
    const biases = new Map<number, number>();

    const increaseBias = (champion: number, increaseBy: number) => {
      const current = biases.get(champion) || 0;
      biases.set(champion, current + increaseBy);
    }

    const biasByFrequency = () => {
      // Every champion key along with the number of times played
      const frequencies = matches.reduce<{ [champ: number]: number }>((prev, current) => {
        prev[current.champion] = (prev[current.champion] || 0) + 1;
        return prev;
      }, {});

      Object.keys(frequencies).forEach(champStr => {
        // Number conversion only for typescript stupidity. In fact it is already a number.
        const champ = Number(champStr);
        const frequency = frequencies[champ];
        increaseBias(champ, frequency);
      });
    }

    // TODO
    // const biasByTime = () =>
    //   matches.forEach(match => {
    //     const increaseBy = 0;
    //     increaseBias(match.champion, increaseBy)
    //   });

    biasByFrequency();

    const biasesArray = Array.from(biases.entries());
    // Sort by biases
    biasesArray.sort(([_, a], [__, b]) => a - b);
    return biasesArray;
  }

  private getSummonerMatches = (summonerName: string): Promise<riotApi.Match[]> => {
    let matchesPromise = this.summonerMatches.get(summonerName);
    if (!matchesPromise) {
      matchesPromise = this.api.getSummonerMatches(summonerName)
      this.summonerMatches.set(summonerName, matchesPromise);
    }
    return matchesPromise;
  }
}

/**
 * Default api using lambda.
 */
const api: ChampionServiceApi = {
  getChampions: lambdaApi.getChampions,
  getSummonerMatches: lambdaApi.getSummonerMatches
}

export default new ChampionService(api);
