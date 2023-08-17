import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/utils/supabaseClient';
import ImageModal from '@/components/ImageModal';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

interface Image {
  id: string;
  url: string;
}
export default function ImageGallery () {
  const [images, setImages] = useState([]);
  const [displayImages, setDisplayImages] = useState(0);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    
  const fetchImages = useCallback(async () => {
    let { data: stickers_view, error } = await supabase
      .from('stickers_view')
      .select('*')
      .range(displayImages, displayImages + 9);

        if (error) console.error(error);
        else setImages([...images, ...stickers_view]);
    }, [displayImages]);

useEffect(() => {
    fetchImages();
}, [displayImages]);

useInfiniteScroll({
    trackElement: '#images-bottom',
    containerElement: '#main'
}, () => {
    setDisplayImages(oldVal => oldVal + 10);
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
            <div className='flex flex-wrap'>
            {
              images?.slice(0, displayImages).map((image: Image) => (
                <img
                key={image.id}
                src={image.generated_images[0].url}
                alt=""
                onClick={() => openModal(image)}
                />
                ))
              }
              </div>
            <div id="images-bottom"></div>
          </div>
        </main>
        {selectedImage && (
          <ImageModal image={selectedImage} onClose={closeModal} />
        )}
      </>
    )
  }
