import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageModal from './ImageModal';

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const response = await axios.get('http://localhost:5000/images', {
      params: { start: images.length, end: images.length + 50 },
    });
    setImages(images.concat(response.data));
    if (response.data.length < 50) setHasMore(false);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt=""
            onClick={() => openModal(image)}
          />
        ))}
      </InfiniteScroll>
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
    </div>
  );
}

export default ImageGallery;