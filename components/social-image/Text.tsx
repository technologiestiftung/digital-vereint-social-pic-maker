import { FC, useEffect, useRef, useState } from "react";
import { SocialImageType } from "./index";

export const TEXT_MAX_LENGTH = 75;

type TextPropsType = SocialImageType & {
  squareWidth: number;
  squaresPerHeight: number;
};

const formatText = (text: string): string => {
  const decodedText = decodeURIComponent(text);
  return decodedText.length > TEXT_MAX_LENGTH
    ? `${decodedText.slice(0, TEXT_MAX_LENGTH)}...`
    : decodedText;
};

const SocialImageText: FC<TextPropsType> = ({
  width,
  textPadding,
  text,
  squareWidth,
  squaresPerHeight,
  height,
}) => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const [originalHeight, setOriginalHeight] = useState<number | undefined>();

  useEffect(() => {
    if (!originalHeight && h1Ref !== null && h1Ref.current) {
      setOriginalHeight(h1Ref.current.getBoundingClientRect().height);
    }
  }, [originalHeight, setOriginalHeight]);

  return (
    <h1
      ref={h1Ref}
      className='absolute bg-black text-white leading-tight text-4xl break-normal overflow-hidden z-20 inline-grid content-center'
      style={{
        WebkitFontSmoothing: "antialiased",
        maxWidth: `${width}px`,
        height: originalHeight
          ? `${
              Math.ceil(originalHeight / squareWidth) * squareWidth +
              (squareWidth % (squaresPerHeight * squareWidth - height) || 0)
            }px`
          : "auto ",
        left: 0,
        bottom: 0,
        paddingLeft: textPadding,
        paddingRight: textPadding,
      }}
    >
      {formatText(text)}
    </h1>
  );
};

export default SocialImageText;
