import { useCallback, useState, DragEvent, ChangeEvent } from 'react';
import { cropperService } from '@/lib/cropper/CropperService';
import { CropperConfig } from '@/lib/cropper/cropper.config';

export default function useImageChooser() {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    cropperService.error.setData(null);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      cropperService.error.setData('Please upload an image file');
      return;
    }

    if (!CropperConfig.allowedTypes.includes(file.type)) {
      cropperService.error.setData('Only JPG, PNG, and GIF images are supported');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      cropperService.chooseImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return { isDragging, setIsDragging, handleFileDrop, handleFileChange };
}
