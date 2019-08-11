import { GetChampions } from '../../lambda/get-champions';
import { GetSummonerMatches } from '../../lambda/get-summoner-matches';

const functionPath = (name: string, params?: string) => `/.netlify/functions/${name}${params || ''}`;

/**
 * All lambdas are listed and can be called here.
 */
export class LambdaApi {
  getChampions = (): Promise<GetChampions> =>
    fetch(functionPath('get-champions'))
      .then(response => response.json())

  getSummonerMatches = (summonerName: string): Promise<GetSummonerMatches> =>
    fetch(functionPath('get-summoner-matches', `?summonerName=${summonerName}`))
      .then(response => response.json())
}

export default new LambdaApi();
