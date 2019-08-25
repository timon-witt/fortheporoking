import React, { ReactNode } from 'react';
import { DialogueBox } from '../../molecules/dialogue-box/dialogue-box';
import { DialogueScene, DialogueContent } from '../../molecules/dialogue-content/dialogue-content';
import { scenes } from './poro-king-dialogue-scenes';

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

  private getInitialScene = () => scenes.welcome();
}
