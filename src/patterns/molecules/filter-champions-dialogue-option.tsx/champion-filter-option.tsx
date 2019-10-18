import React, { ReactNode } from 'react';
import './champion-filter-option.scss';
import * as ddragon from '../../../ts/ddragon';

const championTags: Record<ddragon.ChampionTag, { icon: string }> = {
  'Assassin': { icon: '/images/roles/assassin.png' },
  'Fighter': { icon: '/images/roles/fighter.png' },
  'Mage': { icon: '/images/roles/mage.png' },
  'Marksman': { icon: '/images/roles/marksman.png' },
  'Support': { icon: '/images/roles/support.png' },
  'Tank': { icon: '/images/roles/tank.png' }
}

export const championFilterOption = (onSelect: (filter: ddragon.ChampionTag) => void): ReactNode => {
  return (
    <div className="ChampionFilter DialogueOption DialogueOption--withBorder">
      I want you to assign me a special champion.

      <div className="ChampionFilter-buttons">
        {Object.keys(championTags).map(tag =>
          <button className="ChampionFilter-button" onClick={() => onSelect(tag as ddragon.ChampionTag)} key={tag}>
            <img src={championTags[tag as ddragon.ChampionTag].icon} alt="" className="ChampionFilter-buttonIcon"></img>
            {tag}
          </button>
        )}
      </div>
    </div>
  )
}
