'use client';

import React from 'react';

import { OrientationSelector } from './selector';
import { DeviceSelector } from './selector/DeviceSelector';

import { useScreenShot } from '@/components/pages/main/contexts/provider';
import { ScreenShotActionKey } from '@/components/pages/main/contexts/type';

export const MainOptionSelector = () => {
    const {
        screenShotConfig: { device, orientation },
        dispatch,
    } = useScreenShot();

    return (
        <div>
            <DeviceSelector
                selectedDevice={device}
                onChange={(device) =>
                    dispatch({
                        type: ScreenShotActionKey.SET_DEVICE,
                        payload: device,
                    })
                }
            />
            <OrientationSelector
                selectedOrientation={orientation}
                selectedDevice={device}
                onChange={(orientation) =>
                    dispatch({
                        type: ScreenShotActionKey.SET_ORIENTATION,
                        payload: orientation,
                    })
                }
            />
        </div>
    );
};
