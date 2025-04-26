import { cropperService } from "@/lib/cropper/CropperService";
import useRxState from "@/lib/store/useRxState";

export const useImageSaver = () => {
  const croppedImage = useRxState(cropperService.croppedImage.data$);

  const getImageUrl = (path: string) => {
    const filename = path.split('/').pop();
    return `http://localhost:8000/serve-image.php?file=${filename}`;
  };

  const handleDownload = async () => {
    if (!croppedImage) return;

    try {
      // Fetch the image
      const response = await fetch(getImageUrl(croppedImage));
      const blob = await response.blob();

      // Create a temporary download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;

      // Extract original filename from path or use default
      const filename = croppedImage.split('/').pop() || 'cropped-image.jpg';
      link.download = filename;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleReset = () => cropperService.reset();

  return {
    croppedImage,
    getImageUrl,
    handleDownload,
    handleReset
  };
};

export default useImageSaver;
