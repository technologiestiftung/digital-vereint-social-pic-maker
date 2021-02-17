import { NextApiRequest, NextPage } from "next";
import SocialImage from "@components/social-image";

type SocialImagePageProps = {
  text?: string;
  width?: string;
  height?: string;
  noLogo?: boolean;
  textPadding?: string;
  innerPadding?: string;
  outerPadding?: string;
  padding?: string;
  imgUrl?: string;
};

const SocialImagePage: NextPage<SocialImagePageProps> = ({
  text = "",
  width = "1200",
  height = "640",
  noLogo = false,
  textPadding = "40",
  innerPadding: innerPad = "40",
  outerPadding: outerPad = "0",
  padding,
  imgUrl = "",
}) => {
  const innerPadding = parseInt(padding && !innerPad ? padding : innerPad, 10);
  const outerPadding = parseInt(padding && !outerPad ? padding : outerPad, 10);
  const innerOuterPadding = innerPadding + outerPadding;
  const fullOuterPadding = outerPadding * 2;
  return (
    <SocialImage
      text={text}
      width={parseInt(width, 10)}
      height={parseInt(height)}
      noLogo={noLogo}
      textPadding={parseInt(textPadding)}
      innerPadding={innerPadding}
      outerPadding={outerPadding}
      innerOuterPadding={innerOuterPadding}
      fullOuterPadding={fullOuterPadding}
      imgUrl={imgUrl}
    />
  );
};

export const getServerSideProps = ({
  query,
}: NextApiRequest): { props: SocialImagePageProps } => ({
  props: query,
});

export default SocialImagePage;
