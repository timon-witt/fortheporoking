import React, { ReactNode } from 'react';
import * as ddragon from '../../../ts/utils/ddragon';
import { RouteComponentProps } from 'react-router';
import services from '../../../ts/services/services';
import { setRandomPageTitle } from '../../../ts/utils/random-page-title';

import './champion-page.scss';

type ChampionPageParams = {
  championTag: ddragon.ChampionTag
}

export type ChampionPageProps = RouteComponentProps<ChampionPageParams>;

type ChampionPageState = {
  champion?: ddragon.Champion;
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
    if(prevProps.location.key !== this.props.location.key){
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
      </div>
    );
  }

  /**
   * May be called from constructor or componentDidUpdate.
   */
  private init = (props: ChampionPageProps) => {
    // Get a random champion 
    services.championService.getRandomChampion(props.match.params.championTag)
      .then(champ => this.setState({ champion: champ }));

    // Set random page title
    setRandomPageTitle();
  }
}
