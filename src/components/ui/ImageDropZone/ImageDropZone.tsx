import React, { FC, useCallback, useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { toast } from "sonner";

interface ImageDropZoneProps {
  options: DropzoneOptions;
  description?: string;
}

export const ImageDropZone: FC<ImageDropZoneProps> = ({
  options,
  description,
}) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const _onDrop = (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      const reader = new FileReader();
      reader.onabort = () => toast.info("파일 등록이 취소되었습니다.");
      reader.onerror = () => toast.error("파일 등록이 취소되었습니다.");
      reader.onload = () => {
        const dataURL = reader.result as string;
        setPreviewImages((prev) => [...prev, dataURL]);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    ...options,
    onDrop: _onDrop,
  });

  const renderPreviewImage = useCallback(() => {
    if (previewImages.length === 0) return null;

    return (
      <div>
        <p>선택된 이미지 ({previewImages.length}개)</p>
        {previewImages.map((image) => (
          <div key={image}>
            <img src={image} alt="preview image" />
          </div>
        ))}
      </div>
    );
  }, [previewImages]);

  return (
    <div>
      <div {...getRootProps()}>
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto"></div>
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl font-semibold text-gray-700 mb-2">
            이미지를 드래그하여 놓거나 클릭하여 선택하세요
          </p>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
      {renderPreviewImage()}
    </div>
  );
};
