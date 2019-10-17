import React, { ReactNode } from 'react';
import { DialogueBox } from '../../molecules/dialogue-box/dialogue-box';
import { DialogueScene, DialogueContent } from '../../molecules/dialogue-content/dialogue-content';
import { scenes } from './poro-king-dialogue-scenes';
import localStorageKeys from '../../../ts/local-storage-keys';

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

  private getInitialScene = () => {
    const localStorageSummoner = localStorage.getItem(localStorageKeys.summonerName);
    return localStorageSummoner
      ? scenes.welcome(localStorageSummoner)
      : scenes.welcomeStranger();
  }
}
