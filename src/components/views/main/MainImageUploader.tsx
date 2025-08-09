"use client";

import React, { FC } from "react";
import { ImageDropZone } from "@/components/ui/ImageDropZone";

export const MainImageUploader: FC = () => {
  return (
    <div>
      <ImageDropZone
        description="PNG, JPG, JPEG 파일 지원 • 최대 10MB"
        options={{
          accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          },
          maxFiles: 5, // [TODO] 최대 파일 개수
          // maxSize: 10 * 1024 * 1024, // 10MB
        }}
      />
    </div>
  );
};
