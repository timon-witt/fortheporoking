import { Context } from 'aws-lambda';
import riotApi, { Match } from './utils/riot-api';

/**
 * Returned body of get-summoner-matches function.
 */
export type GetSummonerMatches = Match[];

/**
 * get-summoner-matches lambda function.
 * Returns a summoners matches from the last 30 days.
 */
export async function handler(event: AWSLambda.APIGatewayEvent) {
  try {
    const summonerNameParam = 'summonerName';

    if (!riotApi) {
      throw new Error('could not connect to riot api');
    } else if (!event.queryStringParameters || !event.queryStringParameters[summonerNameParam]) {
      throw new Error('no summoner name spcified');
    }

    const api = riotApi;  // redeclare to not have undefined warnings in promises below
    const summonerName = event.queryStringParameters[summonerNameParam];

    const matches = await api.getSummonerByName(summonerName)
      .then(summoner => api.getMatchesLast30Days(summoner.accountId))
      // Filter aram and butchers bridge aram
      .then(matches => matches.filter(({ queue }) => queue !== 450 && queue !== 100))
      .catch(e => { throw new Error(e) })

    return ({
      statusCode: 200,
      body: JSON.stringify(matches || {})
    });

  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: JSON.stringify(err) })
    };
  }
}
