export type Champion = {
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  tags: ChampionTag[];
  // There are more attributes, but don't need them
};

export type ChampionTag = 'Fighter' | 'Tank' | 'Mage' | 'Assassin' | 'Support' | 'Marksman';

export const urls = {
  versions: 'https://ddragon.leagueoflegends.com/api/versions.json',
  champions: (version: string) => `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`,
  splashart: (championId: string) => `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_0.jpg`
}
