import { Device } from "@enums/screenshot/Device";
import { Orientation } from "@enums/screenshot/Orientation";

export const SCREENSHOT_SPECS = {
  [Device.iPhone15ProMax]: {
    [Orientation.PORTRAIT]: { width: 1290, height: 2796 },
    [Orientation.LANDSCAPE]: { width: 2796, height: 1290 },
  },
  [Device.iPhone15]: {
    [Orientation.PORTRAIT]: { width: 1179, height: 2556 },
    [Orientation.LANDSCAPE]: { width: 2556, height: 1179 },
  },
  [Device.iPhone14Plus]: {
    [Orientation.PORTRAIT]: { width: 1242, height: 2688 },
    [Orientation.LANDSCAPE]: { width: 2688, height: 1242 },
  },
  [Device.iPadPro129]: {
    [Orientation.PORTRAIT]: { width: 2048, height: 2732 },
    [Orientation.LANDSCAPE]: { width: 2732, height: 2048 },
  },
  [Device.iPadAir]: {
    [Orientation.PORTRAIT]: { width: 1668, height: 2388 },
    [Orientation.LANDSCAPE]: { width: 2388, height: 1668 },
  },
};
