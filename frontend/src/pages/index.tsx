import Image from "next/image";
import { Inter } from "next/font/google";
import ImageGallery from "@/components/ImageGallery";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });



export default function Home() {
  return (
    <div className="App">
      <Navbar/>
      <ImageGallery />
    </div>
  );
}
