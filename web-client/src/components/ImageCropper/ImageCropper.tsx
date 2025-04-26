import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import useImageCropper from './useImageCropper';
import { cropperService } from '@/lib/cropper/CropperService';

const ImageCropper = () => {
  const h = useImageCropper();

  return (
    <div className="rounded-lg bg-white p-4 shadow sm:p-6">
      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
        {/* Original Image Section */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Original Image</h2>
          <div
            className="overflow-hidden rounded-lg bg-gray-100"
            onDragOver={h.handleDragOver}
            onDrop={h.handleDrop}
          >
            <Cropper
              ref={h.cropperRef}
              src={h.chosenImage || 'https://placehold.co/800x600'}
              style={{ height: 300, width: '100%' }}
              guides={true}
              viewMode={1}
              dragMode="move"
              cropBoxResizable={true}
              toggleDragModeOnDblclick={false}
              crop={h.handleCropUpdate}
              ready={h.handleCropUpdate}
            />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={async () => {
                await cropperService.reset();
                h.handleFileSelect();
              }}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm transition-colors hover:bg-gray-50 sm:text-base"
            >
              Choose Different Image
            </button>
          </div>
        </div>

        {/* Crop Preview Section */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Crop Preview</h2>
          <div className="overflow-hidden rounded-lg bg-gray-100" style={{ height: 300 }}>
            {h.previewUrl ? (
              <img src={h.previewUrl} alt="Preview" className="h-full w-full object-contain" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                400 × 300
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <button onClick={h.handleCrop} className="btn-primary">
              Apply Crop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
