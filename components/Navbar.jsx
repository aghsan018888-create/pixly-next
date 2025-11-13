export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">P</div>
          <div className="font-semibold">Pixly</div>
        </div>
        <div className="hidden md:flex gap-6 text-sm">
          <a href="/">Home</a>
          <a href="/categories">Categories</a>
          <a href="/premium">Premium Packs</a>
        </div>
      </div>
    </nav>
  );
}