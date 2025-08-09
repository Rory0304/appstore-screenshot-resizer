import { Device } from "@/data/enums/screenshot";
import { Orientation } from "@/data/enums/screenshot/Orientation";

export interface ScreenShotConfig {
  orientation: Orientation;
  device: Device;
}

export enum ScreenShotActionKey {
  SET_ORIENTATION = "SET_ORIENTATION",
  SET_DEVICE = "SET_DEVICE",
}

export type ScreenShotActionType =
  | {
      type: ScreenShotActionKey.SET_ORIENTATION;
      payload: Orientation;
    }
  | {
      type: ScreenShotActionKey.SET_DEVICE;
      payload: Device;
    };
