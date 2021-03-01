import { SketchType } from ".";
import { ExtendedOptionsType } from "./extendedOptions";
import { randomFromArray } from "@utils/randomUtil";

interface SquareType {
  isVisible: boolean;
  x: number;
  y: number;
  color: string;
}

type SquaresMatrixType = SquareType[][];

interface ShouldSquareBeVisibleType extends ExtendedOptionsType {
  columnIdx: number;
  rowIdx: number;
  squaresPerWidth: number;
  squaresPerHeight: number;
}

const shouldSquareBeVisible = ({
  columnIdx,
  rowIdx,
  squaresPerWidth,
  squaresPerHeight,
  image,
}: ShouldSquareBeVisibleType): boolean => {
  if (columnIdx < 2 && rowIdx < 2) return false;
  if (!image) return true;

  const quarterOfSquaresPerWidth = Math.floor(squaresPerWidth / 6);

  const isWithinExtremeQuarters =
    columnIdx < quarterOfSquaresPerWidth + 1 ||
    columnIdx > squaresPerWidth - quarterOfSquaresPerWidth - 1;
  const isFirstLine = rowIdx === 0;
  const isLastLine = rowIdx === squaresPerHeight - 1;

  if (!(isWithinExtremeQuarters || isFirstLine || isLastLine)) return false;

  return Math.random() >= 0.2;
};

const createSquaresMatrix = (
  options: ExtendedOptionsType
): SquaresMatrixType => {
  const { squareSize, squaresPerWidth, colors, squaresPerHeight } = options;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { black, ...allColorsButBlack } = colors;

  return [...Array(squaresPerHeight)].map((__, rowIdx) =>
    [...Array(squaresPerWidth)].map((_, columnIdx: number) => ({
      x: columnIdx * squareSize,
      y: rowIdx * squareSize,
      color: randomFromArray(Object.values(allColorsButBlack)),
      isVisible: shouldSquareBeVisible({ ...options, columnIdx, rowIdx }),
    }))
  );
};

export const drawGraphics = (
  sketch: SketchType,
  options: ExtendedOptionsType
): void => {
  const { squareSize } = options;
  const squaresMatrix = createSquaresMatrix(options);

  squaresMatrix.forEach(row => {
    row.forEach(col => {
      if (!col.isVisible) return;
      const allCoordinates = [
        [col.x, col.y],
        [col.x + squareSize, col.y],
        [col.x + squareSize, col.y + squareSize],
        [col.x, col.y + squareSize],
      ];
      const openEdgeIdx = Math.round(sketch.random(3));
      const coordinates = allCoordinates.filter(
        (_, idx) => idx !== openEdgeIdx
      );

      sketch.noStroke();
      sketch.fill(sketch.color(col.color));
      sketch.beginShape();
      coordinates.forEach(([x, y]) => sketch.vertex(x, y));
      sketch.endShape();
    });
  });
};
