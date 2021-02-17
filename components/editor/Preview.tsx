import { FC, useContext } from "react";
import { EditorContext } from "./EditorContext";

const EditorPreview: FC = () => {
  const { state } = useContext(EditorContext);
  const { width, height, text, imgUrl } = state;
  const url = `/api/social-image?width=${encodeURIComponent(
    width
  )}&height=${encodeURIComponent(height)}&text=${encodeURIComponent(
    text
  )}&imgUrl=${encodeURIComponent(imgUrl)}`;

  return (
    <div className='h-screen grid place-content-center place-items-center p-8'>
      <img src={url} alt='Social Pic Maker Preview' className='max-w-full' />
    </div>
  );
};

export default EditorPreview;
