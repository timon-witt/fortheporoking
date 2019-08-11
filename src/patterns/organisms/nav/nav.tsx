import React, { ChangeEvent, KeyboardEvent } from 'react';
import './nav.scss';
import { Link, NavLink } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router';

export class Nav extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div className="Nav">
        <div>
          <Link to="/" className="Nav-logo">Troll Pick</Link>
          <div className="Nav-introduction">
            Get a random champion
        </div>
        </div>
        <div className="Nav-summoner">
          <div className="Nav-summonerDescription">
            Only want champs that you recently played? Enter your summoner name below.
          </div>
          <input type="text" placeholder="Your summoner name" onBlur={this.onSummonerBlur}
            onKeyPress={this.onSummonerKeyPress} className="Nav-summonerInput"
          />
        </div>
        <div className="Nav-primary">
          <NavLink exact activeClassName="is-active" to="/" className="Nav-button Nav-primaryButton">Any Champion</NavLink>
          <NavLink activeClassName="is-active" to="/fighter" className="Nav-button Nav-primaryButton">Fighter</NavLink>
          <NavLink activeClassName="is-active" to="/tank" className="Nav-button Nav-primaryButton">Tank</NavLink>
          <NavLink activeClassName="is-active" to="/mage" className="Nav-button Nav-primaryButton">Mage</NavLink>
          <NavLink activeClassName="is-active" to="/assassin" className="Nav-button Nav-primaryButton">Assassin</NavLink>
          <NavLink activeClassName="is-active" to="/support" className="Nav-button Nav-primaryButton">Support</NavLink>
          <NavLink activeClassName="is-active" to="/marksman" className="Nav-button Nav-primaryButton">Marksman</NavLink>
          <NavLink activeClassName="is-active" to="/fuckThisShit" className="Nav-button Nav-primaryButton">Fuck this shit</NavLink>
        </div>
        <div className="Nav-secondary">
          <Link to="/impressum" className="Nav-button Nav-secondaryButton">Impressum</Link>
          <a href="https://github.com/timon-witt/trollpick"
            className="Nav-button Nav-secondaryButton"
            target="_blank"
            rel="noopener noreferrer"
          >GitHub</a>
        </div>
      </div>
    )
  }

  private onSummonerBlur = (e: ChangeEvent<HTMLInputElement>): void => {
    e.target.blur();
    this.props.history.push(`?summoner=${e.target.value}`)
  }

  private onSummonerKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.which === 13) {
      e.currentTarget.blur();
    }
  }
}

export default withRouter(Nav);
