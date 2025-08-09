import { SCREENSHOT_SPECS } from "@/data/constants/screenshot";
import { Device } from "@enums/screenshot/Device";
import { Orientation } from "@enums/screenshot/Orientation";
import React, { FC } from "react";

interface OrientationSelectorProps {
  selectedDevice: Device;
  selectedOrientation: Orientation;
  onChange: (orientation: Orientation) => void;
}

export const OrientationSelector: FC<OrientationSelectorProps> = ({
  selectedOrientation,
  selectedDevice,
  onChange,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        {/* <Tablet className="w-5 h-5 mr-2 text-green-600" /> */}
        화면 방향
      </h3>
      <div className="space-y-3">
        {Object.values(Orientation).map((orientation) => (
          <label key={orientation} className="cursor-pointer block">
            <input
              type="radio"
              name="orientation"
              value={orientation}
              checked={selectedOrientation === orientation}
              onChange={(e) => onChange(e.target.value as Orientation)}
              className="sr-only"
            />
            <div
              className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                selectedOrientation === orientation
                  ? "border-green-500 bg-green-50 shadow-lg"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 capitalize">
                    {orientation === "portrait"
                      ? "세로 (Portrait)"
                      : "가로 (Landscape)"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {SCREENSHOT_SPECS[selectedDevice][orientation].width} ×{" "}
                    {SCREENSHOT_SPECS[selectedDevice][orientation].height} px
                  </p>
                </div>
                {/* {selectedOrientation === orientation && (
                  <Check className="w-5 h-5 text-green-600" />
                )} */}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
