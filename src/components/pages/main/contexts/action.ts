import {
  ScreenShotActionKey,
  ScreenShotActionType,
  ScreenShotConfig,
} from "./type";

/**
 * reducer
 */
export const reducer = (
  screenShotConfig: ScreenShotConfig,
  action: ScreenShotActionType
): ScreenShotConfig => {
  switch (action.type) {
    case ScreenShotActionKey.SET_ORIENTATION:
      return { ...screenShotConfig, orientation: action.payload };

    case ScreenShotActionKey.SET_DEVICE:
      return { ...screenShotConfig, device: action.payload };
  }
};
