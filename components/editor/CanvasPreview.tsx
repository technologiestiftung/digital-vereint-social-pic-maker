import { FC, useContext, useEffect, useRef } from "react";
import { EditorContext, EditorContextType } from "./EditorContext";
import { drawSketch, OptionsType } from "@components/artwork";

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
        style={{
          width: contextState.state.width || 1200,
          height: contextState.state.height || 640,
        }}
        id={CANVAS_CONTAINER_ID}
        className='rounded bg-gray-400 overflow-hidden shadow-lg grid place-content-center'
      />
    </div>
  );
};
