import { useEffect, useRef, useState } from 'react';
import { GeneratedImage } from './ImageGallery';
import { supabase } from '@/utils/supabaseClient';
export const user = { id: `10f9a826-a452-4bd8-8b5e-733ca9951679`}
interface ImageCardProps {
  image: GeneratedImage
  onFave: any
  isFave: boolean
}
export default function ImageCard({
  image,
  onFave,
  isFave
}:ImageCardProps) {
   
    const cardRef = useRef();
    useEffect(() => {
      if (!cardRef?.current) return;

      const observer = new IntersectionObserver(([entry]) => {
        // You might want to do something when the card is intersecting the viewport
      });
  
      observer.observe(cardRef.current);
  
      return () => {
        observer.disconnect();
      };
    }, []);
    return(
      <div className="shadow-lg rounded-xl p-2 w-full bg-white">
        <div className="w-full h-96 relative overflow-hidden rounded-xl">
          <img
            src={image.url}
            alt={image.url}
            className={`w-full h-full object-cover`}
          />
          <button className='absolute bottom-0' onClick={() => onFave(image.id)}>
            {isFave ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    )
  }
