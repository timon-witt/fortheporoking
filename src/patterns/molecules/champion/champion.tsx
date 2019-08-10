import React from 'react';

export type Champion = {
  name: string;
  title: string;
  splashart: string;
};

export type ChampionProps = {
  champion: Champion;
};

export const Champion: React.FC<ChampionProps> = (props: ChampionProps) => {
  return (
    <div className="Champion">
      <img src={props.champion.splashart} alt="Champion Splashart" />
      <div className="Champion-content">
        <div className="Champion-name">{props.champion.name}</div>
        <div className="Champion-title">{props.champion.title}</div>
      </div>
    </div>
  );
}
