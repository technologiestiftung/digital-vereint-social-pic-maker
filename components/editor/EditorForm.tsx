import { FC, InputHTMLAttributes, useContext, ReactElement } from "react";
import { TEXT_MAX_LENGTH } from "@components/social-image/Text";
import { EditorContext } from "./EditorContext";
import { EditorDropzone } from "./EditorDropzone";

const defaults = {
  width: 1200,
  height: 640,
  imgUrl: "",
  text: "",
};

interface FormInputType extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onClear?: () => void;
  Component?: FC<FormInputType>;
}

const FormClassicInput: FC<FormInputType> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Component,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClear,
  name,
  value,
  type,
  onChange,
  placeholder,
  label,
  ...rest
}) => (
  <input
    className='px-4 py-2 border border-gray-400 rounded block w-full'
    id={name}
    value={value}
    type={type}
    name={name}
    onChange={onChange}
    placeholder={`${placeholder || `Geben Sie ein ${label} ein`}`}
    {...rest}
  />
);

const FormInput: FC<FormInputType> = props => {
  const { label, value, name, onClear, Component } = props;
  return (
    <div className='relative'>
      {!!value && onClear && (
        <button
          type='button'
          onClick={onClear}
          className='absolute top-0 right-0 text-tertiary text-sm underline cursor-pointer'
        >
          Löschen
        </button>
      )}
      <label className='block text-gray-500' htmlFor={name}>
        {label}
      </label>
      {Component && <Component {...props} />}
    </div>
  );
};

const EditorForm: FC = () => {
  const {
    draft,
    imageIsLoading,
    onResetDraft,
    onWidthChange,
    onHeightChange,
    onTextChange,
    onImageChange,
    onSubmit,
  } = useContext(EditorContext);

  const handleSubmit = (evt: HTMLFormElement["onSubmit"]): void => {
    evt.preventDefault();

    if (!draft.image) return;

    onSubmit({
      width: draft.width || 1200,
      height: draft.height || 640,
      text: draft.text || "",
      image: draft.image,
      version: Date.now(),
    });
  };

  const handleReset = (evt: HTMLFormElement["onReset"]): void => {
    evt.preventDefault();

    onResetDraft();
  };

  return (
    <form className='p-8' onSubmit={handleSubmit} onReset={handleReset}>
      <fieldset className='grid grid-cols-2 gap-4 mb-4'>
        <FormInput
          Component={FormClassicInput}
          label='Breite'
          type='number'
          name='width'
          min={500}
          max={3000}
          placeholder={`${defaults.width}`}
          onChange={e => onWidthChange(parseInt(e?.target?.value, 10))}
          value={draft.width}
        />
        <FormInput
          Component={FormClassicInput}
          label='Höhe'
          type='number'
          name='height'
          min={500}
          max={3000}
          placeholder={`${defaults.height}`}
          onChange={e => onHeightChange(parseInt(e?.target?.value, 10))}
          value={draft.height}
        />
      </fieldset>
      <fieldset className='mb-4'>
        <FormInput
          Component={FormClassicInput}
          label={`Textinhalt (${(draft.text || "").length}/${TEXT_MAX_LENGTH})`}
          type='text'
          name='text'
          placeholder='Geben Sie ein TextInhalt ein'
          onChange={e => onTextChange(e?.target?.value)}
          value={draft.text?.slice(0, TEXT_MAX_LENGTH)}
          onClear={() => onTextChange("")}
        />
      </fieldset>
      <fieldset className='mb-4'>
        <FormInput
          Component={(): ReactElement => (
            <EditorDropzone
              onImageDropSuccess={onImageChange}
              value={draft.image}
            />
          )}
          label='Hintergrundbild'
          name='image'
          value={draft.image?.url}
          onClear={() => onImageChange(undefined)}
        />
      </fieldset>
      <fieldset className='mt-8 flex justify-end'>
        <button
          className='px-3 py-2 mr-2 rounded border border-gray-500 text-black'
          type='reset'
        >
          Zurücksetzen
        </button>
        <button
          className='px-3 py-2 rounded bg-tertiary text-white font-bold disabled:opacity-50'
          type='submit'
          disabled={imageIsLoading}
        >
          Neu generieren
        </button>
      </fieldset>
    </form>
  );
};

export default EditorForm;
