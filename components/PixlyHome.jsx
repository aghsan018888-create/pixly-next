export default function PixlyHome() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-purple-700 mb-4">Pixly</h1>
      <p className="text-gray-600 mb-8">
        Thousands of premium digital stickers and assets for Canva, Figma, and design tools.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => (
          <div key={i} className="rounded-xl overflow-hidden shadow hover:shadow-lg transition">
            <div className="h-40 bg-purple-100 flex items-center justify-center">Sticker {i}</div>
            <div className="p-3 text-sm font-medium">Sticker Pack {i}</div>
          </div>
        ))}
      </div>
    </div>
  );
}