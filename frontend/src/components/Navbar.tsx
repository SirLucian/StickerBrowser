import { useState } from 'react';

export default function Navbar() {
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filter = (images) => {
    return images.filter(image => image.title.includes(search));
  };

  return (
    <nav className="sticky top-0 h-16 w-full bg-slate-800 z-50 flex align-middle justify-between">
      <div className="container mx-auto align-middle justify-between text-lg">
        Stickems
      </div>
      <div>
        <input type="text" value={search} onChange={handleSearch} placeholder="Search..." />
      </div>
    </nav>
  );
}
