import React from 'react';
import services from '../../../ts/services/services';
import { DialogueScene, DialogueContentInputOption, SetScene } from '../../molecules/dialogue-content/dialogue-content';
import localStorageKeys from '../../../ts/local-storage-keys';

const onSummonerNameInput = (summonerName: string, setScene: SetScene) => {
  localStorage.setItem(localStorageKeys.summonerName, summonerName);
  scenes.assignChampFirstTime(summonerName).then(setScene);
}

const onResetSummoner = (setScene: SetScene) => {
  localStorage.removeItem(localStorageKeys.summonerName);
  setScene(scenes.changeSummoner());
}

export const scenes = {
  welcomeStranger: (): DialogueScene => ({
    text: 'Who disturbs the Poro King? Is it an audience you desire? What\'s your summoner name?',
    options: [
      {
        render: setScene => {
          const onSubmit = (summonerName: string) => onSummonerNameInput(summonerName, setScene);
          return <DialogueContentInputOption placeholder="Summoner name" onSubmit={onSubmit} />;
        }
      },
      {
        text: 'Sorry, my King, I can’t tell my name. Not here.',
        onClick: setScene => scenes.assignChampStranger().then(setScene)
      }
    ]
  }),
  welcome: (summonerName: string): DialogueScene => ({
    text: <span>Welcome back, <strong>{summonerName}</strong>! How are you doing today?</span>,
    options: [
      {
        text: 'I am very vell, my King. Please tell me, which champion is it that you desire me to play today?',
        onClick: setScene => scenes.assignChamp(summonerName).then(setScene)
      },
      {
        text: <span><strong>{summonerName}</strong>? I am sorry, my King, but you must be mistaking me with another summoner.</span>,
        onClick: onResetSummoner
      }
      // TODO: Special requirements option
    ]
  }),
  selfExplanationStranger: (): DialogueScene => ({

  }),
  changeSummoner: (): DialogueScene => ({
    text: 'Well then, who am I talking to?',
    options: [
      {
        render: setScene => {
          const onSubmit = (summonerName: string) => onSummonerNameInput(summonerName, setScene);
          return <DialogueContentInputOption placeholder="Summoner name" onSubmit={onSubmit} />;
        }
      },
      {
        text: 'I am sorry, but I can’t tell my name. Not here.',
        onClick: setScene => scenes.assignChampStranger().then(setScene)
      }
    ]
  }),
  assignChampStranger: async (): Promise<DialogueScene> => {
    const champ = await services.championService.getRandomChampion()
    return {
      text: (
        <span>
          Well then, we are in a war and as I don’t know you,
          I have to assign you a random champion. I want you to join the
          battle with <strong>{champ.name}</strong>. An epic fight awaits you, I can feel it!
        </span>
      ),
    };
  },
  assignChampFirstTime: async (summonerName: string): Promise<DialogueScene> => {
    const champ = await services.championService.getRandomChampion(undefined, summonerName);
    return {
      text: (
        <span>
          The famous <strong>{summonerName}</strong>?
          Known for the greatest <strong>{champ.name}</strong> playstyle accross the entire kingdome?
          I need to see you in action, right now!
        </span>
      ),
      options: [{
        text: <span>I am going to show you my <strong>{champ.name}</strong> skills. Thank you so much, great poro king!</span>,
        onClick: () => {
          // TODO: Save champ in local storage and let poro king react on it next time
        }
      }, {
        text: <span>My king, I have some <strong>special requirements</strong> today, if that may be ok for you.</span>,
        onClick: setScene => setScene(scenes.specialRequirements())
      }]
    };
  },
  assignChamp: async (summonerName: string): Promise<DialogueScene> => {
    const champ = await services.championService.getRandomChampion(undefined, summonerName)
    return {
      text: (
        <span>
          <strong>{summonerName}</strong>, now that you ask,
          I have special needs today for a <strong>{champ.name}</strong>. It would be a pleasure
          to see you on the battlefield with that champion. Especially knowing that you are astonishing talented.
        </span>
      )
    };
  },
  specialRequirements: (): DialogueScene => ({
    text: <span>And what may those special requirements be?</span>
  })
}
