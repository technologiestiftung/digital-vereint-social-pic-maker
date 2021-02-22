import { FC, createContext, useState } from "react";

type ImageType =
  | {
      name: string;
      url: string;
      size: number;
    }
  | undefined;

interface ImageStateType {
  width: number;
  height: number;
  image: ImageType;
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
  onImageChange: StateChangeSignature<ImageType, void>;
  onSubmit: StateChangeSignature<ImageStateType, void>;
  startLoadingImage: () => void;
  stopLoadingImage: () => void;
  onResetDraft: () => void;
}

const editorStateDefaults = {
  width: 1200,
  height: 600,
  image: undefined,
  text: "",
  version: Date.now(),
};

export const defaults: EditorContextType = {
  state: editorStateDefaults,
  draft: editorStateDefaults,
  imageIsLoading: false,
  onWidthChange: () => undefined,
  onHeightChange: () => undefined,
  onTextChange: () => undefined,
  onImageChange: () => undefined,
  onSubmit: () => undefined,
  startLoadingImage: () => undefined,
  stopLoadingImage: () => undefined,
  onResetDraft: () => undefined,
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

  const onImageChange = (value: ImageType): void => {
    setDraft({ ...draft, image: value });
  };

  const onSubmit = (state: ImageStateType): void => {
    setState(state);
  };

  const onResetDraft = (): void => {
    setDraft(defaults.draft);
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
        onResetDraft,
        onWidthChange,
        onHeightChange,
        onTextChange,
        onImageChange,
        onSubmit,
        startLoadingImage,
        stopLoadingImage,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
