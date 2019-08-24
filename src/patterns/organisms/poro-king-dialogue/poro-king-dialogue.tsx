import React, { ReactNode } from 'react';
import { DialogueBox } from '../../molecules/dialogue-box/dialogue-box';

type PoroKingDialogueProps = {
  
};

type PoroKingDialogueState = {}

export class PoroKingDialogue extends React.Component<PoroKingDialogueProps, PoroKingDialogueState> {

  constructor(props: PoroKingDialogueProps) {
    super(props);
    this.state = {};
  }

  render(): ReactNode {
    return (
      <div>
        <DialogueBox>
          Hallo
        </DialogueBox>
      </div>
    );
  }
}
