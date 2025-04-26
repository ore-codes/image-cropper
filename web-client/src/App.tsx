import ImageChooser from '@/components/layout/ImageChooser/ImageChooser'
import useRxState from '@/lib/store/useRxState'
import { cropperService } from '@/lib/cropper/CropperService'
import { AppState } from './lib/AppState.enum';
import ImageCropper from '@/components/layout/ImageCropper/ImageCropper';

function App() {
  const appState = useRxState(cropperService.appState.data$);
  const error = useRxState(cropperService.error.data$);
  const croppedImage = useRxState(cropperService.croppedImage.data$);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Image Cropper</h1>
        {!appState && (
          // App state is either undefined or INITIAL=0 (It is a falsey either way)
          <ImageChooser />
        )}

        {appState === AppState.FILE_UPLOADED && (
          <ImageCropper />
        )}

        {appState === AppState.FILE_CROPPED && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Cropped Result</h2>
            <div className="border rounded-xl p-4">
              <img
                src={`http://localhost:8000/server/${croppedImage}`}
                alt="Cropped"
                className="max-w-full h-auto"
              />
            </div>
            <a
              href={`http://localhost:8000/server/${croppedImage}`}
              download
              className="btn-primary inline-block mt-4"
            >
              Download
            </a>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
