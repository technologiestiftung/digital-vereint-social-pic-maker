import { FC } from "react";

const Homepage: FC = () => (
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
      <section className='p-8 border-b'>
        <h2 className='font-bold text-2xl mb-4'>How does it work?</h2>
        <ol>
          <li className='mb-4  pl-12 relative'>
            <span className='absolute top-2 left-0 inline-grid place-items-center place-content-center leading-3 monospace p-2 bg-primary rounded-full w-8 h-8 text-white'>
              1
            </span>
            Configure the image using the formular below or use the defaults.
          </li>
          <li className='mb-4  pl-12 relative'>
            <span className='absolute top-2 left-0 inline-grid place-items-center place-content-center leading-3 monospace p-2 bg-secondary rounded-full w-8 h-8 text-white'>
              2
            </span>
            Once you&apos;re satisfied with your image, <b>right-click</b> on
            the image and <b>hit save</b>.
          </li>
          <li className='mb-4  pl-12 relative'>
            <span className='absolute top-2 left-0 inline-grid place-items-center place-content-center leading-3 monospace p-2 bg-tertiary rounded-full w-8 h-8 text-white'>
              3
            </span>
            Upload your freshly downloaded image to social media or whereever
            you like.
          </li>
        </ol>
      </section>
    </aside>
  </main>
);

export default Homepage;
