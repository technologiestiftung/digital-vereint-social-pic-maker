import { ExtendedOptionsType } from "./extendedOptions";
import { SketchType } from ".";

export const TEXT_MAX_LENGTH = 100;

export const drawText = (
  sketch: SketchType,
  options: ExtendedOptionsType
): void => {
  const {
    text,
    colors,
    font,
    squareSize,
    squaresPerHeight,
    squaresPerWidth,
  } = options;
  const width = options.width || 1200;
  const height = options.height || 640;
  const padding = 32;
  const innerWidth = width - padding * 2;
  const textSize = 40;
  const leading = 48;
  const textHeightMultiplicator = leading / textSize;

  if (!font || !text) return;
  const trimmedText = text.slice(0, TEXT_MAX_LENGTH);

  const bbox = font.textBounds(trimmedText, 0, 0, textSize) as {
    w: number;
    h: number;
    x: number;
    y: number;
  };
  const linesAmount = Math.ceil(bbox.w / innerWidth);
  const linesHeight = bbox.h * linesAmount * textHeightMultiplicator;
  const rectHeight =
    Math.ceil(linesHeight / squareSize) * squareSize +
    (squareSize % (squaresPerHeight * squareSize - height) || 0);
  const rectWidth = Math.min(
    Math.ceil((bbox.w + padding * 2) / squareSize) * squareSize +
      (squareSize % (squaresPerWidth * squareSize - width) || 0),
    squareSize * squaresPerWidth
  );

  sketch.rectMode(sketch.CORNER);
  sketch.fill(sketch.color(colors.black));
  sketch.rect(0, height - rectHeight, rectWidth, rectHeight);
  sketch.textFont(font);
  sketch.textSize(textSize);
  sketch.textLeading(leading);

  sketch.fill(255);
  sketch.text(
    trimmedText,
    padding,
    3 +
      height -
      linesHeight -
      padding -
      (rectHeight - padding - linesHeight - padding) / 2 +
      bbox.h / textHeightMultiplicator,
    innerWidth
  );
};
