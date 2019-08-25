import fetch from 'node-fetch';
import { Champion, urls } from '../../ts/ddragon';

/**
 * This component acts as an api to ddragon.
 * It also caches the results so that as few requests as possible are made.
 */
class DdragonApi {
  public champions: Promise<Champion[]>
  private version: Promise<string>;

  constructor() {
    this.version = this.fetchLatestVersion();
    this.champions = this.fetchChampions();
  }

  private fetchChampions(): Promise<Champion[]> {
    return this.version.then(version =>
      fetch(urls.champions(version))
        .then(response => response.json())
        .then(({ data }: { data: { [champId: string]: Champion } }) =>
          Object.keys(data)
            .map(id => data[id])
        )
    );
  }

  private fetchLatestVersion = (): Promise<string> =>
    fetch(urls.versions)
      .then(response => response.json())
      .then((versions: string[]) => versions[0]);
}

export default new DdragonApi();
