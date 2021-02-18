import { FC } from "react";
import { SocialImageType } from "./index";

const formatText = (text: string): string => {
  const decodedText = decodeURIComponent(text);
  return decodedText.length > 100
    ? `${decodedText.slice(0, 100)}`
    : decodedText;
};

const SocialImageText: FC<SocialImageType> = ({
  width,
  height,
  textPadding,
  text,
}) => (
  <h1
    className='fixed bg-black text-white leading-tight text-4xl break-normal overflow-hidden z-20'
    style={{
      maxWidth: `${width}px`,
      left: 0,
      top: `${height}px`,
      transform: "translateY(-100%)",
      padding: `${Math.round(
        textPadding * 0.8
      )}px ${textPadding}px ${Math.round(textPadding)}px`,
    }}
  >
    {formatText(text)}
  </h1>
);

export default SocialImageText;
