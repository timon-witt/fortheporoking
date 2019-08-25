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
          <div className="DialogueBox-frameContent">
            {this.props.children}
          </div>
          <div className="DialogueBox-frameBackground">
            <img src="/images/frame-top.png" className="DialogueBox-frameTop" alt="" />
            <img src="/images/frame-middle.png" className="DialogueBox-frameMiddle" alt="" />
            <img src="/images/frame-bottom.png" className="DialogueBox-frameBottom" alt="" />
          </div>
        </div>
      </div>
    );
  }
}
