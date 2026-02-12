import PhotoGallery from '@/components/PhotoGallery';

export default function Gallery() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Event Gallery
          </h1>
          <p className="text-lg text-gray-400">
            Explore moments from our past events and competitions
          </p>
        </div>
        <PhotoGallery />
      </div>
    </div>
  );
}
