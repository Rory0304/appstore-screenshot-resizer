"use client";

import { useScreenShot } from "@/components/pages/main/contexts/provider";
import { SCREENSHOT_SPECS } from "@/data/constants/screenshot";
import { ImageResizer } from "@/domain/utils/image/imageResizer";
import JSZip from "jszip";
import { Zap } from "lucide-react";
import React, { FC, useState } from "react";
import { toast } from "sonner";

export const MainImageProcessor: FC = () => {
  const {
    screenShotConfig: { orientation, device, imageFiles },
  } = useScreenShot();

  const [isProcessing, setIsProcessing] = useState(false);

  const downloadWithZip = async (resizedFiles: File[]) => {
    const zip = new JSZip();

    resizedFiles.forEach((file) => {
      zip.file(
        `${device}-${orientation}-${file.name}.${file.type.split("/")[1]}`,
        file
      );
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${device}-${orientation}.zip`;
      a.click();
    });
  };

  /**
   * [TODO] Canvas 에서 규격에 따라 이미지 처리
   */
  const processImages = async () => {
    try {
      setIsProcessing(true);
      const options = SCREENSHOT_SPECS[device][orientation];

      const result = await Promise.all(
        imageFiles.map(async ({ file }) => {
          return await ImageResizer.resizeImage(file, {
            width: options.width,
            height: options.height,
            backgroundColor: "transparent",
          });
        })
      );

      downloadWithZip(result);
    } catch (error) {
      console.error(error);
      toast.error("이미지 리사이즈에 실패했습니다.");
    } finally {
      setIsProcessing(false);
      toast.success("이미지 리사이즈에 성공했습니다.");
    }
  };

  return (
    <div className="my-12">
      <button
        onClick={processImages}
        disabled={imageFiles.length === 0 || isProcessing}
        className={`w-full py-6 px-8 rounded-2xl font-bold text-lg duration-200 ${
          imageFiles.length === 0 || isProcessing
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          <Zap className="w-6 h-6" />
          <span>모든 이미지 처리하기 ({imageFiles.length}개)</span>
        </div>
      </button>
    </div>
  );
};
