import { Image } from "p5";
import { EditorDraftType } from "@components/editor/EditorContext";
import { SketchType } from ".";

const gt = (a: number, b: number): boolean => a > b;
const lt = (a: number, b: number): boolean => a < b;

export const drawBackgroundImage = (
  sketch: SketchType,
  bgImage: Image,
  options: EditorDraftType,
  bgCoverMode: "cover" | "contain" = "cover"
): void => {
  const { width, height } = options;

  if (!width || !height) return;

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
};
