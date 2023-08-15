import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageModal from '../components/ImageModal';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

interface Image {
  id: string;
  url: string;
}

export default function ImageGallery ({ images }: Image[]) {
    const [displayImages, setDisplayImages] = useState(3);

    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    
    useInfiniteScroll({
      trackElement: '#images-bottom',
      containerElement: '#main'
    }, () => {
      setDisplayImages(oldVal => oldVal + 3);
    });
  
    const openModal = (image: Image) => {
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
            images?.slice(0, displayImages).map((image: Image) => (
              <img
                key={image.id}
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