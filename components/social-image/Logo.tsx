import { FC } from "react";
import { SocialImageType } from ".";

type SocialImageLogoType = SocialImageType & {
  containerSize: number;
};

const SocialImageLogo: FC<SocialImageLogoType> = ({
  innerOuterPadding,
  containerSize,
}) => (
  <div
    className='fixed top-0 left-0 grid grid-flow-col-dense place-items-center place-content-center col-span-2 row-span-2'
    style={{
      width: containerSize,
      height: containerSize,
    }}
  >
    <img
      style={{
        width: containerSize / 2,
        height: containerSize / 2,
        left: innerOuterPadding,
        top: innerOuterPadding,
      }}
      alt=''
      src='/favicon.svg'
    />
  </div>
);

export default SocialImageLogo;
