import { FC, createContext, useState } from "react";

type ImageType =
  | {
      name: string;
      url: string;
      size: number;
    }
  | undefined;

export interface EditorStateType {
  width: number;
  height: number;
  image: ImageType;
  text: string;
  isColorFilterActive: boolean;
}

export type EditorDraftType = Partial<EditorStateType>;

type StateChangeSignature<InputType, OutputType> = (
  state: InputType
) => OutputType;

export interface EditorContextType {
  state: EditorStateType;
  draft: EditorDraftType;
  imageIsLoading: boolean;
  onWidthChange: StateChangeSignature<number, void>;
  onHeightChange: StateChangeSignature<number, void>;
  onTextChange: StateChangeSignature<string, void>;
  onImageChange: StateChangeSignature<ImageType, void>;
  onSubmit: StateChangeSignature<EditorStateType, void>;
  startLoadingImage: () => void;
  stopLoadingImage: () => void;
  onResetDraft: () => void;
  toggleColorFilter: () => void;
}

const editorStateDefaults = {
  width: 1200,
  height: 600,
  image: undefined,
  text: "",
  isColorFilterActive: true,
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
  toggleColorFilter: () => undefined,
};

export const EditorContext = createContext<EditorContextType>(defaults);

export const EditorProvider: FC = ({ children }) => {
  const [state, setState] = useState<EditorStateType>(defaults.state);
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

  const onSubmit = (state: EditorStateType): void => {
    setState(state);
    setImageIsLoading(true);
  };

  const onResetDraft = (): void => {
    setDraft(defaults.draft);
    setState(defaults.state);
  };

  const startLoadingImage = (): void => {
    setImageIsLoading(true);
  };

  const stopLoadingImage = (): void => {
    setImageIsLoading(false);
  };

  const toggleColorFilter = (): void => {
    setDraft({ ...draft, isColorFilterActive: !draft.isColorFilterActive });
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
        toggleColorFilter,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
