import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import ImageModal from '@/components/ImageModal';
import ImageCard from './ImageCard';
import { user } from './ImageCard';


const supabase = createClient('https://plsvbyutovqydlhwokpt.supabase.co', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsc3ZieXV0b3ZxeWRsaHdva3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODczNjIyMDIsImV4cCI6MjAwMjkzODIwMn0.ffrN2vAciCW_yetHAOXXmkte9d3Okg9n4LUXXaXFIRc")


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

export default function ImageGallery ({ search }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const handleFavorite = async (image) => {
    if (isFavorited) {
      const { data, error } = await supabase.from('user_favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('image_id', image.id);
      
      if (error) {
        console.error(error);
      } else {
        console.log('Image unfavorited:', data);
        setIsFavorited(false);
      }
    } else {
      const { data, error } = await supabase.from('user_favorites')
      .insert([{user_id:user.id, image_id: image.id }]).select()
      
      if (error) {
        console.error(error);
      } else {
        console.log('Image favorited:', data);
        setIsFavorited(true);
      }
    }
  };
  

  // Infinite scrolling setup
  const bottomRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [selectedModal, setSelectedModal] = useState<GeneratedImage | null>(null);
  const [start, setStart] = useState(0);
  const [filterFavorites, setFilterFavorites] = useState(false);
  let [fetchingComplete, setFetchingComplete] = useState(false);
  const fetchImages = useCallback(async () => {
    try {
      let { data, error } = await supabase
        .from(filterFavorites ? 'generatedimage' : 'generation')
        .select('*')
        .range(start, start + 19);

      if (data.length < 20) setFetchingComplete(true);
      if (error) console.error(error);

      setGenerations((prev) => [...prev, ...data]);
    } catch (error) {
      console.error(error);
    }
  }, [start, filterFavorites]);
    
    
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const openModal = (image: GeneratedImage) => {
    setSelectedModal(image);
  };

  const closeModal = () => {
    setSelectedModal(null);
  };

  const handleFilter = () => {
    setFilterFavorites(!filterFavorites);
    setStart(0); // Reset start to fetch from the beginning when changing filters
    setFetchingComplete(false); // Reset fetchingComplete as well
  };

  // ... Intersection Observer setup and other JSX

  return (
    <>
      <button onClick={handleFilter}>
        {filterFavorites ? 'Show all' : 'Show favorites'}
      </button>
      <main id="main">
     
      <button onClick={handleFilter}>
        {filterFavorites ? 'Show all' : 'Show favorites'}
      </button>
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
                    onFave={handleFavorite}
                    isFave={isFavorited}
                    image={image}
                    ref={cardRef}
                  />
                </button>
              ))}
            </div>
          ))}
        </div>
        {!fetchingComplete && <div className='h-20' ref={bottomRef} id="generations-bottom">Fetching more</div>}
        {selectedModal && (
          <ImageModal isFave={isFavorited} image={selectedModal} onClose={closeModal} onFave={handleFavorite}/>
        )}
      </main>
      </>
  )
  }