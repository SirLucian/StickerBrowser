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
    // const [images, setImages] = useState<Image[]>([]);
    const [hasMore, setHasMore] = useState(true);
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
    // useEffect(() => {
    //     fetchImages();
    //   }, []);
    
    //   const fetchImages = async () => {
    //     const response = await axios.get<Image[]>('http://localhost:5000/images', {
    //       params: { start: images.length, end: images.length + 50 },
    //     });
    //     setImages(images.concat(response.data));
    //     if (response.data.length < 50) setHasMore(false);
    //   };
    
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


export async function getServerSideProps() {
    let images:Image[] = [];
  
    try {
    const res = await axios.get<Image[]>('http://localhost:5000/images');
      images = res.data;
    } catch (e) {
      console.error(e);
    }
  
    return {
      props: {
        images
      },
      revalidate: 10
    }
  }