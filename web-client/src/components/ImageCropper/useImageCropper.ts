import { useRef, useState, useCallback } from 'react';
import { ReactCropperElement } from 'react-cropper';
import { CropData } from '@/lib/cropper/cropper.types';
import axios, { AxiosError } from 'axios';
import { cropperService } from '@/lib/cropper/CropperService';
import useRxState from '@/lib/store/useRxState';
import { DragEvent } from 'react';
import { Env } from '@/lib/config';

export default function useImageCropper() {
  const cropperRef = useRef<ReactCropperElement | null>(null);
  const chosenImage = useRxState(cropperService.chosenImage.data$);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number>(NaN);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAspectRatioChange = useCallback((value: number) => {
    setAspectRatio(value);
    if (cropperRef.current?.cropper) {
      cropperRef.current.cropper.setAspectRatio(value);
    }
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(async (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = async () => {
        await cropperService.chooseImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileSelect = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
          await cropperService.chooseImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, []);

  const handleCropUpdate = useCallback(() => {
    if (!cropperRef.current?.cropper) return;
    const previewDataUrl = cropperRef.current.cropper.getCroppedCanvas().toDataURL();
    setPreviewUrl(previewDataUrl);
  }, []);

  const handleCrop = async () => {
    if (!cropperRef.current || !chosenImage) return;

    const cropper = cropperRef.current.cropper;
    const cropData: CropData = cropper.getData(true);

    // Generate preview
    const previewDataUrl = cropper.getCroppedCanvas().toDataURL();
    setPreviewUrl(previewDataUrl);

    const formData = new FormData();

    // Get the original file from the data URL
    const response = await fetch(chosenImage);
    const blob = await response.blob();

    const fileType = chosenImage.split(';')[0].split('/')[1];
    const file = new File([blob], `image.${fileType}`, { type: `image/${fileType}` });
    formData.append('image', file);

    // Append crop coordinates
    Object.entries(cropData).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    setLoading(true);
    try {
      const response = await axios.post(`${Env.ServerUrl}/upload.php`, formData);
      if (response.data.success) {
        await cropperService.cropImage(response.data.cropped);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        await cropperService.error.setData(error.response?.data.error);
      } else {
        await cropperService.error.setData('Failed to crop image. Please try again.');
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    cropperRef,
    chosenImage,
    handleCrop,
    handleFileSelect,
    handleDragOver,
    handleDrop,
    handleCropUpdate,
    loading,
    previewUrl,
    aspectRatio,
    handleAspectRatioChange,
  };
}
