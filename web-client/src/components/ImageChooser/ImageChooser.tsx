import cn from 'classnames';
import useImageChooser from './useImageChooser';
import { Icon } from '@iconify/react';

const ImageChooser = () => {
  const h = useImageChooser();

  return (
    <div
      className={cn('border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors', { 'border-primary': h.isDragging })}
      onDragOver={(e) => {
        e.preventDefault();
        h.setIsDragging(true);
      }}
      onDragLeave={() => h.setIsDragging(false)}
      onDrop={h.handleFileDrop}
    >
      <div className="mb-4">
        <Icon icon="heroicons:photo" className="mx-auto h-12 w-12 text-gray-400" />
      </div>
      <p className="text-gray-600">Drag and drop your image here, or</p>
      <label className="btn-primary inline-block mt-2 cursor-pointer">
        Choose File
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={h.handleFileChange}
        />
      </label>
    </div>
  );
};

export default ImageChooser; 