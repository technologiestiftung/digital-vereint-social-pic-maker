import { randomFromArray } from "@utils/randomUtil";
import React, { FC } from "react";
import { SocialImageType } from "./index";
import Text from "./Text";
import SocialImageLogo from "./Logo";
import Triangle from "./Triangle";

type ShouldSquareBeVisibleType = SocialImageType & {
  key: number;
  squaresPerWidth: number;
  amountOfSquares: number;
};

const shouldSquareBeVisible = ({
  key,
  imgUrl,
  squaresPerWidth,
  amountOfSquares,
}: ShouldSquareBeVisibleType): boolean => {
  if (key < 2) return false;
  if (key >= squaresPerWidth && key < squaresPerWidth + 2) return false;
  if (!imgUrl) return true;

  const quarterOfSquaresPerWidth = Math.round(squaresPerWidth / 4);
  const indexInRow = key % squaresPerWidth;

  const isWithinExtremeQuarters =
    indexInRow < quarterOfSquaresPerWidth ||
    indexInRow > squaresPerWidth - quarterOfSquaresPerWidth;
  const isFirstLine = key < squaresPerWidth;
  const isLastLine = key > amountOfSquares - squaresPerWidth;

  if (!(isWithinExtremeQuarters || isFirstLine || isLastLine))
    return Math.random() > 0.95;

  return Math.random() > 0.2;
};

const mapSquareByKey = (
  key: number,
  props: ShouldSquareBeVisibleType
): {
  key: number;
  className: string;
} => {
  return {
    key,
    className: [
      randomFromArray(["text-primary", "text-secondary", "text-tertiary"]),
      randomFromArray(["rotate-0", "rotate-90", "-rotate-90", "rotate-180"]),
      shouldSquareBeVisible(props) ? "" : "opacity-0",
    ].join(" "),
  };
};

const SocialImageGraphics: FC<SocialImageType> = props => {
  const { text, width, height, fullOuterPadding, noLogo } = props;

  const squaresPerSmallestSide = 5;
  const smallestSideSize = Math.min(width, height);
  const longestSideSize = Math.max(width, height);
  const squareWidth = smallestSideSize / squaresPerSmallestSide;
  const squaresPerLongestSide = Math.ceil(longestSideSize / squareWidth);
  const amountOfSquares = squaresPerLongestSide * squaresPerSmallestSide;
  const squaresPerHeight =
    width < height ? squaresPerLongestSide : squaresPerSmallestSide;
  const squaresPerWidth =
    width < height ? squaresPerSmallestSide : squaresPerLongestSide;

  return (
    <div
      className='fixed top-0 left-0 overflow-hidden z-10'
      style={{
        width: width - fullOuterPadding,
        height: height - fullOuterPadding,
      }}
    >
      {text && (
        <Text
          {...props}
          squareWidth={squareWidth}
          squaresPerHeight={squaresPerHeight}
        />
      )}
      {!noLogo && (
        <SocialImageLogo
          {...props}
          squaresPerSmallestSide={squaresPerSmallestSide}
          squareWidth={squareWidth}
        />
      )}
      <div
        className='relative inline-grid auto-rows-auto content-end'
        style={{
          height: squaresPerHeight * squareWidth,
          width: squaresPerWidth * squareWidth,
          gridTemplateColumns: `repeat(${Math.floor(squaresPerWidth)}, 1fr)`,
        }}
      >
        {[...Array(Math.round(amountOfSquares))]
          .map((_, key) =>
            mapSquareByKey(key, {
              ...props,
              key,
              squaresPerWidth,
              amountOfSquares,
            })
          )
          .map(({ key, className }) => (
            <Triangle key={key} className={className} />
          ))}
      </div>
    </div>
  );
};

export default SocialImageGraphics;
