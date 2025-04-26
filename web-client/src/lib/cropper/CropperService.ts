import { IdbService } from "../store/IdbService";
import { AppState } from "../AppState.enum";

class CropperService {
  appState = new IdbService<AppState>("appState");
  error = new IdbService<string | null>("error");
  chosenImage = new IdbService<string | null>("chosenImage");
  croppedImage = new IdbService<string | null>("croppedImage");

  constructor() {
    this.appState.data$.subscribe(() => {
      this.error.setData(null);
    });
  }

  async chooseImage(image: string) {
    await this.chosenImage.setData(image);
    await this.appState.setData(AppState.FILE_UPLOADED);
  }

  async cropImage(image: string) {
    await this.croppedImage.setData(image);
    await this.appState.setData(AppState.FILE_CROPPED);
  }

  async reset() {
    await this.chosenImage.clear();
    await this.croppedImage.clear();
    await this.appState.setData(AppState.INITIAL);
  }
}

export const cropperService = new CropperService();
