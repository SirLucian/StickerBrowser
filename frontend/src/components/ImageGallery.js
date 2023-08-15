import React, { useState } from 'react';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import ImageModal from './ImageModal';
import { v4 as uuid } from 'uuid';

export default function ImageGallery({ images }) {
  const [displayImages, setDisplayImages] = useState(3);

  useInfiniteScroll({
    trackElement: '#images-bottom',
    containerElement: '#main'
  }, () => {
    setDisplayImages(oldVal => oldVal + 3);
  });

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <main id="main">
        <div className="container">
          <h1 style={{ textAlign: 'center' }}>Image Gallery</h1>
          {
            images.slice(0, displayImages).map((image) => (
              <img
                key={uuid()}
                src={image.url}
                alt=""
                onClick={() => openModal(image)}
              />
            ))
          }
          <div id="images-bottom"></div>
        </div>
      </main>
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
    </>
  )
}
