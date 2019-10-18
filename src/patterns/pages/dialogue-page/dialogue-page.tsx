import React from 'react';
import { PoroKingDialogue } from '../../organisms/poro-king-dialogue/poro-king-dialogue';

import './dialogue-page.scss';
import { DialogueScene } from '../../molecules/dialogue-content/dialogue-content';

export type DialoguePageProps = {
  /**
   * Optional initial dialogue scene. (e.g. Impressum)
   */
  dialogueScene?: DialogueScene;
}

export const DialoguePage = (props: React.PropsWithChildren<DialoguePageProps>) => {
  return (
    <div className="Page DialoguePage">
      <img className="DialoguePage-background" src="/images/background.png" alt="Background" />
      <div className="DialoguePage-content">
        <PoroKingDialogue scene={props.dialogueScene} />
      </div>
      <footer className="DialoguePage-footer">
        {/* Do not use <Link> on purpose, so that we get a real page load
            and dialogue components do not have to handle prop changes */}
        <a href="/impressum" className="DialoguePage-footerLink">Impressum</a>
        <a href="https://github.com/timon-witt/trollpick"
          className="DialoguePage-footerLink"
          target="_blank"
          rel="noopener noreferrer"
        >GitHub</a>
      </footer>
    </div>
  );
}
