import Image from 'next/image'
import { Inter } from 'next/font/google'
import ImageGallery from '@/components/ImageGallery'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="App">
      <nav className='sticky top-0 h-16 w-full bg-slate-800 z-50 flex align-middle justify-between'>
        <div className='container mx-auto align-middle justify-between text-lg'>
          Stickems
        </div>
        
      </nav>
      <ImageGallery />
    </div>
  )
}
