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

    case ScreenShotActionKey.SET_IMAGE_FILE:
      return {
        ...screenShotConfig,
        imageFiles: [
          ...screenShotConfig.imageFiles,
          { url: action.payload.url, file: action.payload.file },
        ],
      };

    case ScreenShotActionKey.REMOVE_IMAGE_FILE:
      return {
        ...screenShotConfig,
        imageFiles: screenShotConfig.imageFiles.filter(
          (_, i) => i !== action.payload
        ),
      };

    case ScreenShotActionKey.RESET_IMAGE_FILES:
      return {
        ...screenShotConfig,
        imageFiles: [],
      };

    default:
      return screenShotConfig;
  }
};
