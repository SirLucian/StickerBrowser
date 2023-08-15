import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageModal from './ImageModal';

interface Image {
  id: string;
  url: string;
}

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const response = await axios.get<Image[]>('http://localhost:5000/images', {
      params: { start: images.length, end: images.length + 50 },
    });
    setImages(images.concat(response.data));
    if (response.data.length < 50) setHasMore(false);
  };

  const openModal = (image: Image) => {
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