import { Icon } from '@iconify/react';
import useImageSaver from './useImageSaver';

const ImageSaver = () => {
  const h = useImageSaver();

  return (
    <div className="bg-white rounded-lg shadow p-3 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-6">Your Cropped Image is Ready!</h2>

      <div className="max-w-xl mx-auto">
        <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 sm:mb-6 border border-gray-200">
          {h.croppedImage ? (
            <img
              src={h.getImageUrl(h.croppedImage)}
              alt="Cropped Result"
              className="w-full h-auto"
            />
          ) : (
            <div className="w-full h-[200px] sm:h-[300px] flex items-center justify-center text-gray-400 text-sm sm:text-base">
              400 × 300
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
          <button
            onClick={h.handleReset}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base w-full sm:w-auto"
          >
            <Icon icon="heroicons:arrow-path" className="w-4 h-4 sm:w-5 sm:h-5" />
            Start Over
          </button>

          <button
            onClick={h.handleDownload}
            className="flex items-center justify-center gap-2 btn-primary w-full sm:w-auto"
          >
            <Icon icon="heroicons:arrow-down-tray" className="w-4 h-4 sm:w-5 sm:h-5" />
            Download Image
          </button>
        </div>

        <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-1 sm:gap-2 justify-center text-gray-600 text-sm sm:text-base">
          <Icon icon="heroicons:check-circle" className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          <span>Image Successfully Cropped</span>
          <span className="text-gray-400 text-xs sm:text-sm">•</span>
          <span className="text-gray-400 text-xs sm:text-sm">Just now</span>
        </div>
      </div>
    </div>
  );
};

export default ImageSaver;
