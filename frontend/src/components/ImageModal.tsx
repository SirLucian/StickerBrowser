import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GeneratedImage } from './ImageGallery';
import { decode } from 'punycode';
import { supabase } from '@/utils/supabaseClient';
import { user } from './ImageCard';

interface ImageModalProps {
  image: GeneratedImage;
  onFave: any;
  isFave: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, isFave, onClose, onFave }) => {

 
  const removeBackground = async () => {
    const response = await axios.post('/api/removebg', {
      url: image.url,
    });
    let filename = `test/${image.id}.png`;
    let file = URL.createObjectURL(new Blob([response.data], { type: 'image/png' }));
    const { data, error } = await supabase
    .storage
    .from('removebg-results')
    .upload(filename, decode(file), {
      contentType: 'image/png'
    })
  };

  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex justify-center'>
      <div className='max-w-3xl flex flex-col justify-center'>

        <img src={image.url} alt={image.id} />
        <div className='flex content-between w-full'>
          <button className='absolute bottom-0' onClick={onFave}>
                {isFave ? '❤️ Item is favoured' : '🤍 You dont favor this one'}
          </button>
          <button className='p-2' onClick={removeBackground}>Remove Background</button>
          <button className='p-2' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
