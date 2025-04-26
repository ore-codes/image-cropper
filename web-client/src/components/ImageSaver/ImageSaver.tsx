import { Icon } from '@iconify/react';
import useImageSaver from './useImageSaver';

const ImageSaver = () => {
  const h = useImageSaver();

  return (
    <div className="rounded-lg bg-white p-3 shadow sm:p-6">
      <h2 className="mb-4 text-center text-xl font-semibold sm:mb-6 sm:text-2xl">
        Your Cropped Image is Ready!
      </h2>

      <div className="mx-auto max-w-xl">
        <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 sm:mb-6">
          {h.croppedImage ? (
            <img
              src={h.getImageUrl(h.croppedImage)}
              alt="Cropped Result"
              className="h-auto w-full"
            />
          ) : (
            <div className="flex h-[200px] w-full items-center justify-center text-sm text-gray-400 sm:h-[300px] sm:text-base">
              400 × 300
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center gap-2 sm:flex-row sm:gap-3">
          <button
            onClick={h.handleReset}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm transition-colors hover:bg-gray-50 sm:w-auto sm:text-base"
          >
            <Icon icon="heroicons:arrow-path" className="h-4 w-4 sm:h-5 sm:w-5" />
            Start Over
          </button>

          <button
            onClick={h.handleDownload}
            className="btn-primary flex w-full items-center justify-center gap-2 sm:w-auto"
          >
            <Icon icon="heroicons:arrow-down-tray" className="h-4 w-4 sm:h-5 sm:w-5" />
            Download Image
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-1 text-sm text-gray-600 sm:mt-6 sm:gap-2 sm:text-base">
          <Icon icon="heroicons:check-circle" className="h-4 w-4 text-green-500 sm:h-5 sm:w-5" />
          <span>Image Successfully Cropped</span>
          <span className="text-xs text-gray-400 sm:text-sm">•</span>
          <span className="text-xs text-gray-400 sm:text-sm">Just now</span>
        </div>
      </div>
    </div>
  );
};

export default ImageSaver;
