import ImageChooser from '@/components/ImageChooser/ImageChooser';
import useRxState from '@/lib/store/useRxState';
import { cropperService } from '@/lib/cropper/CropperService';
import ImageCropper from '@/components/ImageCropper/ImageCropper';
import ImageSaver from '@/components/ImageSaver/ImageSaver';
import '@fontsource-variable/inter';
import { CropperState } from '@/lib/cropper/cropper.types.ts';

const { FILE_UPLOADED, FILE_CROPPED } = CropperState;

function App() {
  const appState = useRxState(cropperService.appState.data$);
  const error = useRxState(cropperService.error.data$);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-4xl p-4">
        <h1 className="mb-8 text-3xl font-bold">Image Cropper</h1>
        {!appState && (
          // App state is either undefined or INITIAL=0 (It is a falsy either way)
          <ImageChooser />
        )}

        {appState === FILE_UPLOADED && (
          // File was uploaded and ready to be cropped
          <ImageCropper />
        )}

        {appState === FILE_CROPPED && (
          // File was cropped and ready to be downloaded
          <ImageSaver />
        )}

        {error && <div className="mt-4 rounded-lg bg-red-100 p-4 text-red-700">{error}</div>}

        <div className="mt-10 rounded-md bg-gray-200 p-4 text-sm text-gray-700">
          <p>
            Note: The backend is hosted on the Render free plan, so:
            <ul className="list-disc ml-5 my-2">
              <li>There may be a cold start delay.</li>
              <li>Large files may cause a Cloudflare 520 error, which is out of my control.</li>
            </ul>
            It will work fine when you run the image cropper locally.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
