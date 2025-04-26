import { IdbService } from '../store/IdbService';
import { CropperState } from '@/lib/cropper/cropper.types.ts';

class CropperService {
  appState = new IdbService<CropperState>('appState');
  error = new IdbService<string | null>('error');
  chosenImage = new IdbService<string | null>('chosenImage');
  croppedImage = new IdbService<string | null>('croppedImage');

  constructor() {
    this.appState.data$.subscribe(() => {
      this.error.setData(null);
    });
  }

  async chooseImage(image: string) {
    await this.chosenImage.setData(image);
    await this.appState.setData(CropperState.FILE_UPLOADED);
  }

  async cropImage(image: string) {
    await this.croppedImage.setData(image);
    await this.appState.setData(CropperState.FILE_CROPPED);
  }

  async reset() {
    await this.chosenImage.clear();
    await this.croppedImage.clear();
    await this.appState.setData(CropperState.INITIAL);
  }
}

export const cropperService = new CropperService();
