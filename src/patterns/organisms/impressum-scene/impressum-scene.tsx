import React from 'react';
import { DialogueScene } from '../../molecules/dialogue-content/dialogue-content';

export const impressumScene: DialogueScene = {
  text: (
    <div>
      Is it an audience you desire?

      <h1>Impressum</h1>
      Timon Witt
        <p>
        Südstr., 5<br />
        83607 Holzkirchen<br />
        E-Mail timon.witt@gmail.com<br />
        Tel 015123558074<br />
        Fax <br />
      </p>
      <strong>Haftung für Inhalte</strong>
      <p>
        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
        Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
        nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
        jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
        oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
        Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
        der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
        Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
        </p>
      <i><a href="http://www.agb.de">Gratis Impressum</a> von agb.de</i>
    </div>
  ),
  options: [
    {
      text: "I am done. Let's talk about actually important stuff, like what champion I should play next.",
      onClick: () => window.location.replace('/')
    }
  ]
};
