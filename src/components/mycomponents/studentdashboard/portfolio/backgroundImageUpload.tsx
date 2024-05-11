// components/BackgroundImageUploader.tsx
import { useState } from 'react';
import Image from 'next/image';

interface BackgroundImageUploaderProps {
  onImageUpload: (image: File) => void;
}

const BackgroundImageUploader: React.FC<BackgroundImageUploaderProps> = ({
  onImageUpload,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleImageUpload = () => {
    if (image) {
      onImageUpload(image);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {imagePreview && (
        <div
          style={{
            backgroundImage: `url(${imagePreview})`,
            backgroundSize: 'cover',
            height: '300px',
            width: '100%',
          }}
        >
          <button onClick={handleImageUpload}>Upload Image</button>
        </div>
      )}
    </div>
  );
};

export default BackgroundImageUploader;