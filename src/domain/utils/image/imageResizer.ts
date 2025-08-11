type ResizeImageOptions = {
    width: number;
    height: number;
    backgroundColor?: string;
};

/**
 * 이미지 리사이즈
 */
export const resizeImage = async (file: File, options: ResizeImageOptions) => {
    const canvas = await createCanvas(file);
    const resizedCanvas = resizeCanvas(canvas, options.width, options.height);
    const resizedFile = await canvasToFile(resizedCanvas, file);
    return resizedFile;
};

/**
 * Image file를 canvas 변환
 */
export const createCanvas = (file: File): Promise<HTMLCanvasElement> => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            reject(new Error('Cannot get canvas context'));
            return;
        }

        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            if (!e.target?.result) {
                reject(new Error('Failed to read file'));
                return;
            }

            img.onload = () => {
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;

                // Optional: Fill background color (uncomment if needed)
                // const bgColor = '#ffffff';
                // ctx.fillStyle = bgColor;
                // ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.drawImage(img, 0, 0);
                resolve(canvas);
            };

            img.onerror = () => {
                reject(new Error('Failed to load image'));
            };

            img.src = e.target.result as string;
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        reader.readAsDataURL(file);
    });
};

/**
 * Canvas 에서 규격에 따라 이미지 처리
 */
export const resizeCanvas = (
    sourceCanvas: HTMLCanvasElement,
    width: number,
    height: number,
): HTMLCanvasElement => {
    const resizedCanvas = document.createElement('canvas');
    const ctx = resizedCanvas.getContext('2d');

    if (!ctx) {
        throw new Error('Cannot get canvas context');
    }

    resizedCanvas.width = width;
    resizedCanvas.height = height;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // [TODO] 여백은 어떻게 처리해야 할지 확인 필요
    ctx.drawImage(sourceCanvas, 0, 0, width, height);

    return resizedCanvas;
};

/**
 * Canvas 이미지를 File 객체로 변환
 */
export const canvasToFile = (
    canvas: HTMLCanvasElement,
    imageFile: File,
): Promise<File> => {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                const file = new File([blob], imageFile.name, {
                    type: imageFile.type,
                });
                resolve(file);
            } else {
                reject(new Error('Failed to convert canvas to Blob'));
            }
        }, imageFile.type);
    });
};

export const ImageResizer = {
    resizeImage,
};
