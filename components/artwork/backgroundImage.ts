import { Image } from "p5";
import { ExtendedOptionsType } from "./extendedOptions";
import { SketchType } from ".";
import { getCoverImageDimensions } from "@utils/imageUtil";

export const drawBackgroundImage = (
  sketch: SketchType,
  bgImage: Image,
  options: ExtendedOptionsType
): void => {
  const { width, height, image, colors, isColorFilterActive } = options;

  if (!width || !height) return;
  if (!image) {
    sketch.background(sketch.color(colors.black));
    return;
  }

  bgImage.loadPixels();

  const dimensions = getCoverImageDimensions({
    containerWidth: width,
    containerHeight: height,
    imageWidth: bgImage.width,
    imageHeight: bgImage.height,
  });

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
