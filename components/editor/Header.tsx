import { FC } from "react";

const EditorHeader: FC = () => (
  <header
    className='grid gap-4 p-8 border-b pb-6'
    style={{ gridTemplateColumns: "132px 1fr" }}
  >
    <img src='/logo.svg' alt='Digital Vereint Logo' className='mb-2' />
    <h1 className='text-xl leading-5 pl-4 border-l'>
      Picture
      <br />
      Maker
    </h1>
  </header>
);

export default EditorHeader;
