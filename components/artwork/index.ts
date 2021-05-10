import { Font, Image } from "p5";
import { EditorStateType } from "@components/editor/EditorContext";
import { extendOptions } from "./extendedOptions";
import { drawBackgroundImage } from "./backgroundImage";
import { drawLogo } from "./logo";
import { drawGraphics } from "./graphics";
import { drawText } from "./text";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SketchType = Record<string, any>;
export type OptionsType = EditorStateType;

export const drawSketch =
  (
    options: OptionsType,
    handlers: {
      onLoad: () => void;
    }
  ) =>
  (sketch: SketchType): void => {
    const showGraphics = true;
    let bgImage: Image | undefined = undefined;
    let logoImage: Image | undefined = undefined;
    let font: Font | undefined = undefined;

    sketch.preload = () => {
      if (logoImage && font) return;
      logoImage = sketch.loadImage("/logo-icon.svg");
      font = sketch.loadFont("/fonts/archivo/Archivo-Regular.otf");
      if (!options.image) return;
      bgImage = sketch.loadImage(options.image.url);
    };

    sketch.setup = () => {
      handlers.onLoad();
      const extendedOptions = extendOptions(options, font);

      sketch.createCanvas(extendedOptions.width, extendedOptions.height);
      sketch.background(sketch.color(extendedOptions.colors.black));

      bgImage && drawBackgroundImage(sketch, bgImage, extendedOptions);
      logoImage && drawLogo(sketch, logoImage, extendedOptions);
      showGraphics && drawGraphics(sketch, extendedOptions);
      options.text && drawText(sketch, extendedOptions);
    };

    sketch.draw = () => undefined;
  };

export default drawSketch;
