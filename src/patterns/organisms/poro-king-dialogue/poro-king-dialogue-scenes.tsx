import React from 'react';
import services from '../../../ts/services/services';
import { DialogueScene, DialogueContentInputOption, SetScene } from '../../molecules/dialogue-content/dialogue-content';
import localStorageKeys from '../../../ts/local-storage-keys';

const onSummonerNameInput = (summonerName: string, setScene: SetScene) => {
  localStorage.setItem(localStorageKeys.summonerName, summonerName);
  scenes.assignChampFirstTimeSummoner(summonerName).then(setScene);
}

const onResetSummoner = (setScene: SetScene) => {
  localStorage.removeItem(localStorageKeys.summonerName);
  setScene(scenes.changeSummoner());
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
        text: 'Sorry, my King, I can’t tell my name. Not here.',
        onClick: setScene => scenes.assignChampUnknownSummoner().then(setScene)
      }
    ]
  }),
  welcomeWithKnownSummoner: (summonerName: string): DialogueScene => ({
    text: <span>Welcome back, <strong>{summonerName}</strong>! How are you doing today?</span>,
    options: [
      {
        text: 'I am very vell, my King. With what champion may I assist you today?',
        onClick: setScene => scenes.assignChampReturningSummoner(summonerName).then(setScene)
      },
      {
        text: <span><strong>{summonerName}</strong>?
          I am sorry, my King, but you must be mistaking me with another summoner.</span>,
        onClick: onResetSummoner
      }
      // TODO: Special requirements option
    ]
  }),
  changeSummoner: (): DialogueScene => ({
    text: 'Well then, what is your name then?',
    options: [
      {
        render: setScene => {
          const onSubmit = (summonerName: string) => onSummonerNameInput(summonerName, setScene);
          return <DialogueContentInputOption placeholder="Summoner name" onSubmit={onSubmit} />;
        }
      },
      {
        text: 'I am sorry, but I can’t tell my name. Not here.',
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
  assignChampFirstTimeSummoner: (summonerName: string): Promise<DialogueScene> => {
    return services.championService.getRandomChampion(undefined, summonerName).then(champ => {
      return {
        text: <span>The famous <strong>{summonerName}</strong>?
          Known for her great <strong>{champ.name}</strong> playstyle?
          I need to see you in action!</span>
      }
    });
  },
  assignChampReturningSummoner: (summonerName: string): Promise<DialogueScene> => {
    return services.championService.getRandomChampion(undefined, summonerName).then(champ => {
      return {
        text: <span><strong>{summonerName}</strong>, now that you ask,
          I have special needs today for a <strong>{champ.name}</strong>. It would be a pleasure
          to see you on the battlefield with that champion. Especially knowing that you are astonishing talented.
        </span>
      }
    });
  },
}
