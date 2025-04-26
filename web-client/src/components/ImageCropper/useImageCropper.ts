import { useRef } from "react";
import { ReactCropperElement } from "react-cropper";
import { CropData } from "@/lib/cropper/cropper.types";
import axios from "axios";
import { cropperService } from "@/lib/cropper/CropperService";
import useRxState from "@/lib/store/useRxState";

export default function useImageCropper() {
  const cropperRef = useRef<ReactCropperElement | null>(null);
  const chosenImage = useRxState(cropperService.chosenImage.data$);

  const handleCrop = async () => {
    if (!cropperRef.current) return;

    const cropper = cropperRef.current.cropper;
    const cropData: CropData = cropper.getData(true);
    const formData = new FormData();

    // Get the original file from the data URL
    const response = await fetch(chosenImage as string);
    const blob = await response.blob();

    // Determine the file type from the data URL
    if (!chosenImage) {
      throw new Error('No image selected');
    }
    const fileType = chosenImage.split(';')[0].split('/')[1];
    const file = new File([blob], `image.${fileType}`, { type: `image/${fileType}` });
    formData.append('image', file);

    // Append crop coordinates
    Object.entries(cropData).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    try {
      const response = await axios.post('http://localhost:8000/upload.php', formData);
      if (response.data.success) {
        cropperService.cropImage(response.data.cropped)
      }
    } catch (error) {
      cropperService.error.setData('Failed to crop image. Please try again.');
      console.error('Error:', error);
    }
  };

  return { cropperRef, chosenImage, handleCrop }
}
