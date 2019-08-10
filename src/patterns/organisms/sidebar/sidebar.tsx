import React from 'react';
import './sidebar.scss';
import { Link, NavLink } from 'react-router-dom';

export type SidebarProps = {

};

export const Sidebar: React.FC<SidebarProps> = (_props: SidebarProps) => {
  return (
    <div className="Sidebar">
      <div>
        <Link to="/" className="Sidebar-logo">Troll Pick</Link>
        <div className="Sidebar-introduction">
          Get a random champion
        </div>
      </div>
      <div className="Sidebar-primary">
        <NavLink exact activeClassName="is-active" to="/" className="Sidebar-button Sidebar-primaryButton">Any Champion</NavLink>
        <NavLink activeClassName="is-active" to="/fighter" className="Sidebar-button Sidebar-primaryButton">Fighter</NavLink>
        <NavLink activeClassName="is-active" to="/tank" className="Sidebar-button Sidebar-primaryButton">Tank</NavLink>
        <NavLink activeClassName="is-active" to="/mage" className="Sidebar-button Sidebar-primaryButton">Mage</NavLink>
        <NavLink activeClassName="is-active" to="/assassin" className="Sidebar-button Sidebar-primaryButton">Assassin</NavLink>
        <NavLink activeClassName="is-active" to="/support" className="Sidebar-button Sidebar-primaryButton">Support</NavLink>
        <NavLink activeClassName="is-active" to="/marksman" className="Sidebar-button Sidebar-primaryButton">Marksman</NavLink>
      </div>
      <div className="Sidebar-secondary">
        <Link to="/impressum" className="Sidebar-button Sidebar-secondaryButton">Impressum</Link>
        <a href="https://github.com/timon-witt/trollpick" className="Sidebar-button Sidebar-secondaryButton">GitHub</a>
      </div>
    </div>
  );
}
