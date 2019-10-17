import React, { ReactNode, useCallback, useRef, FunctionComponent, forwardRef, useState } from 'react';
import './dialogue-content.scss';

export type SetScene = (scene: DialogueScene) => void;

export type DialogueScene = {
  text?: string | ReactNode;
  options?: Array<DialogueOption>;
  /**
   * Use this to render no options but completely custom content.
   */
  render?: (setScene: SetScene) => ReactNode;
};

export type DialogueOption = {
  text?: string | ReactNode;
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

/**
 * Renders a dialogue scene, which contains the poro kings
 * text and interactable options for the user.
 */
export const DialogueContent = (props: React.PropsWithChildren<DialogueContentProps>) => {
  const [scene, setScene] = useState(props.initialScene);
  return (
    <div className="DialogueContent">
      <div className="DialogueContent-text">{scene.text}</div>
      {scene.options &&
        <div className="DialogueContent-options">
          {scene.options.map((option, index) =>
            // Index as key is ok since options don't change.
            <DialogueContentOption option={option} setScene={setScene} key={index} />
          )}
        </div>
      }
    </div>
  );
}


type DialogueContentOptionProps = {
  option: DialogueOption;
  setScene: (scene: DialogueScene) => void
}

/**
 * Renders a dialogue option.
 */
const DialogueContentOption = ({ option, setScene }: React.PropsWithChildren<DialogueContentOptionProps>) => {
  const onClick = useCallback(() => {
    if (option.onClick) {
      option.onClick(setScene);
      // TODO: Set scene as inactive to prevent double clicks
    }
  }, [option.onClick, setScene])

  const inner = option.text
    ? <div className="DialogueOption-text">{option.text}</div>
    : option.render && option.render(setScene);

  return option.onClick
    ? <button
      className="DialogueOption DialogueOption--button DialogueOption--withBorder"
      onClick={onClick}
    >{inner}</button>
    : <div
      className="DialogueOption"
    >{inner}</div>
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
