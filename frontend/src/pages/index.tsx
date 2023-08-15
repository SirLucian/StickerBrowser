import Image from 'next/image'
import { Inter } from 'next/font/google'
import ImageGallery from '@/components/ImageGallery'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="App">
      <ImageGallery />
    </div>
  )
}
