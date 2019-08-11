import fetch from 'node-fetch';

export class RiotApi {

  /**
   * @param apiKey If undefined all requests will reject.
   */
  constructor(private apiKey: string | undefined) { }

  getSummonerByName = (summonerName: string): Promise<Summoner> =>
    this.fetch(`summoner/v4/summoners/by-name/${summonerName}`);

  getMatchesLast30Days = (accountId: string): Promise<Match[]> => {
    const beginTime = Date.now() - 1000 * 60 * 60 * 24 * 30;  // 30 days ago
    return this.fetch(`match/v4/matchlists/by-account/${accountId}?beginTime=${beginTime}`);
  }


  private fetch = (url: string): Promise<any> => {
    if (!this.apiKey) {
      return Promise.reject('No Riot API key specified');
    }

    const urlWithoutLeadingSlash = url.replace(/^\//, '');

    return fetch(
      `https://euw1.api.riotgames.com/lol/${urlWithoutLeadingSlash}`,
      {
        headers: {
          'X-Riot-Token': this.apiKey
        }
      })
      .then(response => response.json());;
  }
}

const apiKey = process.env.LOL_API_KEY;
export default new RiotApi(apiKey);


/**
 * Return types of riot api.
 * Only including attributes we actually use here.
 */

export type Summoner = {
  accountId: string;
  name: string;
}

export type Match = {
  /**
   * Champion key
   */
  champion: number;
}
