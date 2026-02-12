import React, { useState } from 'react';
import { Heart, ZoomIn } from 'lucide-react';

interface Photo {
  id: number;
  url: string;
  title: string;
  height: string;
}

const photos: Photo[] = [
  {
    id: 1,
    url: "https://res.cloudinary.com/dcalf4l66/image/upload/c_limit,w_800/v1742479847/vcode2_xehlmn.jpg",
    title: "Vcode- 2024",
    height: "h-[300px]"
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dcalf4l66/image/upload/c_limit,w_800/v1742479837/vcode1_phszk9.jpg",
    title: "Vcode- 2024",
    height: "h-[400px]"
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/dxs1ivzaa/image/upload/c_limit,w_800/v1742622740/DSC01831-2_vqsnnr.jpg",
    title: "Vcode- 2023",
    height: "h-[350px]"
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/dcalf4l66/image/upload/c_limit,w_800/v1742480807/Snapinst.app_347703829_266445905771382_6485048152007700123_n_1080_isjnhg.jpg",
    title: "Vcode- 2023",
    height: "h-[280px]"
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/dcalf4l66/image/upload/c_limit,w_800/v1742480950/vcode_1_1_pewdb1.jpg",
    title: "Vcode- 2024",
    height: "h-[320px]"
  },
  {
    id: 6,
    url: "https://res.cloudinary.com/dcalf4l66/image/upload/c_limit,w_800/v1742489931/WhatsApp_Image_2025-03-20_at_22.27.36_e45450c3_cpd93g.jpg",
    title: "Vcode- 2024",
    height: "h-[360px]"
  }
];

const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPhotos(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(id)) {
        newLiked.delete(id);
      } else {
        newLiked.add(id);
      }
      return newLiked;
    });
  };

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-cyan-400 tracking-wider">
        Photo Gallery
      </h1>
      
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 mx-auto max-w-7xl">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative mb-4 break-inside-avoid group cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className={`relative ${photo.height} overflow-hidden rounded-xl ring-2 ring-gray-700 group-hover:ring-cyan-500 transition-all duration-300`}>
              <img
                src={`${photo.url}?auto=format&fit=crop&w=800`}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-lg font-semibold text-cyan-300">{photo.title}</p>
                </div>
              </div>
              <button
                onClick={(e) => toggleLike(photo.id, e)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/70 hover:bg-gray-800 transition-all duration-300 backdrop-blur-sm"
              >
                <Heart
                  className={`w-6 h-6 ${
                    likedPhotos.has(photo.id)
                      ? "fill-pink-500 text-pink-500"
                      : "text-gray-300 hover:text-pink-400"
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <img
              src={`${selectedPhoto.url}?auto=format&fit=crop&w=1200`}
              alt={selectedPhoto.title}
              className="w-full h-full object-contain rounded-lg ring-4 ring-cyan-500/30"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/70 hover:bg-gray-800 transition-all duration-300 backdrop-blur-sm"
            >
              <ZoomIn className="w-6 h-6 text-cyan-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;