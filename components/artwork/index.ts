import { Font, Image } from "p5";
import { EditorStateType } from "@components/editor/EditorContext";
import { extendOptions } from "./extendedOptions";
import { drawBackgroundImage } from "./backgroundImage";
import { drawLogo } from "./logo";
import { drawGraphics } from "./graphics";
import { drawText } from "./text";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SketchType = Record<string, any> & {
  loadImage: (path: string) => Image;
  loadFont: (path: string) => Font;
  textFont: (font: Font) => void;
  createCanvas: (width: number, height: number) => void;
  background: (color: string) => void;
  color: (color: string | number | number[]) => string;
  fill: (color: string | number | number[]) => string;
  imageMode: (mode: string) => void;
  blendMode: (mode: string) => void;
  rectMode: (mode: string) => void;
  random: (seed: number) => number;
  textSize: (size: number) => void;
  textLeading: (leading: number) => void;
  text: (text: string, x: number, y: number, width: number) => void;
  noStroke: () => void;
  beginShape: () => void;
  endShape: () => void;
  image: (
    image: Image,
    x: number,
    y: number,
    width: number,
    height: number
  ) => void;
  rect: (x: number, y: number, width: number, height: number) => void;
  vertex: (x: number, y: number) => void;
};
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

      sketch.createCanvas(
        extendedOptions.width || 300,
        extendedOptions.height || 300
      );
      sketch.background(sketch.color(extendedOptions.colors.black));

      bgImage && drawBackgroundImage(sketch, bgImage, extendedOptions);
      logoImage && drawLogo(sketch, logoImage, extendedOptions);
      showGraphics && drawGraphics(sketch, extendedOptions);
      options.text && drawText(sketch, extendedOptions);
    };

    sketch.draw = () => undefined;
  };

export default drawSketch;
