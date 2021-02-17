import { FC } from "react";
import { SocialImageType } from "./index";

const SocialImageImage: FC<SocialImageType> = ({
  width,
  height,
  fullOuterPadding,
  outerPadding,
  imgUrl,
}) => (
  <div
    className='fixed bg-primary bg-cover box-border border-primary z-0'
    style={{
      width: width - fullOuterPadding,
      height: height - fullOuterPadding,
      marginLeft: outerPadding,
      marginTop: outerPadding,
      backgroundImage: `url(${imgUrl})`,
      backgroundBlendMode: "luminosity",
    }}
  />
);

export default SocialImageImage;
