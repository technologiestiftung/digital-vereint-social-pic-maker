import React, { FC } from "react";
import { SocialImageType } from ".";
import Triangle from "./Triangle";

type SocialImageLogoType = SocialImageType & {
  squareWidth: number;
  squaresPerSmallestSide: number;
};

const SocialImageLogo: FC<SocialImageLogoType> = ({ squareWidth }) => {
  const triangleClassNameCommon = "fixed text-black";
  // const baseTop = height - squaresPerSmallestSide * squareWidth;
  const baseTop = 0;

  return (
    <div
      className='fixed left-0 grid grid-flow-col-dense place-items-center place-content-center col-span-2 row-span-2 z-30'
      style={{
        top: baseTop,
        width: squareWidth * 2,
        height: squareWidth * 2,
      }}
    >
      <Triangle
        className={`${triangleClassNameCommon} left-0 rotate-180`}
        style={{
          top: baseTop,
          width: squareWidth,
          height: squareWidth,
        }}
      />
      <Triangle
        className={`${triangleClassNameCommon} -rotate-90`}
        style={{
          top: baseTop,
          left: squareWidth,
          width: squareWidth,
          height: squareWidth,
        }}
      />
      <Triangle
        className={`${triangleClassNameCommon} left-0 rotate-90`}
        style={{
          top: squareWidth + baseTop,
          width: squareWidth,
          height: squareWidth,
        }}
      />
      <Triangle
        className={triangleClassNameCommon}
        style={{
          top: squareWidth + baseTop,
          left: squareWidth,
          width: squareWidth,
          height: squareWidth,
        }}
      />
      <img
        style={{
          width: squareWidth,
          height: squareWidth,
          left: squareWidth / 2,
          top: squareWidth / 2 + baseTop,
        }}
        className='fixed'
        alt=''
        src='/favicon.svg'
      />
    </div>
  );
};

export default SocialImageLogo;
