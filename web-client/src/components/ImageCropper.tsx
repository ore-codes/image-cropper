import { useState, useRef, useCallback } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import axios from 'axios';

interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ImageCropper = () => {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const cropperRef = useRef<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onCrop = async () => {
    if (!cropperRef.current) return;

    const cropper = cropperRef.current.cropper;
    const cropData: CropData = cropper.getData(true);
    const formData = new FormData();

    // Get the original file from the data URL
    const response = await fetch(image as string);
    const blob = await response.blob();
    formData.append('image', blob);

    // Append crop coordinates
    Object.entries(cropData).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    try {
      const response = await axios.post('http://localhost:8000/server/upload.php', formData);
      if (response.data.success) {
        setCroppedImage(response.data.cropped);
      }
    } catch (error) {
      setError('Failed to crop image. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Image Cropper</h1>

      {!image ? (
        <div
          className={`upload-area ${isDragging ? 'border-primary' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
        >
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-gray-600">Drag and drop your image here, or</p>
          <label className="btn-primary inline-block mt-2 cursor-pointer">
            Choose File
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onFileChange}
            />
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="border rounded-xl p-4">
            <Cropper
              ref={cropperRef}
              src={image}
              style={{ height: 400, width: '100%' }}
              aspectRatio={16 / 9}
              guides={true}
              viewMode={1}
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              className="btn-primary"
              onClick={onCrop}
            >
              Crop Image
            </button>
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => {
                setImage(null);
                setCroppedImage(null);
                setError(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {croppedImage && (
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
  );
};

export default ImageCropper; 