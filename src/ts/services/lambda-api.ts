import { GetChampions } from '../../lambda/get-champions';

const functionPath = (name: string) => `/.netlify/functions/${name}`;

/**
 * All lambdas are listed and can be called here.
 */
export class LambdaApi {
  getChampions = (): Promise<GetChampions> =>
    fetch(functionPath('get-champions'))
      .then(response => response.json())
}

export default new LambdaApi();
