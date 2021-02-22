import { FC, useContext, useEffect, useRef } from "react";
import { EditorContext, EditorDraftType } from "./EditorContext";
import { drawSketch } from "@components/artwork";

const renderSketch = async (
  domElement: HTMLDivElement,
  options: EditorDraftType
): Promise<void> => {
  const p5 = (await import("p5")).default;
  new p5(drawSketch(options), domElement);
};

export const CanvasPreview: FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { draft } = useContext(EditorContext);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.innerHTML = "";
      renderSketch(canvasRef.current, draft);
    }
  }, [draft]);

  return (
    <div
      className='h-screen bg-gray-100 grid place-content-center place-items-center p-8 overflow-hidden relative'
      style={{ width: "calc(100vw - 400px)" }}
    >
      <div
        ref={canvasRef}
        style={{
          width: draft.width || 1200,
          height: draft.height || 640,
        }}
        className='rounded bg-gray-400 overflow-hidden shadow-lg grid place-content-center'
      />
    </div>
  );
};
