import React, { ReactNode, useCallback, useRef, FunctionComponent, forwardRef } from 'react';
import './dialogue-content.scss';

export type SetScene = (scene: DialogueScene) => void;

export type DialogueScene = {
  text?: string | JSX.Element;
  options?: Array<DialogueOption>;
  /**
   * Use this to render no options but completely custom content.
   */
  render?: (setScene: SetScene) => ReactNode;
};

export type DialogueOption = {
  text?: string;
  onClick?: (setScene: SetScene) => void;
  render?: (setScene: SetScene) => ReactNode;
};

type DialogueContentProps = {
  /**
   * The initial scene. 
   * The scene can change based on user interactions inside that scene.
   */
  initialScene: DialogueScene;
};

type DialogueContentState = {
  scene: DialogueScene;
};

/**
 * Renders a dialogue scene.
 */
export class DialogueContent extends React.Component<DialogueContentProps, DialogueContentState> {

  constructor(props: DialogueContentProps) {
    super(props);
    this.state = {
      scene: props.initialScene
    }
  }

  render(): ReactNode {
    const { scene } = this.state;
    return (
      <div className="DialogueContent">
        <div className="DialogueContent-text">{scene.text}</div>
        {scene.options &&
          <div className="DialogueContent-options">
            {scene.options.map((option, index) =>
              <DialogueContentOption option={option} setScene={this.setScene} key={option.text || index} />
            )}
          </div>
        }
      </div>
    );
  }
  private setScene = (scene: DialogueScene) => this.setState({ scene });
}


type DialogueContentOptionProps = {
  option: DialogueOption;
  setScene: (scene: DialogueScene) => void
}

/**
 * Renders a dialogue option.
 */
class DialogueContentOption extends React.Component<DialogueContentOptionProps> {

  render(): React.ReactNode {
    const { option } = this.props;
    const inner = option.text
      ? <div className="DialogueOption-text">{option.text}</div>
      : option.render && option.render(this.props.setScene);

    return option.onClick
      ? <button
        className="DialogueOption DialogueOption--button"
        key={option.text}
        onClick={this.onClick}
      >{inner}</button>
      : <div
        className="DialogueOption"
        key={option.text}
      >{inner}</div>
  }

  private onClick = () => {
    const { option, setScene } = this.props;
    if (option.onClick) {
      option.onClick(setScene);
      // TODO: Set scene as inactive to prevent double clicks
    }
  }
}

/**
 * A simple form that can be used in dialogue content.
 */
export const DialogueContentForm = (props: React.PropsWithChildren<{ onSubmit: () => void }>) => {
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit();
  }, [props])
  return <form onSubmit={onSubmit}>{props.children}</form>;
}

/**
 * A simple input that can be used in dialogue content.
 * For a standalone input option, use DialogueContentInputOption.
 */
export const DialogueContentInput = forwardRef<HTMLInputElement, { className?: string; placeholder?: string; }>((props, ref) =>
  <input
    type="text"
    placeholder={props.placeholder}
    ref={ref}
    className={`DialogueOption-input ${props.className || ''}`}
  />);


/**
 * A whole standalone dialogue option including a form input.
 * props.onSubmit is called with the input value.
 */
export const DialogueContentInputOption: FunctionComponent<{ placeholder?: string, onSubmit: (value: string) => void }> = props => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onSubmit = useCallback(() => inputRef.current && props.onSubmit(inputRef.current.value), [props]);
  return (
    <DialogueContentForm onSubmit={onSubmit}>
      <DialogueContentInput placeholder={props.placeholder} ref={inputRef}></DialogueContentInput>
    </DialogueContentForm>
  )
}
