import { X } from "lucide-react";

interface PosterZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  posterImage: string;
  title: string;
}

const PosterZoomModal = ({ isOpen, onClose, posterImage, title }: PosterZoomModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4 md:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/50 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="absolute top-6 left-6 text-white text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          {title}
        </h2>

        {/* Zoomed Image Container */}
        <div className="flex items-center justify-center w-full h-full max-w-4xl max-h-[90vh] mt-12">
          <img
            src={posterImage}
            alt={`${title} Poster`}
            className="w-full h-full object-contain rounded-lg shadow-2xl shadow-purple-500/50 animate-scaleIn"
          />
        </div>

        {/* Close hint on desktop */}
        <p className="absolute bottom-6 text-gray-400 text-sm text-center hidden md:block">
          Click outside or press X to close
        </p>
      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PosterZoomModal;
