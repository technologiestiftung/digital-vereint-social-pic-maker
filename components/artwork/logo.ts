import { Image } from "p5";
import { ExtendedOptionsType } from "./extendedOptions";
import { SketchType } from ".";

export const drawLogo = (
  sketch: SketchType,
  logoImage: Image,
  options: ExtendedOptionsType
): void => {
  const { squareSize } = options;
  logoImage.loadPixels();

  sketch.imageMode(sketch.CORNER);

  sketch.noStroke();
  sketch.fill(sketch.color(options.colors.black));
  sketch.beginShape();
  sketch.vertex(squareSize, 0);
  sketch.vertex(squareSize * 2, squareSize);
  sketch.vertex(squareSize, squareSize * 2);
  sketch.vertex(0, squareSize);
  sketch.endShape();

  const padding = options.squareSize / 2;
  sketch.image(
    logoImage,
    padding,
    padding,
    options.squareSize,
    options.squareSize
  );
};
