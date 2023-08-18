import React from 'react';
import axios from 'axios';
import { GeneratedImage } from './ImageGallery';


interface ImageModalProps {
  image: GeneratedImage;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  const favoriteImage = async () => {
    await axios.post('http://localhost:5000/favorite', { id: image.id });
    onClose();
  };

  const unfavoriteImage = async () => {
    await axios.post('http://localhost:5000/unfavorite', { id: image.id });
    onClose();
  };

  const removeBackground = async () => {
    const response = await axios.post('http://localhost:5000/removebg', {
      url: image.url,
    });
    const blob = new Blob([response.data], { type: 'image/png' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex justify-center'>
      <div className='max-w-3xl flex flex-col justify-center'>

      <img src={image.url} alt={image.id} />
      <div className='flex content-between w-full'>
        <button className='p-2' onClick={favoriteImage}>Favorite</button>
        <button className='p-2' onClick={unfavoriteImage}>Unfavorite</button>
        <button className='p-2' onClick={removeBackground}>Remove Background</button>
        <button className='p-2' onClick={onClose}>Close</button>
      </div>
      </div>
    </div>
  );
}

export default ImageModal;