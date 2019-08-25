import ddragonApi from './utils/ddragon-api';
import { Champion } from '../ts/ddragon';

/**
 * Returned body of get-champions function.
 */
export type GetChampions = Champion[];

/**
 * get-champions lambda function.
 */
export async function handler() {
  try {
    const result: GetChampions = await ddragonApi.champions
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: JSON.stringify(err) })
    };
  }
}
