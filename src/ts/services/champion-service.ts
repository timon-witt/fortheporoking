import * as ddragon from '../utils/ddragon';

export class ChampionService {
  champions: Promise<ddragon.Champion[]>;

  constructor() {
    // Fetch latest champions data
    this.champions = this.fetchLatestVersion()
      .then(this.fetchChampions);
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


  private fetchLatestVersion = () =>
    ddragon.getVersions()
      .then(versions => versions[0]);

  /**
   * Fetches champions from ddragon and brings them in array format.
   * The array format is much handier for our use case.
   */
  private fetchChampions = (version: string) =>
    ddragon.getChampions(version)
      .then(champs =>
        Object.keys(champs).map(id => champs[id])
      )
}
