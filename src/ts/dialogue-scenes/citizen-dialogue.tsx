import React from 'react';
import services from '../services/services';
import { DialogueScene, DialogueContentInputOption, SetScene } from '../../patterns/molecules/dialogue-content/dialogue-content';
import localStorageKeys from '../local-storage-keys';
import { strangerScenes } from './stranger-dialogue-scenes';
import { championFilterOption } from '../../patterns/molecules/filter-champions-dialogue-option.tsx/champion-filter-option';
import * as ddragon from '../ddragon';

/**
 * This "Citizen" dialogue and its scenes are used when the users summoner name is known.
 */
export class CitizenDialogue {

  constructor(private summonerName: string) { }

  onSummonerNameInput = (newSummonerName: string, setScene: SetScene) => {
    localStorage.setItem(localStorageKeys.summonerName, newSummonerName);
    this.summonerName = newSummonerName;
    this.scenes.assignChampFirstTime().then(setScene);
  }

  scenes = {
    welcome: (): DialogueScene => ({
      text: <span>Welcome back, <strong>{this.summonerName}</strong>! How are you doing today?</span>,
      options: [
        {
          text: 'I am very well, my King, and I am again in search for your wisdom, to show me my champion for the next game.',
          onClick: setScene => setScene(this.scenes.selfExplanation())
        },
        {
          text: <span><strong>{this.summonerName}</strong>? I am sorry, my King, but you must be mistaking me with another summoner.</span>,
          onClick: this.onResetSummoner
        }
      ]
    }),
    changeSummoner: (): DialogueScene => ({
      text: 'Well then, who am I talking to?',
      options: [
        {
          render: setScene => {
            return <DialogueContentInputOption
              placeholder="Summoner name"
              onSubmit={newSummonerName => this.onSummonerNameInput(newSummonerName, setScene)}
            />;
          }
        },
        {
          text: 'I am sorry, but I can’t tell my name. Not here.',
          onClick: setScene => setScene(strangerScenes.selfExplanation())
        }
      ]
    }),
    assignChampFirstTime: async (): Promise<DialogueScene> => {
      const champ = await services.championService.getRandomChampion(undefined, this.summonerName);
      return {
        text: (
          <span>
            The famous <strong>{this.summonerName}</strong>?
            Known for the greatest <strong>{champ.name}</strong> playstyle accross the entire kingdom?
            I need to see you in action, right now!
        </span>
        ),
        options: [{
          text: <span>If that is your wish, I am going to show you my <strong>{champ.name}</strong> skills next. Thank you for this great suggestion, poro king!</span>,
          onClick: setScene => setScene(this.scenes.championAccepted())
        }, {
          text: <span>My king, I am sorry to disappoint you, but I was hoping for a different kind of champion.</span>,
          onClick: setScene => setScene(this.scenes.selfExplanation())
        }]
      };
    },
    assignChamp: async (): Promise<DialogueScene> => {
      const champ = await services.championService.getRandomChampion(undefined, this.summonerName)
      return {
        text: (
          <span>
            I am glad that you are open to any champion, as I am in need for a <strong>{champ.name}</strong>. It would be a pleasure
            to see you on the battlefield with that champion, especially knowing that you are astonishing talented.
          </span>
        ),
        options: [
          {
            text: <span>Good choice, poro king! <strong>{champ.name}</strong> is just perfect. I will soon enter the rift.</span>,
            onClick: setScene => setScene(this.scenes.championAccepted())
          },
          {
            text: "Is there an alternative?",
            onClick: setScene => this.scenes.assignChampRepeated().then(setScene)
          },
          {
            text: "Hm, can I change my mind about the kind of champion that I would prefer today?",
            onClick: setScene => setScene(this.scenes.selfExplanation())
          }
        ]
      };
    },
    /**
     * @param times The number of times the user repeated this choice.
     */
    assignChampRepeated: async (times: number = 1): Promise<DialogueScene> => {
      const champ = await services.championService.getRandomChampion(undefined, this.summonerName)
      const repeatAgain = (setScene: SetScene) => this.scenes.assignChampRepeated(times + 1).then(setScene)

      if(times === 10) {
        return {
          text: <span>Oh my god! My patience has its limits. Decide for a champion already.</span>,
          options: [{
            text: "I... I am sorry, mighty poro king. I promise to decide soon.",
            onClick: repeatAgain
          }]
        }
      }

      return {
        text: times > 1
          ? <span><strong>{champ.name}</strong>?</span>
          : <span>You are a really special snowflake, aren't you? How about <strong>{champ.name}</strong>?</span>,
        options: [
          {
            text: <span>Now that looks better! I will soon enter the rift. See you afterwards.</span>,
            onClick: setScene => setScene(this.scenes.championAccepted())
          },
          {
            text: "Is there another alternative?",
            onClick: repeatAgain
          },
          {
            text: "Hm, can I change my mind about the kind of champion that I would prefer today?",
            onClick: setScene => setScene(this.scenes.selfExplanation())
          }
        ]
      };
    },
    assignChampFiltered: async (filter: ddragon.ChampionTag): Promise<DialogueScene> => {
      const champ = await services.championService.getRandomChampion(filter, this.summonerName)
      return {
        text: (
          <span>
            A <strong>{filter}</strong> shall it be. More concretely spoken, the champion I suggest to you is <strong>{champ.name}</strong>.
            I know that you are quite good with him and I want to see more.
          </span>
        ),
        options: [
          {
            text: <span>What a perfect example of a <strong>{filter}</strong>. Good choice, poro king! I will soon enter the rift.</span>,
            onClick: setScene => setScene(this.scenes.championAccepted())
          },
          {
            text: "Is there an alternative?",
            onClick: setScene => this.scenes.assignChampFilteredRepeated(filter).then(setScene)
          },
          {
            text: "Hm, can I change my mind about the kind of champion that I would prefer today?",
            onClick: setScene => setScene(this.scenes.selfExplanation())
          }
        ]
      };
    },
    /**
     * @param times The number of times the user repeated this choice.
     */
    assignChampFilteredRepeated: async (filter: ddragon.ChampionTag, times: number = 1): Promise<DialogueScene> => {
      const champ = await services.championService.getRandomChampion(filter, this.summonerName)
      const repeatAgain = (setScene: SetScene) => this.scenes.assignChampFilteredRepeated(filter, times + 1).then(setScene)

      if(times === 10) {
        return {
          text: <span>Oh my god! My patience has its limits. Decide for a champion already.</span>,
          options: [{
            text: "I... I am sorry, mighty poro king. I promise to decide soon.",
            onClick: repeatAgain
          }]
        }
      }

      return {
        text: times > 1
          ? <span><strong>{champ.name}</strong>?</span>
          : <span>You are a really special snowflake, aren't you? How about <strong>{champ.name}</strong>?</span>,
        options: [
          {
            text: <span>Now that looks better! I will soon enter the rift. See you afterwards.</span>,
            onClick: setScene => setScene(this.scenes.championAccepted())
          },
          {
            text: "Is there another alternative?",
            onClick: repeatAgain
          },
          {
            text: "Hm, can I change my mind about the kind of champion that I would prefer today?",
            onClick: setScene => setScene(this.scenes.selfExplanation())
          }
        ]
      };
    },
    selfExplanation: (): DialogueScene => ({
      text: <span>Ok. What kind of champion is in your mind?</span>,
      options: [
        {
          text: "Oh, actually I don't care. Just give me a champion that I recently played and that I like.",
          onClick: setScene => this.scenes.assignChamp().then(setScene)
        },
        {
          render: setScene => championFilterOption(filter => this.scenes.assignChampFiltered(filter).then(setScene))
        }
      ]
    }),
    championAccepted: (): DialogueScene => ({
      text: <span>Good to hear that. Don't let me down, <strong>{this.summonerName}</strong>!</span>,
      options: [
        {
          text: "Actually, now that it's getting serious... I want to overthink the kind of champion I play today.",
          onClick: setScene => setScene(this.scenes.selfExplanation())
        }
      ]
    })
  }

  private onResetSummoner = (setScene: SetScene) => {
    localStorage.removeItem(localStorageKeys.summonerName);
    setScene(this.scenes.changeSummoner());
  }
};
