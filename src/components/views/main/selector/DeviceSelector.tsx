import { FC } from 'react';

import { SCREENSHOT_SPECS } from '@/data/constants/screenshot';
import { Device } from '@/data/enums/screenshot';
import { Check } from 'lucide-react';

interface DeviceSelectorProps {
    selectedDevice: Device;
    onChange: (device: Device) => void;
}

export const DeviceSelector: FC<DeviceSelectorProps> = ({
    selectedDevice,
    onChange,
}) => {
    return (
        <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                {/* <Smartphone className="w-5 h-5 mr-2 text-purple-600" /> */}
                기기 선택
            </h3>
            <div className="grid gap-3">
                {Object.entries(SCREENSHOT_SPECS).map(([device, specs]) => (
                    <label key={device} className="cursor-pointer">
                        <input
                            type="radio"
                            name="device"
                            value={device}
                            checked={selectedDevice === device}
                            onChange={(e) => onChange(e.target.value as Device)}
                            className="sr-only"
                        />
                        <div
                            className={`p-4 rounded-xl border-2  ${
                                selectedDevice === device
                                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div
                                        className={`w-10 h-10 rounded-lg bg-gradient-to-r flex items-center justify-center text-white font-bold`}
                                    >
                                        {/* {specs.icon} */}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {device}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {specs.portrait.width}×
                                            {specs.portrait.height}
                                        </p>
                                    </div>
                                </div>
                                {selectedDevice === device && (
                                    <Check className="w-5 h-5 text-blue-600" />
                                )}
                            </div>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
};
