'use client';

import { type Dispatch, createContext, useContext, useReducer } from 'react';

import { reducer } from './action';
import { ScreenShotActionType, ScreenShotConfig } from './type';

import { Device, Orientation } from '@/data/enums/screenshot';

export const ScreenShotContext = createContext<{
    screenShotConfig: ScreenShotConfig;
    dispatch: Dispatch<ScreenShotActionType>;
}>({
    screenShotConfig: {
        orientation: Orientation.PORTRAIT,
        device: Device.iPhone15,
        imageFiles: [],
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
        imageFiles: [],
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
            'useScreenShot Hook must be used within the ScreenShotProvider',
        );
    }
    return context;
};
