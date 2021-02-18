import { FC, InputHTMLAttributes, useContext } from "react";
import { EditorContext } from "./EditorContext";

const defaults = {
  width: 1200,
  height: 640,
  imgUrl: "",
  text: "",
};

interface FormInputType extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onClear?: () => void;
}

const FormInput: FC<FormInputType> = ({
  label,
  type,
  value,
  name,
  placeholder,
  onChange,
  onClear,
  ...rest
}) => (
  <div className='relative'>
    {value && onClear && (
      <button
        type='button'
        onClick={onClear}
        className='absolute top-0 right-0 text-tertiary text-sm underline cursor-pointer'
      >
        clear
      </button>
    )}
    <label className='block text-gray-500' htmlFor={name}>
      {label}
    </label>
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
    onImgUrlChange,
    onSubmit,
  } = useContext(EditorContext);

  const handleSubmit = (evt: HTMLFormElement["onSubmit"]): void => {
    evt.preventDefault();
    const data = new FormData(evt.target);
    const width = data.get("width") || "1200";
    const height = data.get("height") || "640";
    const text = data.get("text") || "";
    const imgUrl = data.get("imgUrl") || "";

    if (
      typeof width !== "string" ||
      typeof height !== "string" ||
      typeof text !== "string" ||
      typeof imgUrl !== "string"
    )
      return;

    onSubmit({
      width: parseInt(width, 10),
      height: parseInt(height, 10),
      text,
      imgUrl,
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
          label='Breite'
          type='number'
          name='width'
          min={400}
          max={3000}
          placeholder={`${defaults.width}`}
          onChange={e => onWidthChange(parseInt(e?.target?.value, 10))}
          value={draft.width}
        />
        <FormInput
          label='Höhe'
          type='number'
          name='height'
          min={400}
          max={3000}
          placeholder={`${defaults.height}`}
          onChange={e => onHeightChange(parseInt(e?.target?.value, 10))}
          value={draft.height}
        />
      </fieldset>
      <fieldset className='mb-4'>
        <FormInput
          label='Textinhalt'
          type='text'
          name='text'
          placeholder={`${defaults.text}`}
          onChange={e => onTextChange(e?.target?.value)}
          value={draft.text}
          onClear={() => onTextChange("")}
        />
      </fieldset>
      <fieldset className='mb-4'>
        <FormInput
          label='Hintergrundbild URL'
          type='url'
          name='imgUrl'
          placeholder={`${defaults.imgUrl}`}
          onChange={e => onImgUrlChange(e?.target?.value)}
          value={draft.imgUrl}
          onClear={() => onImgUrlChange("")}
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
