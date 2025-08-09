import { Upload } from "lucide-react";
import React, { FC, useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { toast } from "sonner";

interface ImageDropZoneProps {
  options: DropzoneOptions;
  description?: string;
  onUploadImageFile: ({ url, file }: { url: string; file: File }) => void;
}

export const ImageDropZone: FC<ImageDropZoneProps> = ({
  options,
  description,
  onUploadImageFile,
}) => {
  const [previewImageFiles, setPreviewImageFiles] = useState<File[]>([]);

  const _onDrop = (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      const reader = new FileReader();
      reader.onabort = () => toast.info("파일 등록이 취소되었습니다.");
      reader.onerror = () => toast.error("파일 등록이 취소되었습니다.");
      reader.onload = () => {
        const url = URL.createObjectURL(file);

        setPreviewImageFiles((prev) => [...prev, file]);
        onUploadImageFile({ url, file });
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...options,
    onDrop: _onDrop,
  });

  return (
    <div
      className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
        isDragActive
          ? "border-blue-400 bg-blue-50 scale-105"
          : previewImageFiles.length > 0
          ? "border-green-400 bg-green-50"
          : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
      }`}
    >
      <div {...getRootProps()}>
        <div className="mb-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl font-semibold text-gray-700 mb-2">
            이미지를 드래그하여 놓거나 클릭하여 선택하세요
          </p>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};
