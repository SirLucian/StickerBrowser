import { useEffect, useRef } from 'react';

export default function ImageCard({
    imgAlt = 'placeholder',
    imgSrc = '/placeholder.jpg',
    newLimit,
    isLast,
  }) {
    const cardRef = useRef();
    useEffect(() => {
      if (!cardRef?.current) return;
  
      const observer = new IntersectionObserver(([entry]) => {
        if (isLast && entry.isIntersecting) {
          newLimit();
          observer.unobserve(entry.target);
        }
      });
  
      observer.observe(cardRef.current);
    }, [isLast]);
    return(
      <div className="shadow-lg rounded-xl p-2 w-full bg-white" ref={cardRef}>
        <div className="w-full h-96 relative overflow-hidden rounded-xl">
          <img
            src={imgSrc}
            alt={imgAlt}
            className={`w-full h-full object-cover`}
          />
        </div>
      </div>
    )
  }