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
}) => (
  <div className='relative'>
    {value && onClear && (
      <button
        onClick={onClear}
        className='absolute top-0 right-0 text-tertiary text-sm underline cursor-pointer'
      >
        clear
      </button>
    )}
    <label className='block uppercase' htmlFor={name}>
      {label}
    </label>
    <input
      className='px-4 py-2 border border-gray-400 rounded block w-full'
      value={value}
      type={type}
      name={name}
      onChange={onChange}
      placeholder={`${placeholder || `Enter a ${name}`}`}
    />
  </div>
);

const EditorForm: FC = () => {
  const {
    draft,
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

  return (
    <form className='p-8' onSubmit={handleSubmit}>
      <fieldset className='grid grid-cols-2 gap-4 mb-4'>
        <FormInput
          label='Width'
          type='number'
          name='width'
          placeholder={`${defaults.width}`}
          onChange={e => onWidthChange(parseInt(e?.target?.value, 10))}
          value={draft.width}
        />
        <FormInput
          label='Height'
          type='number'
          name='height'
          placeholder={`${defaults.height}`}
          onChange={e => onHeightChange(parseInt(e?.target?.value, 10))}
          value={draft.height}
        />
      </fieldset>
      <fieldset className='mb-4'>
        <FormInput
          label='Text'
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
          label='Background image'
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
          Reset values
        </button>
        <button
          className='px-3 py-2 rounded bg-tertiary text-white font-bold'
          type='submit'
        >
          Regenerate image
        </button>
      </fieldset>
    </form>
  );
};

export default EditorForm;
