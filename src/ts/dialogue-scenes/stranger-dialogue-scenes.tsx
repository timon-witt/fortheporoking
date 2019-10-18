import React from 'react';
import services from '../services/services';
import { DialogueScene, DialogueContentInputOption, SetScene } from '../../patterns/molecules/dialogue-content/dialogue-content';
import { championFilterOption } from '../../patterns/molecules/filter-champions-dialogue-option.tsx/champion-filter-option';
import * as ddragon from '../ddragon';
import { CitizenDialogue } from './citizen-dialogue';

/**
 * "Stranger" dialogue scenes are used when the users summoner name is unknown.
 */
export const strangerScenes = {
  welcome: (): DialogueScene => ({
    // The welcome dialogue contains some keywords for google, like
    // "lol", "champion", "generator", "random"
    text: (
      <span>
        I am the <strong style={{fontSize: '2.4rem'}}>Poro King!</strong><br />
        <br />
        If you do not know what champion you should play in the upcoming battle, I will help you.
        It is my duty to bring the right champions to the rift.
        And it is the summoners, like you hopefully, that I send into battle.
        One might say, I select the champions randomly or compare me to a simple "rAnDoM LoL cHaMpIoN gEnErAtOr".
        Pah! My strategy goes far beyond random selection,
        even if you cannot see it yet.<br />
        <br />
        So tell me, are you a summoner? What's your name?
      </span>
    ),
    options: [
      {
        render: setScene => {
          const onSubmit = (summonerName: string) =>
            new CitizenDialogue(summonerName).onSummonerNameInput(summonerName, setScene);
          return <DialogueContentInputOption placeholder="Summoner name" onSubmit={onSubmit} />;
        }
      },
      {
        text: 'Sorry, my King, I can’t tell my name. Not here.',
        onClick: setScene => setScene(strangerScenes.selfExplanation())
      }
    ]
  }),
  selfExplanation: (): DialogueScene => ({
    text: <span>And what can I do for a nameless stranger?</span>,
    options: [
      {
        text: 'I can play any champion in the rift, but I need some inspiration. Please tell me which one and I will crush our enemies.',
        onClick: setScene => strangerScenes.assignChamp().then(setScene)
      },
      {
        render: setScene => championFilterOption(filter => strangerScenes.assignChampFiltered(filter).then(setScene))
      }
    ]
  }),
  assignChamp: async (): Promise<DialogueScene> => {
    const champ = await services.championService.getRandomChampion()
    return {
      text: (
        <span>
          I am glad that you are open to any champion, as I am in need for a <strong>{champ.name}</strong>.
          I don't know you, but I hope for the best in you.
        </span>
      ),
      options: [
        {
          text: <span>Good choice, poro king! <strong>{champ.name}</strong> is just perfect. I will soon enter the rift.</span>,
          onClick: setScene => setScene(strangerScenes.championAccepted())
        },
        {
          text: "Is there an alternative?",
          onClick: setScene => strangerScenes.assignChampRepeated().then(setScene)
        },
        {
          text: "Hm, can I change my mind about the type of champion that I would prefer today?",
          onClick: setScene => setScene(strangerScenes.selfExplanation())
        }
      ]
    };
  },
  assignChampRepeated: async (times: number = 1): Promise<DialogueScene> => {
    const champ = await services.championService.getRandomChampion()
    const repeatAgain = (setScene: SetScene) => strangerScenes.assignChampRepeated(times + 1).then(setScene)

    if (times === 10) {
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
          onClick: setScene => setScene(strangerScenes.championAccepted())
        },
        {
          text: <span>That is even worse! Sorry, but I need another alternative.</span>,
          onClick: repeatAgain
        },
        {
          text: "Hm, can I change my mind about the type of champion that I would prefer today?",
          onClick: setScene => setScene(strangerScenes.selfExplanation())
        }
      ]
    };
  },
  assignChampFiltered: async (filter: ddragon.ChampionTag): Promise<DialogueScene> => {
    const champ = await services.championService.getRandomChampion(filter)
    return {
      text: (
        <span>
          A <strong>{filter}</strong> you say. I think seeing <strong>{champ.name}</strong> would be quite a pleasure now.
          Do not let me down, nameless stranger! I do not want to pick you up crying in the end.
        </span>
      ),
      options: [
        {
          text: <span>What a perfect example of a <strong>{filter}</strong>. Good choice, poro king! I will soon enter the rift.</span>,
          onClick: setScene => setScene(strangerScenes.championAccepted())
        },
        {
          text: "Is there an alternative?",
          onClick: setScene => strangerScenes.assignChampFilteredRepeated(filter).then(setScene)
        },
        {
          text: "Hm, can I change my mind about the kind of champion that I would prefer today?",
          onClick: setScene => setScene(strangerScenes.selfExplanation())
        }
      ]
    };
  },
  /**
   * @param times The number of times the user repeated this choice.
   */
  assignChampFilteredRepeated: async (filter: ddragon.ChampionTag, times: number = 1): Promise<DialogueScene> => {
    const champ = await services.championService.getRandomChampion(filter)
    const repeatAgain = (setScene: SetScene) => strangerScenes.assignChampFilteredRepeated(filter, times + 1).then(setScene)

    if (times === 10) {
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
          onClick: setScene => setScene(strangerScenes.championAccepted())
        },
        {
          text: <span>That is even worse! Sorry, but I need another alternative.</span>,
          onClick: repeatAgain
        },
        {
          text: "Hm, can I change my mind about the type of champion that I would prefer today?",
          onClick: setScene => setScene(strangerScenes.selfExplanation())
        }
      ]
    };
  },
  championAccepted: (): DialogueScene => ({
    text: <span>Good to hear that. Don't let me down, stranger!</span>,
    options: [
      {
        text: "Actually, now that it's getting serious... I want to overthink the type of champion I play today.",
        onClick: setScene => setScene(strangerScenes.selfExplanation())
      }
    ]
  })
}
