export default function Navbar({ search, handleSearch }) {
  return (
    <nav className="sticky top-0 h-16 w-full bg-slate-800 z-50 flex align-middle justify-between">
      <div className="container mx-auto align-middle justify-between text-lg">
        Stickems
      </div>
      <div>
        <input className="text-slate-900" type="text" value={search} onChange={handleSearch} placeholder="Search..." />
      </div>
    </nav>
  );
}
