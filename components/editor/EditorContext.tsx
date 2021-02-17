import { FC, createContext, useState } from "react";

interface ImageStateType {
  width: number;
  height: number;
  imgUrl: string;
  text: string;
  version: number;
}

type EditorDraftType = Partial<ImageStateType>;

type StateChangeSignature<InputType, OutputType> = (
  state: InputType
) => OutputType;

interface EditorContextType {
  state: ImageStateType;
  draft: EditorDraftType;
  imageIsLoading: boolean;
  onWidthChange: StateChangeSignature<number, void>;
  onHeightChange: StateChangeSignature<number, void>;
  onTextChange: StateChangeSignature<string, void>;
  onImgUrlChange: StateChangeSignature<string, void>;
  onSubmit: StateChangeSignature<ImageStateType, void>;
  startLoadingImage: () => void;
  stopLoadingImage: () => void;
}

const editorStateDefaults = {
  width: 1200,
  height: 600,
  imgUrl: "",
  text: "",
  version: Date.now(),
};

const defaults = {
  state: editorStateDefaults,
  draft: editorStateDefaults,
  imageIsLoading: false,
  onWidthChange: () => undefined,
  onHeightChange: () => undefined,
  onTextChange: () => undefined,
  onImgUrlChange: () => undefined,
  onSubmit: () => undefined,
  startLoadingImage: () => undefined,
  stopLoadingImage: () => undefined,
};

export const EditorContext = createContext<EditorContextType>(defaults);

export const EditorProvider: FC = ({ children }) => {
  const [state, setState] = useState<ImageStateType>(defaults.state);
  const [draft, setDraft] = useState<EditorDraftType>(defaults.draft);
  const [imageIsLoading, setImageIsLoading] = useState<boolean>(
    defaults.imageIsLoading
  );

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

  const startLoadingImage = (): void => {
    setImageIsLoading(true);
  };

  const stopLoadingImage = (): void => {
    setImageIsLoading(false);
  };

  return (
    <EditorContext.Provider
      value={{
        state,
        draft,
        imageIsLoading,
        onWidthChange,
        onHeightChange,
        onTextChange,
        onImgUrlChange,
        onSubmit,
        startLoadingImage,
        stopLoadingImage,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
