const titles = ['Let\'s troll', 'Shit happens', 'Teemo FTW'];

/**
 * TODO: Impressum and Contact should not have random titles
 */
export const setRandomPageTitle = () => {
  const randomIndex = Math.floor(Math.random() * titles.length);
  const title = titles[randomIndex];
  document.title = title;
}
