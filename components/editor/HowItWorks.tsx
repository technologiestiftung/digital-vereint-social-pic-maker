import { FC, useState } from "react";

const liClassNameCommon = "mb-4 pl-12 relative";
const liNumDotClassNameCommon =
  "absolute top-2 left-0 inline-grid place-items-center place-content-center leading-3 monospace p-2 rounded-full w-8 h-8 text-white";

const HowItWorks: FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  return (
    <section className='p-4 border-b'>
      <button
        className='block text-left px-4 py-3 w-full focus:ring-2'
        onClick={() => setIsOpened(!isOpened)}
      >
        <h2 className='font-bold text-2xl flex justify-between'>
          <span>Wie funktioniert es?</span>
          <span className='text-2xl font-extralight leading-7 monospace'>
            {isOpened ? "–" : "+"}
          </span>
        </h2>
      </button>
      {isOpened && (
        <ol className='px-4 py-3 pb-0'>
          <li className={liClassNameCommon}>
            <span className={`${liNumDotClassNameCommon}  bg-primary`}>1</span>
            Konfigurieren Sie das Bild mit Hilfe des unten stehenden Formulars.
          </li>
          <li className={liClassNameCommon}>
            <span className={`${liNumDotClassNameCommon}  bg-secondary`}>
              2
            </span>
            Klicken Sie mit der rechten Maustaste auf das Bild und wählen Sie{" "}
            <b>Speichern</b>.
          </li>
          <li className={liClassNameCommon}>
            <span className={`${liNumDotClassNameCommon}  bg-tertiary`}>3</span>
            Laden Sie Ihr frisch heruntergeladenes Bild in Ihre soziale Medien
            hoch.
          </li>
        </ol>
      )}
    </section>
  );
};

export default HowItWorks;
