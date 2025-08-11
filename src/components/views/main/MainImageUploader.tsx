'use client';

import React, { FC, useCallback } from 'react';

import { useScreenShot } from '@/components/pages/main/contexts/provider';
import { ScreenShotActionKey } from '@/components/pages/main/contexts/type';
import { ImageDropZone } from '@/components/ui/ImageDropZone';
import { RotateCcw, Upload, X } from 'lucide-react';

export const MainImageUploader: FC = () => {
    const {
        screenShotConfig: { imageFiles },
        dispatch,
    } = useScreenShot();

    const onUploadImageFile = ({ url, file }: { url: string; file: File }) => {
        dispatch({
            type: ScreenShotActionKey.SET_IMAGE_FILE,
            payload: { url, file },
        });
    };

    const onClearAllFiles = () => {
        dispatch({
            type: ScreenShotActionKey.RESET_IMAGE_FILES,
            payload: undefined,
        });
    };

    const onRemoveImageFile = (index: number) => {
        dispatch({
            type: ScreenShotActionKey.REMOVE_IMAGE_FILE,
            payload: index,
        });
    };

    const renderPreviewImage = useCallback(() => {
        if (imageFiles.length === 0) return null;

        return (
            <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 w-full text-left">
                        선택된 이미지 ({imageFiles.length}개)
                    </h3>
                    {imageFiles.length > 0 && (
                        <button
                            onClick={onClearAllFiles}
                            className="flex items-center space-x-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors flex-shrink-0"
                        >
                            <RotateCcw className="w-4 h-4" />
                            <span>전체 삭제</span>
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {imageFiles.map(({ file, url }, index) => (
                        <div key={file.name} className="relative group">
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={url}
                                    alt={`preview image-${index}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button
                                onClick={() => onRemoveImageFile(index)}
                                className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <p className="text-xs text-gray-600 mt-2 truncate">
                                {file.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }, [imageFiles]);

    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Upload className="w-6 h-6 mr-3 text-blue-600" />
                    이미지 업로드
                </h2>
            </div>

            <div>
                <ImageDropZone
                    description="PNG, JPG, JPEG 파일 지원 • 최대 10MB"
                    options={{
                        accept: {
                            'image/png': ['.png'],
                            'image/jpeg': ['.jpeg'],
                            'image/jpg': ['.jpg'],
                        },
                        maxFiles: 5, // [TODO] 최대 파일 개수
                        // maxSize: 10 * 1024 * 1024, // 10MB
                    }}
                    onUploadImageFile={onUploadImageFile}
                />
                {renderPreviewImage()}
            </div>
        </div>
    );
};
