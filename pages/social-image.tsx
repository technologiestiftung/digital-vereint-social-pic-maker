import { NextApiRequest, NextPage } from "next";

type SocialImagePageProps = {
  text?: string;
  width?: number;
  height?: number;
  noLogo?: boolean;
  logoSize?: number;
  strokeWidth?: number;
  textPadding?: number;
  innerPadding?: number;
  outerPadding?: number;
  padding?: number;
  imgUrl?: string;
};

const SocialImagePage: NextPage<SocialImagePageProps> = ({
  text,
  width = 1200,
  height = 640,
  noLogo = false,
  logoSize = 80,
  textPadding = 32,
  innerPadding = 40,
  outerPadding = 0,
  padding,
  imgUrl,
}) => {
  const innerPad = padding && !innerPadding ? padding : innerPadding;
  const outerPad = padding && !outerPadding ? padding : outerPadding;
  const innerOuterPadding = innerPad + outerPad;
  const fullOuterPadding = outerPad * 2;
  return (
    <div>
      {imgUrl && (
        <div
          className='fixed bg-primary bg-cover box-border border-primary'
          style={{
            width: width - fullOuterPadding,
            height: height - fullOuterPadding,
            marginLeft: outerPad,
            marginTop: outerPad,
            backgroundImage: `url(${imgUrl})`,
            backgroundBlendMode: "luminosity",
          }}
        />
      )}
      {!noLogo && (
        <img
          style={{
            width: logoSize,
            height: logoSize,
            left: innerOuterPadding,
            top: innerOuterPadding,
          }}
          alt=''
          src='/favicon.svg'
          className='fixed rounded-md'
        />
      )}
      {text && (
        <h1
          className='fixed bg-black text-white leading-tight text-4xl break-normal overflow-hidden'
          style={{
            maxWidth: `${width}px`,
            left: 0,
            top: height,
            transform: "translateY(-100%)",
            padding: `${Math.round(
              textPadding * 0.8
            )}px ${textPadding}px ${Math.round(textPadding)}px`,
          }}
        >
          {text.length > 109 ? `${text.slice(0, 109)}...` : text}
        </h1>
      )}
    </div>
  );
};

export const getServerSideProps = ({
  query,
}: NextApiRequest): { props: SocialImagePageProps } => ({
  props: query,
});

export default SocialImagePage;
