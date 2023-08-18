import React, { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/utils/supabaseClient';
import ImageModal from '@/components/ImageModal';
import ImageCard from './ImageCard';


export interface GeneratedImage {
  id: string;
  url: string;
  nsfw: boolean;
  likeCount: number;
  generated_image_variation_generics?: any[]; // You can replace 'any[]' with a more specific type if needed
}

export interface Generation {
  id: string;
  modelid: string;
  prompt: string;
  negativeprompt: string;
  imageheight: number;
  imagewidth: number;
  inferencesteps: any; // You can replace 'any' with a more specific type if needed
  seed: number;
  public: boolean;
  scheduler: string;
  sdversion: string;
  status: string;
  presetstyle: string;
  initstrength: string;
  guidancescale: number;
  createdat: string;
  generated_images: GeneratedImage[];
  user_id: string;
}



export default function ImageGallery () {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [selectedModal, setSelectedModal] = useState<GeneratedImage | null>(null);
  const [start, setStart] = useState(0);
  let fetchingComplete
  const fetchImages = useCallback(async () => {
    let { data, error } = await supabase
      .from('generation')
      .select('*')
      .range(start, start + 19);
    if(data.length < 20) fetchingComplete = true;
    if (error) console.error(error);
    setGenerations((prev) => [...prev, ...data]);
  }, [start]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const openModal = (image: GeneratedImage) => {
    setSelectedModal(image);
  };

  const closeModal = () => {
    setSelectedModal(null);
  };

  // Infinite scrolling setup
  const bottomRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    let observer;
  
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setStart((prevStart) => prevStart + 20);
          }
        },
        { threshold: 1.0 }
      );
  
      if (bottomRef.current) {
        observer.observe(bottomRef.current);
      }
    }
  
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [bottomRef, setStart]);
  return (
    <>
      <main id="main">
          <div className="container mx-auto">
            <h1 style={{ textAlign: 'center' }}>Generation Gallery</h1>
            </div>
        <div className='flex flex-wrap gap-4 justify-center'>
          {generations?.map((generation: Generation) => (
            <div key={generation.id}>
              {generation.generated_images?.map((image) => (
                <button
                  key={image.id}
                  onClick={() => openModal(image)}
                >
                  <ImageCard
                    image={image}
                    ref={cardRef}
                  />
                </button>
              ))}
            </div>
          ))}
        </div>
        {!fetchingComplete && <div className='h-20' ref={bottomRef} id="generations-bottom">Fetching more</div>}
      </main>
        {selectedModal && (
          <ImageModal image={selectedModal} onClose={closeModal} />
        )}
    </>
  );
}

