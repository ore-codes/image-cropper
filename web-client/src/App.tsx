import ImageChooser from '@/components/ImageChooser/ImageChooser'
import useRxState from '@/lib/store/useRxState'
import { cropperService } from '@/lib/cropper/CropperService'
import { AppState } from './lib/AppState.enum';
import ImageCropper from '@/components/ImageCropper/ImageCropper';
import ImageSaver from '@/components/ImageSaver/ImageSaver';
import '@fontsource-variable/inter';

function App() {
  const appState = useRxState(cropperService.appState.data$);
  const error = useRxState(cropperService.error.data$);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Image Cropper</h1>
        {!appState && (
          // App state is either undefined or INITIAL=0 (It is a falsey either way)
          <ImageChooser />
        )}

        {appState === AppState.FILE_UPLOADED && (
          // File was uploaded and ready to be cropped
          <ImageCropper />
        )}

        {appState === AppState.FILE_CROPPED && (
          // File was cropped and ready to be downloaded
          <ImageSaver />
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
