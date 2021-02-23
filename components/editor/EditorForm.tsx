import { FC, InputHTMLAttributes, useContext, ReactElement } from "react";
import { TEXT_MAX_LENGTH } from "@components/artwork/text";
import DownloadIcon from "@components/icons/DownloadIcon";
import ReloadIcon from "@components/icons/ReloadIcon";
import DeleteIcon from "@components/icons/DeleteIcon";
import { EditorContext } from "./EditorContext";
import { EditorDropzone } from "./EditorDropzone";
import { CANVAS_CONTAINER_ID } from "./CanvasPreview";

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

const onImageSave = (): void => {
  const canvas = document
    .getElementById(CANVAS_CONTAINER_ID)
    ?.querySelector("canvas");

  if (!canvas) return;

  const link = document.createElement("a");
  const { width, height } = canvas.getBoundingClientRect();
  link.download = `digital-vereint-social-pic-${width}x${height}.png`;
  link.href = canvas.toDataURL();
  link.click();
  link.remove();
};

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

const SwitchInput: FC<{
  label: string;
  isActve?: boolean;
  onToggle: () => void;
}> = ({ isActve, label, onToggle }) => (
  <div className='grid h-7' style={{ gridTemplateColumns: "1fr 48px" }}>
    <button
      className='inline-block text-gray-500 text-left'
      onClick={e => {
        e.preventDefault();
        onToggle();
      }}
    >
      {label}
    </button>
    <button
      onClick={e => {
        e.preventDefault();
        onToggle();
      }}
      className={[
        "inline-block h-7 rounded-full text-left transition opacity-70 hover:opacity-100",
        "focus:outline-none focus:ring-offset-2 focus:ring-primary focus:ring-2 focus:ring-offset-white",
        isActve ? "bg-primary" : "bg-gray-300",
      ].join(" ")}
    >
      <span
        className={[
          "w-5 h-5 inline-block transform rounded-full m-1 transition",
          isActve ? "translate-x-5 bg-gray-100" : "bg-gray-500",
        ].join(" ")}
      />
    </button>
  </div>
);

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
    toggleColorFilter,
  } = useContext(EditorContext);

  const handleSubmit = (evt: HTMLFormElement["onSubmit"]): void => {
    evt.preventDefault();

    onSubmit({
      width: draft.width || 1200,
      height: draft.height || 640,
      text: draft.text || "",
      image: draft.image,
      isColorFilterActive: draft.isColorFilterActive || false,
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
          onChange={e =>
            onTextChange(e?.target?.value.slice(0, TEXT_MAX_LENGTH))
          }
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
      {draft.image && (
        <fieldset className='mb-4'>
          <SwitchInput
            label='Farbfilter anwenden'
            onToggle={toggleColorFilter}
            isActve={draft.isColorFilterActive}
          />
        </fieldset>
      )}
      <fieldset className='mt-8 grid grid-cols-2 gap-2'>
        <button
          className='px-3 py-2 rounded border border-gray-500 text-black'
          type='reset'
          disabled={imageIsLoading}
        >
          Zurücksetzen
          <DeleteIcon />
        </button>
        <button
          className='px-3 py-2 rounded border border-gray-500 text-black'
          type='button'
          onClick={onImageSave}
          disabled={imageIsLoading}
        >
          Bild speichern
          <DownloadIcon />
        </button>
      </fieldset>
      <fieldset className='mt-2'>
        <button
          className='w-full px-3 py-2 rounded bg-tertiary text-white font-bold disabled:opacity-50'
          type='submit'
          disabled={imageIsLoading}
        >
          Neu generieren
          <ReloadIcon />
        </button>
      </fieldset>
    </form>
  );
};

export default EditorForm;
