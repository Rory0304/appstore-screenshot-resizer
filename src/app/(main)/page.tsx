import React from 'react';

import ScreenShotProvider from '@/components/pages/main/contexts/provider';
import { MainBanner } from '@/components/views/main/MainBanner';
import { MainImageProcessor } from '@/components/views/main/MainImageProcessor';
import { MainImageUploader } from '@/components/views/main/MainImageUploader';
import { MainOptionSelector } from '@/components/views/main/MainOptionSelector';

export default function MainPage() {
    return (
        <ScreenShotProvider>
            <div>
                <MainBanner />
                <div className="grid grid-cols-2 gap-12 bg-white py-16 px-12 rounded-xl">
                    <MainImageUploader />
                    <div>
                        <MainOptionSelector />
                        <MainImageProcessor />
                    </div>
                </div>
            </div>
        </ScreenShotProvider>
    );
}
