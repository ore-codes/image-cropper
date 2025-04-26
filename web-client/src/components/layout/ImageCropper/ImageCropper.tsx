import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import useImageCropper from './useImageCropper';
import { cropperService } from '@/lib/cropper/CropperService';

const ImageCropper = () => {
  const h = useImageCropper();

  return (
    <div className="space-y-4">
      <div className="border rounded-xl p-4">
        <Cropper
          ref={h.cropperRef}
          src={h.chosenImage as string}
          style={{ height: 400, width: '100%' }}
          aspectRatio={16 / 9}
          guides={true}
          viewMode={1}
        />
      </div>
      <div className="flex justify-between items-center">
        <button
          className="btn-primary"
          onClick={h.handleCrop}
        >
          Crop Image
        </button>
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={() => cropperService.reset()}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ImageCropper;
