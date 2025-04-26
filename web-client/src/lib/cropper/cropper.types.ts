export enum CropperState {
  INITIAL = 0,
  FILE_UPLOADED = 1,
  FILE_CROPPED = 2,
}

export interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
}
