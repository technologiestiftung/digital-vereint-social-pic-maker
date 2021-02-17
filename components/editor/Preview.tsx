import { FC } from "react";

const EditorPreview: FC = () => (
  <div className='h-screen grid place-content-center place-items-center p-8'>
    <img
      src='/api/social-image'
      alt='Social Pic Maker Preview'
      className='max-w-full'
    />
  </div>
);

export default EditorPreview;
