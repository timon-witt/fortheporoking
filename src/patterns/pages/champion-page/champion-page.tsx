import React, { ReactNode } from 'react';
import * as ddragon from '../../../ts/utils/ddragon';
import { RouteComponentProps } from 'react-router';
import services from '../../../ts/services/services';
import { setRandomPageTitle } from '../../../ts/utils/random-page-title';
import { parseQueryString } from '../../../ts/utils/query';

import './champion-page.scss';

type ChampionPageParams = {
  filter: ddragon.ChampionTag | 'fuckThisShit'
}

export type ChampionPageProps = RouteComponentProps<ChampionPageParams>;

type ChampionPageState = {
  champion?: ddragon.Champion;
  error?: boolean;
}

export class ChampionPage extends React.Component<ChampionPageProps, ChampionPageState> {

  constructor(props: ChampionPageProps) {
    super(props);
    this.state = {};
    this.init(props);
  }

  /**
   * If champion page is already present and route params change, 
   * props are updated instead of instantiating a new component.
   */
  componentDidUpdate(prevProps: ChampionPageProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.init(this.props);
    }
  }

  render(): ReactNode {
    const champ = this.state.champion;
    return (
      <div className="Page ChampionPage">
        {champ &&
          <img className="ChampionPage-splashart" src={ddragon.urls.splashart(champ.id)} alt="Champion Splashart" />
        }
        {this.state.error &&
          <div className="Page-content ChampionPage-error">
            <h1>Sorry, something seems broken...</h1>
          </div>
        }
      </div>
    );
  }

  /**
   * May be called from constructor or componentDidUpdate.
   */
  private init = (props: ChampionPageProps) => {
    const filter = props.match.params.filter;

    switch (filter) {
      case 'fuckThisShit':
        this.setTeemo();
        break;

      default:
        const summonerName = parseQueryString(this.props.location.search).get('summoner');
        this.setRandomChampion(filter, summonerName);
        break;
    }

    // Set random page title
    setRandomPageTitle();
  }

  private setRandomChampion = (tag?: ddragon.ChampionTag, summonerName?: string) =>
    services.championService.getRandomChampion(tag, summonerName)
      .then(this.setChampion);

  private setTeemo = () =>
    services.championService.getChampionByName('Teemo')
      .then(this.setChampion);

  /**
   * @param champion undefined is allowed to show error message.
   */
  private setChampion = (champion: ddragon.Champion | undefined) => {
    this.setState({ champion, error: !champion });
  }
}
