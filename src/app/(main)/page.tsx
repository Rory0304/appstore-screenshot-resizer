import ScreenShotProvider from "@/components/pages/main/contexts/provider";
import { MainBanner } from "@/components/views/main/MainBanner";
import { MainImageUploader } from "@/components/views/main/MainImageUploader";
import { MainOptionSelector } from "@/components/views/main/MainOptionSelector";
import React from "react";

export default function MainPage() {
  return (
    <ScreenShotProvider>
      <div>
        <MainBanner />
        <MainImageUploader />
        <MainOptionSelector />
      </div>
    </ScreenShotProvider>
  );
}
