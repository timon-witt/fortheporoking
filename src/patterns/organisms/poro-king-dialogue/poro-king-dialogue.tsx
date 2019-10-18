import React, { ReactNode } from 'react';
import { DialogueBox } from '../../molecules/dialogue-box/dialogue-box';
import { DialogueScene, DialogueContent } from '../../molecules/dialogue-content/dialogue-content';
import { strangerScenes } from '../../../ts/dialogue-scenes/stranger-dialogue-scenes';
import localStorageKeys from '../../../ts/local-storage-keys';
import { CitizenDialogue } from '../../../ts/dialogue-scenes/citizen-dialogue';

type PoroKingDialogueProps = {
  /**
   * Optional initial dialogue scene. (e.g. Impressum)
   */
  scene?: DialogueScene;
};

export const PoroKingDialogue = (props: React.PropsWithChildren<PoroKingDialogueProps>) => {
  const initialScene = props.scene || getInitialScene();
  return (
    <div>
      <DialogueBox>
        <DialogueContent initialScene={initialScene} />
      </DialogueBox>
    </div>
  );
}

/**
 * If there is a summoner name in local storage already, the initial scene
 * is different from the one presented to a stranger.
 */
const getInitialScene = (): DialogueScene => {
  const localStorageSummoner = localStorage.getItem(localStorageKeys.summonerName);
  return localStorageSummoner
    ? new CitizenDialogue(localStorageSummoner).scenes.welcome()
    : strangerScenes.welcome();
}
