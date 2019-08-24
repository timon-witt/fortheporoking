import React, { ReactNode } from 'react';

import './dialogue-box.scss';

type DialogueBoxProps = {
  className?: string;
};
type DialogueBoxState = {}

export class DialogueBox extends React.Component<DialogueBoxProps, DialogueBoxState> {

  constructor(props: DialogueBoxProps) {
    super(props);
    this.state = {};
  }

  render(): ReactNode {
    return (
      <div className={`DialogueBox ${this.props.className || ''}`}>
        <div className="DialogueBox-avatar"></div>
        <div className="DialogueBox-frame">
          <img src="/images/frame-top.png" className="DialogueBox-frameTop" />
          <img src="/images/frame-middle.png" className="DialogueBox-frameMiddle" />
          <img src="/images/frame-bottom.png" className="DialogueBox-frameBottom" />
          <div className="DialogueBox-frameContent">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
