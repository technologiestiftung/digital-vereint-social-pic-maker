import { FC, useContext, useEffect, useRef } from "react";
import { drawSketch, OptionsType } from "@components/artwork";
import { EditorContext, EditorContextType } from "./EditorContext";
import styles from "./canvas.module.css";

export const CANVAS_CONTAINER_ID = "social-image-preview-canvas";

const renderSketch = async (
  domElement: HTMLDivElement,
  options: OptionsType,
  handlers: {
    onLoad: () => void;
  }
): Promise<void> => {
  const p5 = (await import("p5")).default;
  new p5(drawSketch(options, handlers), domElement);
};

const stateHasChanged = (
  prevState: EditorContextType | undefined,
  nextState: EditorContextType
): boolean => {
  return (
    !prevState ||
    prevState.state.text !== nextState.state.text ||
    prevState.imageIsLoading !== nextState.imageIsLoading ||
    prevState.state.width !== nextState.state.width ||
    prevState.state.height !== nextState.state.height ||
    prevState.state.image !== nextState.state.image
  );
};

let prevContext: EditorContextType | undefined = undefined;
export const CanvasPreview: FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const contextState = useContext(EditorContext);

  useEffect(() => {
    if (!stateHasChanged(prevContext, contextState)) return;
    prevContext = contextState;
    if (canvasRef.current) {
      canvasRef.current.innerHTML = "";
      renderSketch(canvasRef.current, contextState.state, {
        onLoad: () => contextState.stopLoadingImage(),
      });
    }
  });

  return (
    <div
      className='h-screen bg-gray-100 grid place-content-center place-items-center p-8 overflow-hidden relative'
      style={{ width: "calc(100vw - 400px)" }}
    >
      <div
        ref={canvasRef}
        id={CANVAS_CONTAINER_ID}
        className={[
          "grid place-content-center max-w-full max-h-full",
          styles.canvasContainer,
        ].join(" ")}
      />
    </div>
  );
};
