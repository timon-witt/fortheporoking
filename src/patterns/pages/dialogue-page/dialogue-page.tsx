import React, { ReactNode } from 'react';
import { PoroKingDialogue } from '../../organisms/poro-king-dialogue/poro-king-dialogue';

import './dialogue-page.scss';

export class DialoguePage extends React.Component<{}, {}> {
  render(): ReactNode {
    return (
      <div className="Page DialoguePage">
        <img className="DialoguePage-background" src="/images/background.png" alt="Background" />
        <div className="DialoguePage-content">
          <PoroKingDialogue />
        </div>
      </div>
    );
  }
}
