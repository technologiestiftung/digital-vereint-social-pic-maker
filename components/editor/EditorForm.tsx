import { FC } from "react";

const defaults = {
  width: 1200,
  height: 640,
  imgUrl: "",
  text: "",
};

interface FormInputType extends Partial<HTMLInputElement> {
  name: string;
  label: string;
  placeholder: string;
}

const FormInput: FC<FormInputType> = ({
  label,
  type,
  value,
  name,
  placeholder,
}) => (
  <div>
    <label className='block uppercase' htmlFor={name}>
      {label}
    </label>
    <input
      className='px-4 py-2 border border-gray-400 rounded block w-full'
      value={value}
      type={type}
      name={name}
      placeholder={`${placeholder || `Enter a ${name}`}`}
    />
  </div>
);

const EditorForm: FC = () => (
  <form className='p-8'>
    <fieldset className='grid grid-cols-2 gap-4 mb-4'>
      <FormInput
        label='Width'
        type='number'
        name='width'
        placeholder={`${defaults.width}`}
      />
      <FormInput
        label='Height'
        type='number'
        name='Height'
        placeholder={`${defaults.height}`}
      />
    </fieldset>
    <fieldset className='mb-4'>
      <FormInput
        label='Text'
        type='text'
        name='text'
        placeholder={`${defaults.text}`}
      />
    </fieldset>
    <fieldset className='mb-4'>
      <FormInput
        label='Background image'
        type='url'
        name='imgUrl'
        placeholder={`${defaults.imgUrl}`}
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

export default EditorForm;
