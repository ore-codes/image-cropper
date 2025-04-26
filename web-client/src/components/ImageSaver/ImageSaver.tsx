import { cropperService } from "@/lib/cropper/CropperService";
import useRxState from "@/lib/store/useRxState";

const ImageSaver = () => {
  const croppedImage = useRxState(cropperService.croppedImage.data$);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Cropped Result</h2>
      <div className="border rounded-xl p-4">
        <img
          src={`http://localhost:8000/${croppedImage}`}
          alt="Cropped"
          className="max-w-full h-auto"
        />
      </div>
      <button
        className="text-gray-600 hover:text-gray-800"
        onClick={() => cropperService.reset()}
      >
        Cancel
      </button>
      <a
        href={`http://localhost:8000/${croppedImage}`}
        download
        className="btn-primary inline-block mt-4"
      >
        Download
      </a>
    </div>
  );
};

export default ImageSaver;
