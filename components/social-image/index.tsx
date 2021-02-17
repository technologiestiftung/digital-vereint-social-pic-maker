import { FC } from "react";
import SocialImageGraphics from "./Graphics";
import SocialImageImage from "./Image";
import Text from "./Text";

export type SocialImageType = {
  text: string;
  width: number;
  height: number;
  noLogo: boolean;
  textPadding: number;
  fullOuterPadding: number;
  innerOuterPadding: number;
  outerPadding: number;
  innerPadding: number;
  imgUrl: string;
};

const SocialImage: FC<SocialImageType> = props => {
  const { text, width, height, fullOuterPadding, imgUrl } = props;
  return (
    <div
      className='bg-black'
      style={{
        width: width - fullOuterPadding,
        height: height - fullOuterPadding,
      }}
    >
      {imgUrl && <SocialImageImage {...props} />}
      <SocialImageGraphics {...props} />
      {text && <Text {...props} />}
    </div>
  );
};

export default SocialImage;
