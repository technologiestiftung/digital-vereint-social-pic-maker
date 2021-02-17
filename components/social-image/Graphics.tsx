import { randomFromArray } from "@utils/randomUtil";
import { FC } from "react";
import { SocialImageType } from "./index";
import SocialImageLogo from "./Logo";

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
  if (!imgUrl) return false;
  if (key < 2) return false;
  if (key >= squaresPerWidth && key < squaresPerWidth + 2) return false;

  const quarterOfSquaresPerWidth = Math.floor(squaresPerWidth / 4);
  const indexInRow = key % squaresPerWidth;

  const isWithinExtremeQuarters =
    indexInRow < quarterOfSquaresPerWidth ||
    indexInRow > squaresPerWidth - quarterOfSquaresPerWidth;
  const isFirstLine = key < squaresPerWidth;
  const isLastLine = key > amountOfSquares - squaresPerWidth;

  if (!(isWithinExtremeQuarters || isFirstLine || isLastLine)) return false;

  return Math.random() > 0.2;
};

const SocialImageGraphics: FC<SocialImageType> = props => {
  const { width, height, fullOuterPadding, noLogo } = props;

  const squaresPerSmallestSide = 5;
  const smallestSideSize = Math.min(width, height);
  const longestSideSize = Math.max(width, height);
  const squareWidth = smallestSideSize / squaresPerSmallestSide;
  const squaresPerLongestSide = Math.ceil(longestSideSize / squareWidth);
  const amountOfSquares = squaresPerLongestSide * squaresPerSmallestSide;
  const squaresPerWidth =
    width < height ? squaresPerSmallestSide : squaresPerLongestSide;

  return (
    <div
      className='fixed top-0 left-0 overflow-hidden grid place-items-start z-10'
      style={{
        width: width - fullOuterPadding,
        height: height - fullOuterPadding,
      }}
    >
      {!noLogo && (
        <SocialImageLogo
          {...props}
          containerSize={(longestSideSize / squaresPerLongestSide) * 2}
        />
      )}
      <div
        className={[
          "relative w-full h-full grid auto-rows-auto content-between",
          `grid-cols-${squaresPerWidth}`,
        ].join(" ")}
      >
        {[...Array(amountOfSquares)]
          .map((_, key) => ({
            key,
            className: [
              randomFromArray([
                "text-primary",
                "text-secondary",
                "text-tertiary",
              ]),
              randomFromArray([
                "rotate-0",
                "rotate-90",
                "-rotate-90",
                "rotate-80",
              ]),
              "transform",
              shouldSquareBeVisible({
                key,
                squaresPerWidth,
                amountOfSquares,
                ...props,
              })
                ? ""
                : "opacity-0",
            ].join(" "),
          }))
          .map(({ key, className }) => (
            <svg
              key={key}
              className={className}
              viewBox='0 0 1 1'
              preserveAspectRatio=''
              xmlns='http://www.w3.org/2000/svg'
            >
              <polygon fill='currentColor' points='0,1 0,0 1,0'></polygon>
            </svg>
          ))}
      </div>
    </div>
  );
};

export default SocialImageGraphics;
