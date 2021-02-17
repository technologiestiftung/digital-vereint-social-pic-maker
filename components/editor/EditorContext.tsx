import { FC, createContext, useState } from "react";

interface ImageStateType {
  width: number;
  height: number;
  imgUrl: string;
  text: string;
}

type EditorDraftType = Partial<ImageStateType>;

type StateChangeSignature<InputType, OutputType> = (
  state: InputType
) => OutputType;

interface EditorContextType {
  state: ImageStateType;
  draft: EditorDraftType;
  onWidthChange: StateChangeSignature<number, void>;
  onHeightChange: StateChangeSignature<number, void>;
  onTextChange: StateChangeSignature<string, void>;
  onImgUrlChange: StateChangeSignature<string, void>;
  onSubmit: StateChangeSignature<ImageStateType, void>;
}

const editorStateDefaults = {
  width: 1200,
  height: 640,
  imgUrl: "",
  text: "",
};

const defaults = {
  state: editorStateDefaults,
  draft: editorStateDefaults,
  onWidthChange: () => undefined,
  onHeightChange: () => undefined,
  onTextChange: () => undefined,
  onImgUrlChange: () => undefined,
  onSubmit: () => undefined,
};

export const EditorContext = createContext<EditorContextType>(defaults);

export const EditorProvider: FC = ({ children }) => {
  const [state, setState] = useState<ImageStateType>(defaults.state);
  const [draft, setDraft] = useState<EditorDraftType>(defaults.draft);

  const onWidthChange = (value: number): void => {
    setDraft({ ...draft, width: value });
  };

  const onHeightChange = (value: number): void => {
    setDraft({ ...draft, height: value });
  };

  const onTextChange = (value: string): void => {
    setDraft({ ...draft, text: value });
  };

  const onImgUrlChange = (value: string): void => {
    setDraft({ ...draft, imgUrl: value });
  };

  const onSubmit = (state: ImageStateType): void => {
    setState(state);
  };

  return (
    <EditorContext.Provider
      value={{
        state,
        draft,
        onWidthChange,
        onHeightChange,
        onTextChange,
        onImgUrlChange,
        onSubmit,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
