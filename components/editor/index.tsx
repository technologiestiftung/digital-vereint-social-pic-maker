import { FC } from "react";
import HowItWorks from "./HowItWorks";

const SocialImageEditor: FC = () => (
  <main className='grid' style={{ gridTemplateColumns: "1fr 400px" }}>
    <div className='h-screen grid place-content-center place-items-center p-8'>
      <img
        src='/api/social-image'
        alt='Social Pic Maker Preview'
        className='max-w-full'
      />
    </div>
    <aside className='h-full shadow-2xl'>
      <header
        className='grid gap-4 p-8 border-b pb-6'
        style={{ gridTemplateColumns: "132px 1fr" }}
      >
        <img src='/logo.svg' alt='Digital Vereint Logo' className='mb-2' />
        <h1 className='text-xl font-bold leading-5 pl-4 border-l'>
          Picture
          <br />
          Maker
        </h1>
      </header>
      <HowItWorks />
    </aside>
  </main>
);

export default SocialImageEditor;
