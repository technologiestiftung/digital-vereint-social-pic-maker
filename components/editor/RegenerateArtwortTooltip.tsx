import { FC, useEffect, useState, useCallback } from "react";

const LOCAL_STORAGE_KEY = "regenerate-artwork-tooltip";

export const RegenerateArtwortTooltip: FC = () => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const isBrowser = typeof window !== "undefined";

  const onOkClick = useCallback(() => {
    setShowTooltip(false);

    if (isBrowser) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, "true");
    }
  }, [setShowTooltip, isBrowser]);

  useEffect(() => {
    if (isBrowser && window.localStorage.getItem(LOCAL_STORAGE_KEY)) return;
    const to = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(to);
  }, [isBrowser]);

  return (
    <>
      <div
        className={[
          "w-full absolute top-full left-0 pt-2",
          "transform transition opacity-0",
          showTooltip
            ? "translate-y-0 opacity-100"
            : "translate-y-8 pointer-events-none",
        ].join(" ")}
        style={{
          transitionTimingFunction: "cubic-bezier(0,1.01,0,1.01)",
          transitionDuration: "1s",
        }}
      >
        <span className='w-4 h-4 absolute bg-primary transform rotate-45 top-0 left-1/2 -translate-x-1/2' />
        <div
          className='p-4 rounded bg-primary text-white grid justify-items-end gap-4 content-start items-start'
          style={{
            gridTemplateColumns: "1fr auto",
          }}
        >
          <p className='leading-tight'>
            Sie können mehrmals auf diese Schaltfläche klicken, um verschiedene
            Muster zu erzeugen.
          </p>
          <button
            onClick={onOkClick}
            className='inline-block bg-none border border-white text-white py-1 px-2 rounded-sm'
          >
            Ok
          </button>
        </div>
      </div>
    </>
  );
};
