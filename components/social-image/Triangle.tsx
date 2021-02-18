import { CSSProperties, FC } from "react";

const Triangle: FC<{ className?: string; style?: CSSProperties }> = ({
  style = {},
  className = "",
}) => (
  <svg
    className={`transform ${className}`}
    style={style}
    viewBox='0 0 1 1'
    xmlns='http://www.w3.org/2000/svg'
  >
    <polygon fill='currentColor' points='0,1 0,0 1,0'></polygon>
  </svg>
);

export default Triangle;
