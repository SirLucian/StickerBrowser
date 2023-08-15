import React from 'react';
import axios from 'axios';

function ImageModal({ image, onClose }) {
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
    <div>
      <img src={image.url} alt="" />
      <button onClick={favoriteImage}>Favorite</button>
      <button onClick={unfavoriteImage}>Unfavorite</button>
      <button onClick={removeBackground}>Remove Background</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ImageModal;