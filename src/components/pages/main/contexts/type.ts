import { Device } from "@/data/enums/screenshot";
import { Orientation } from "@/data/enums/screenshot/Orientation";

export interface ScreenShotConfig {
  orientation: Orientation;
  device: Device;
  imageFiles: { url: string; file: File }[];
}

export enum ScreenShotActionKey {
  SET_ORIENTATION = "SET_ORIENTATION",
  SET_DEVICE = "SET_DEVICE",
  SET_IMAGE_FILE = "SET_IMAGE_FILE",
  REMOVE_IMAGE_FILE = "REMOVE_IMAGE_FILE",
  RESET_IMAGE_FILES = "RESET_IMAGE_FILES",
}

export type ScreenShotActionType =
  | {
      type: ScreenShotActionKey.SET_ORIENTATION;
      payload: Orientation;
    }
  | {
      type: ScreenShotActionKey.SET_DEVICE;
      payload: Device;
    }
  | {
      type: ScreenShotActionKey.SET_IMAGE_FILE;
      payload: { url: string; file: File };
    }
  | {
      type: ScreenShotActionKey.REMOVE_IMAGE_FILE;
      payload: number;
    }
  | {
      type: ScreenShotActionKey.RESET_IMAGE_FILES;
      payload: void;
    };
