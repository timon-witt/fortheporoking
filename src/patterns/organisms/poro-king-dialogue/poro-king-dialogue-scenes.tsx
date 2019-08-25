import React from 'react';
import services from '../../../ts/services/services';
import { DialogueScene, DialogueContentInputOption, SetScene } from '../../molecules/dialogue-content/dialogue-content';

const onSummonerNameInput = (summonerName: string, setScene: SetScene) => {
  scenes.assignChampKnownSummoner(summonerName).then(setScene);
}

export const scenes = {
  welcome: (): DialogueScene => ({
    text: 'Who disturbs the Poro King? Are you a summoner? What\'s your name?',
    options: [
      {
        render: setScene => {
          const onSubmit = (summonerName: string) => onSummonerNameInput(summonerName, setScene);
          return <DialogueContentInputOption placeholder="Summoner name" onSubmit={onSubmit} />;
        }
      },
      {
        text: 'Sorry, I can’t tell my name. Not here.',
        onClick: setScene => scenes.assignChampUnknownSummoner().then(setScene)
      }
    ]
  }),
  assignChampUnknownSummoner: (): Promise<DialogueScene> => {
    return services.championService.getRandomChampion().then(champ => {
      return {
        text: <span>Well then, we are in a war and as I don’t know you,
          I have to give you a random champion. I want you to join the
          battle with <strong>{champ.name}</strong>. An epic fight awaits you, I can feel it!</span>,
      }
    });
  },
  assignChampKnownSummoner: (summonerName: string): Promise<DialogueScene> => {
    return services.championService.getRandomChampion(undefined, summonerName).then(champ => {
      return {
        text: <span>The famous <strong>{summonerName}</strong>?
          Known for her great <strong>{champ.name}</strong> playstyle?
          I need to see you in action!</span>
      }
    });
  }
}
