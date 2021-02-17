import { FC, useContext, useEffect } from "react";
import { EditorContext } from "./EditorContext";

let lastImgUrl: string | undefined = undefined;
const EditorPreview: FC = () => {
  const {
    state,
    imageIsLoading,
    startLoadingImage,
    stopLoadingImage,
  } = useContext(EditorContext);
  const { width, height, text, imgUrl, version } = state;
  const url = `/api/social-image?width=${encodeURIComponent(
    width
  )}&height=${encodeURIComponent(height)}&text=${encodeURIComponent(
    text
  )}&imgUrl=${encodeURIComponent(imgUrl)}&version=${version}`;

  useEffect(() => {
    if (url === lastImgUrl) return;
    startLoadingImage();
    const imageToLoad = new Image();
    imageToLoad.onload = function () {
      stopLoadingImage();
      lastImgUrl = url;
    };
    imageToLoad.src = url;
  }, [url, startLoadingImage, stopLoadingImage]);

  return (
    <div className='h-screen grid place-content-center place-items-center p-8'>
      {imageIsLoading ? (
        "Loading..."
      ) : (
        <img
          src={url}
          alt='Social Pic Maker Preview'
          className='max-w-full rounded'
        />
      )}
    </div>
  );
};

export default EditorPreview;
