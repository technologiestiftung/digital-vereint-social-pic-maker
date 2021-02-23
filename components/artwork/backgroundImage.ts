import { Image } from "p5";
import { ExtendedOptionsType } from "./extendedOptions";
import { SketchType } from ".";

const gt = (a: number, b: number): boolean => a > b;
const lt = (a: number, b: number): boolean => a < b;

export const drawBackgroundImage = (
  sketch: SketchType,
  bgImage: Image,
  options: ExtendedOptionsType,
  bgCoverMode: "cover" | "contain" = "cover"
): void => {
  const { width, height, image, colors, isColorFilterActive } = options;

  if (!width || !height) return;
  if (!image) {
    sketch.background(sketch.color(colors.black));
    return;
  }

  bgImage.loadPixels();

  const bgComparisonFunc = bgCoverMode === "contain" ? gt : lt;
  const dimensions = bgComparisonFunc(width, height)
    ? {
        height: height,
        width: (height / bgImage.height) * bgImage.width,
      }
    : {
        height: (width / bgImage.width) * bgImage.height,
        width: width,
      };

  sketch.imageMode(sketch.CENTER);
  sketch.image(
    bgImage,
    width / 2,
    height / 2,
    dimensions.width,
    dimensions.height
  );

  if (isColorFilterActive) {
    sketch.blendMode(sketch.SCREEN);
    sketch.fill(sketch.color(colors.primary));
    sketch.rect(0, 0, width, height);
    sketch.blendMode(sketch.NORMAL);
  }
};
