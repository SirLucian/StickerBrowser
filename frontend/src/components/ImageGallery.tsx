import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/utils/supabaseClient';
import ImageModal from '@/components/ImageModal';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
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
  const [displayGenerations, setDisplayGenerations] = useState(0);
  const [selectedGeneration, setSelectedGeneration] = useState<Generation | null>(null);
  const [start, setStart] = useState(0)

    
  const fetchImages= useCallback(async () => {
    let { data: stickers_view, error } = await supabase
      .from('stickers_view')
      .select('*')
      .range(start, start + 19);

        if (error) console.error(error);
        setGenerations((prev) => [...prev, ...stickers_view]);
    }, [generations]);

useEffect(() => {
    fetchImages();
}),[];




    const openModal = (generation: Generation) => {
      setSelectedGeneration(generation);
    };
  
    const closeModal = () => {
      setSelectedGeneration(null);
    };
    
    return (
      <>
        <main id="main">
          <div className="container mx-auto">
            <h1 style={{ textAlign: 'center' }}>Generation Gallery</h1>
            <div className='flex flex-wrap gap-4 justify-center'>

            {
              generations?.map((generation: Generation) => (
                <div key={generation.id}>
                {generation.generated_images?.map((image, index)=>(
                  <>
                    <button onClick={() => openModal(image)}>
                      <ImageCard 
                        key={image.id}
                        imgSrc={image.url}
                        imgAlt={generation.prompt}
                        isLast={index === generation.generated_images.length - 1}
                        newLimit={() => setStart(start + 20)}
                        />
                    </button>
                  </>
                ))}
                </div>
              ))
              }
              </div>
            <div id="generations-bottom"></div>
          </div>
        </main>
        {selectedGeneration && (
          <ImageModal image={selectedGeneration} onClose={closeModal} />
        )}
      </>
    )
  }
