import { SessionStorageService } from "../store/SessionStorageService";
import { AppState } from "../AppState.enum";

class CropperService {
  appState = new SessionStorageService<AppState>("appState");
  error = new SessionStorageService<string | null>("error");
  chosenImage = new SessionStorageService<string | null>("chosenImage");
  croppedImage = new SessionStorageService<string | null>("croppedImage");

  constructor() {
    this.appState.data$.subscribe(() => {
      this.error.setData(null);
    });
  }

  chooseImage(image: string) {
    this.chosenImage.setData(image);
    this.appState.setData(AppState.FILE_UPLOADED);
  }

  cropImage(image: string) {
    this.croppedImage.setData(image);
    this.appState.setData(AppState.FILE_CROPPED);
  }

  reset() {
    this.chosenImage.setData(null);
    this.croppedImage.setData(null);
    this.appState.setData(AppState.INITIAL);
  }
}

export const cropperService = new CropperService();
