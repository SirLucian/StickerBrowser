import { useEffect, useRef } from 'react';

export default function ImageCard({
    alt = 'placeholder',
    url = '/placeholder.jpg',

  }) {
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
            src={url}
            alt={alt}
            className={`w-full h-full object-cover`}
          />
        </div>
      </div>
    )
  }