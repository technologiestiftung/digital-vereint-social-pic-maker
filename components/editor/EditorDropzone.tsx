import { getReadableFileSizeString } from "@utils/fileSizeUtil";
import { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";

type ImageType =
  | {
      name: string;
      url: string;
      size: number;
    }
  | undefined;

const DropZone: FC<{ isDragActive: boolean }> = ({ isDragActive }) =>
  isDragActive ? (
    <p>Legen Sie die Dateien hier ab ...</p>
  ) : (
    <p>
      Ziehen Sie eine Datei per Drag & Drop hierher, oder{" "}
      <span className='underline'>klicken Sie</span>, um die Datei auszuwählen
    </p>
  );

export const EditorDropzone: FC<{
  value: ImageType;
  onImageDropSuccess?: (image: ImageType) => void;
  onImageDropError?: () => void;
  onImageDropAbort?: () => void;
}> = ({
  value,
  onImageDropSuccess = () => undefined,
  onImageDropError = () => console.log("file reading has failed"),
  onImageDropAbort = () => console.log("file reading was aborted"),
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onabort = onImageDropAbort;
      reader.onerror = onImageDropError;
      reader.onload = () => {
        const typedArr = new Uint8Array(reader.result as ArrayBufferLike);
        const stringChar = typedArr.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, "");
        const base64String = window.btoa(stringChar);
        onImageDropSuccess({
          name: file.name,
          size: file.size,
          url: `data:${file.type};base64, ${base64String}`,
        });
      };
      reader.readAsArrayBuffer(file);
    },
    [onImageDropAbort, onImageDropSuccess, onImageDropError]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  return !value ? (
    <div
      {...getRootProps()}
      className={[
        "h-32 grid place-content-center",
        "p-4 border-2 border-gray-300 rounded cursor-pointer text-center text-sm text-gray-600",
        isDragActive
          ? "border-solid border-primary bg-primary bg-opacity-10 text-primary"
          : "border-dashed",
      ].join(" ")}
    >
      <input {...getInputProps()} />
      <DropZone isDragActive={isDragActive} />
    </div>
  ) : (
    <div
      className='mt-2 overflow-hidden rounded bg-white shadow-sm border border-gray-100 grid'
      style={{ gridTemplateColumns: "100px 1fr", height: 100 }}
    >
      <img
        src={value.url}
        alt='Error loading a preview'
        className='h-full object-cover inline-block'
        style={{ width: 100, height: 100 }}
      />
      <div className='p-4 border-l border-gray-100 truncate'>
        <h4 className='font-bold inline'>{value.name}</h4>
        <span className='block'>
          {getReadableFileSizeString(value.size, true)}
        </span>
      </div>
    </div>
  );
};
