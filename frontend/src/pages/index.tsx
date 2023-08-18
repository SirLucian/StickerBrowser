import Image from "next/image";
import { Inter } from "next/font/google";
import ImageGallery from "@/components/ImageGallery";
import Navbar from "@/components/Navbar";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });



export default function Home() {
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  return (
    <div className="App">
      <Navbar search={search} handleSearch={handleSearch} />
      <ImageGallery search={search} />
    </div>
  );
}
