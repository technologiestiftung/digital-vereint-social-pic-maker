import { FC, useState } from "react";

const liClassNameCommon = "mb-4 pl-12 relative";
const liNumDotClassNameCommon =
  "absolute top-2 left-0 inline-grid place-items-center place-content-center leading-3 monospace p-2 rounded-full w-8 h-8 text-white";

const HowItWorks: FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(true);
  return (
    <section className='p-4 border-b'>
      <button
        className='block text-left px-4 py-3 w-full focus:ring-2'
        onClick={() => setIsOpened(!isOpened)}
      >
        <h2 className='font-bold text-2xl flex justify-between'>
          <span>How does it work?</span>
          <span className='text-2xl font-extralight leading-7 monospace'>
            {isOpened ? "–" : "+"}
          </span>
        </h2>
      </button>
      {isOpened && (
        <ol className='px-4 py-3 pb-0'>
          <li className={liClassNameCommon}>
            <span className={`${liNumDotClassNameCommon}  bg-primary`}>1</span>
            Configure the image using the formular below or use the defaults.
          </li>
          <li className={liClassNameCommon}>
            <span className={`${liNumDotClassNameCommon}  bg-secondary`}>
              2
            </span>
            Once you&apos;re satisfied with your image, <b>right-click</b> on
            the image and <b>hit save</b>.
          </li>
          <li className={liClassNameCommon}>
            <span className={`${liNumDotClassNameCommon}  bg-tertiary`}>3</span>
            Upload your freshly downloaded image to social media or whereever
            you like.
          </li>
        </ol>
      )}
    </section>
  );
};

export default HowItWorks;
