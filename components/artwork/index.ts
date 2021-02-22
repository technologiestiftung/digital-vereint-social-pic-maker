import { Image } from "p5";
import { EditorDraftType } from "@components/editor/EditorContext";
import { drawBackgroundImage } from "./backgroundImage";
import { drawLogo } from "./logo";
import { drawGraphics } from "./graphics";
import { extendOptions } from "./extendedOptions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SketchType = Record<string, any>;

export const drawSketch = (options: EditorDraftType) => (
  sketch: SketchType
): void => {
  const showGraphics = true;
  let bgImage: Image | undefined = undefined;
  let logoImage: Image | undefined = undefined;

  sketch.preload = () => {
    logoImage = sketch.loadImage("/logo-icon.svg", 500, 500);
    if (!options.image) return;
    bgImage = sketch.loadImage(options.image.url);
  };

  sketch.setup = () => {
    const extendedOptions = extendOptions(options);

    sketch.createCanvas(extendedOptions.width, extendedOptions.height);
    sketch.background(sketch.color(extendedOptions.colors.black));

    bgImage && drawBackgroundImage(sketch, bgImage, extendedOptions);
    logoImage && drawLogo(sketch, logoImage, extendedOptions);
    showGraphics && drawGraphics(sketch, extendedOptions);
  };

  sketch.draw = () => undefined;
};

export default drawSketch;
