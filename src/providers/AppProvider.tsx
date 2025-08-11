import React, { FC } from 'react';

import { Toaster } from 'sonner';

interface AppProviderProps {
    children: React.ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
    return (
        <>
            {children}
            <Toaster />
        </>
    );
};
