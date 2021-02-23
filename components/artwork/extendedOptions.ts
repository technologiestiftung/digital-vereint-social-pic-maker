import { EditorDraftType } from "@components/editor/EditorContext";
import { colors } from "@utils/colorsUtil";
import { Font } from "p5";

export interface ExtendedOptionsType extends EditorDraftType {
  squaresPerWidth: number;
  squaresPerHeight: number;
  squareSize: number;
  squaresPerSmallestSide: number;
  squaresPerLongestSide: number;
  amountOfSquares: number;
  smallestSideSize: number;
  longestSideSize: number;
  colors: typeof colors;
  font?: Font;
}

export const extendOptions = (
  options: EditorDraftType,
  font?: Font
): ExtendedOptionsType => {
  const width = options.width || 1200;
  const height = options.height || 640;
  const squaresPerSmallestSide = 5;
  const smallestSideSize = Math.min(width, height);
  const longestSideSize = Math.max(width, height);
  const squareSize = smallestSideSize / squaresPerSmallestSide;
  const squaresPerLongestSide = Math.ceil(longestSideSize / squareSize);
  const amountOfSquares = squaresPerLongestSide * squaresPerSmallestSide;
  const squaresPerHeight =
    width < height ? squaresPerLongestSide : squaresPerSmallestSide;
  const squaresPerWidth =
    width < height ? squaresPerSmallestSide : squaresPerLongestSide;
  return {
    ...options,
    squaresPerSmallestSide,
    smallestSideSize,
    longestSideSize,
    squareSize,
    squaresPerLongestSide,
    amountOfSquares,
    squaresPerHeight,
    squaresPerWidth,
    colors,
    font,
  };
};
