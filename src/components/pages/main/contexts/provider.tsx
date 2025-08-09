"use client";

import { Device, Orientation } from "@/data/enums/screenshot";
import { createContext, useContext, useReducer, type Dispatch } from "react";
import { ScreenShotActionType, ScreenShotConfig } from "./type";
import { reducer } from "./action";

export const ScreenShotContext = createContext<{
  screenShotConfig: ScreenShotConfig;
  dispatch: Dispatch<ScreenShotActionType>;
}>({
  screenShotConfig: {
    orientation: Orientation.PORTRAIT,
    device: Device.iPhone15,
  },
  dispatch: () => undefined,
});

interface ScreenShotProviderProps {
  children: React.ReactNode;
}

export default function ScreenShotProvider({
  children,
}: ScreenShotProviderProps) {
  const [screenShotConfig, dispatch] = useReducer(reducer, {
    orientation: Orientation.PORTRAIT,
    device: Device.iPhone15,
  });

  return (
    <ScreenShotContext.Provider value={{ screenShotConfig, dispatch }}>
      {children}
    </ScreenShotContext.Provider>
  );
}

export const useScreenShot = () => {
  const context = useContext(ScreenShotContext);
  if (!context) {
    throw new Error(
      "useScreenShot Hook must be used within the ScreenShotProvider"
    );
  }
  return context;
};
