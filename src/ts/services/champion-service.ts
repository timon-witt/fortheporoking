import * as ddragon from '../utils/ddragon';
import lambdaApi from './lambda-api';

/**
 * To make it mockable.
 */
export type ChampionServiceApi = {
  getChampions: () => Promise<ddragon.Champion[]>;
}

export class ChampionService {
  champions: Promise<ddragon.Champion[]>;

  constructor(private api: ChampionServiceApi) {
    this.champions = this.api.getChampions();
  }

  /**
   * @param type Only include champions of a specific type
   */
  getRandomChampion = (type?: ddragon.ChampionTag): Promise<ddragon.Champion> =>
    this.champions
      // Filter champs by type
      .then(champs => !type
        ? champs
        : champs.filter(({ tags }) => tags
          .map(tag => tag.toLowerCase())
          .includes(type.toLowerCase())
        )
      )
      .then(champs => {
        const randomIndex = Math.floor(Math.random() * champs.length);
        return champs[randomIndex];
      });

  getSpecificChampion = (id: string): Promise<ddragon.Champion | undefined> =>
    this.champions
      .then(champions => champions.find(({ name }) => name === id));
}

/**
 * Default api using lambda.
 */
const api: ChampionServiceApi = {
  getChampions: lambdaApi.getChampions
}

export default new ChampionService(api);
