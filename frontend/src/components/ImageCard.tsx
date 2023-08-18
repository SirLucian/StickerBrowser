import { useEffect, useRef } from 'react';
import { GeneratedImage } from './ImageGallery';
import { supabase } from '@/utils/supabaseClient';
const handleFavorite = async (imageId) => {
  const { data, error } = await supabase.from('user_favorites')
  .insert([{user_id:user.id, image_id: imageId }]).select()

  if (error) {
    console.error(error);
  } else {
    console.log('Image favorited:', data);
  }
};
const user = { id: `10f9a826-a452-4bd8-8b5e-733ca9951679`}
interface ImageCardProps {
  image: GeneratedImage
}
export default function ImageCard({
  image
  
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
          <button className='absolute bottom-0' onClick={() => handleFavorite(image.id)}>Favorite</button>
        </div>
      </div>
    )
  }