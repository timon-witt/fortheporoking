import React, { ReactNode } from 'react';
import { DialogueBox } from '../../molecules/dialogue-box/dialogue-box';
import { DialogueScene, DialogueContent } from '../../molecules/dialogue-content/dialogue-content';
import { strangerScenes } from '../../../ts/dialogue-scenes/stranger-dialogue-scenes';
import localStorageKeys from '../../../ts/local-storage-keys';
import { CitizenDialogue } from '../../../ts/dialogue-scenes/citizen-dialogue';

type PoroKingDialogueProps = {};
type PoroKingDialogueState = {}

export class PoroKingDialogue extends React.Component<PoroKingDialogueProps, PoroKingDialogueState> {
  private initialScene: DialogueScene;

  constructor(props: PoroKingDialogueProps) {
    super(props);
    this.initialScene = this.getInitialScene();
  }

  render(): ReactNode {
    return (
      <div>
        <DialogueBox>
          <DialogueContent initialScene={this.initialScene} />
        </DialogueBox>
      </div>
    );
  }

  private getInitialScene = (): DialogueScene => {
    const localStorageSummoner = localStorage.getItem(localStorageKeys.summonerName);
    return localStorageSummoner
      ? new CitizenDialogue(localStorageSummoner).scenes.welcome()
      : strangerScenes.welcome();
  }
}
