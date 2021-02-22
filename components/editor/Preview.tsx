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
  const { width, height, text, image, version } = state;
  const url = [
    "/api/social-image?",
    `width=${encodeURIComponent(width)}`,
    `&height=${encodeURIComponent(height)}`,
    text ? `&text=${encodeURIComponent(text)}` : "",
    image ? `&imgUrl=${encodeURIComponent(image.url)}` : "",
    `&version=${version}`,
  ].join("");

  useEffect(() => {
    if (url === lastImgUrl) return;
    startLoadingImage();
    const imageToLoad = new Image();
    imageToLoad.onload = function () {
      stopLoadingImage();
      lastImgUrl = url;
    };
    imageToLoad.onerror = function () {
      stopLoadingImage();
      lastImgUrl = undefined;
    };
    imageToLoad.src = url;
  }, [url, startLoadingImage, stopLoadingImage]);

  return (
    <div
      className='h-screen bg-gray-100 grid place-content-center place-items-center p-8 overflow-hidden relative'
      style={{ width: "calc(100vw - 400px)" }}
    >
      <div
        className={[
          "rounded bg-center bg-no-repeat bg-contain grid place-content-center max-w-full max-h-full bg-gray-300",
          imageIsLoading ? "animate-pulse" : "",
        ].join(" ")}
        style={{
          width: `min(${width}px, calc(100vw - 480px))`,
          height: `min(${height}px, calc(100vh - 80px))`,
          backgroundImage: imageIsLoading ? "none" : `url("${url}")`,
        }}
      >
        {imageIsLoading ? "Loading..." : ""}
      </div>
      {!imageIsLoading && (
        <img
          src={url}
          alt='Error'
          className='absolute w-full h-full top-0 left-0'
          style={{ opacity: 0.01 }}
        />
      )}
    </div>
  );
};

export default EditorPreview;
