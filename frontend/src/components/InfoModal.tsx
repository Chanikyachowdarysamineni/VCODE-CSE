import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { ReactNode } from "react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: ReactNode;
  img?: string;
}

const InfoModal = ({ isOpen, onClose, title, description, img }: InfoModalProps) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full h-[500px] md:h-[550px] p-6 rounded-xl bg-gray-900 text-white flex flex-col">
        <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 mt-2 pr-2">
          <DialogDescription className="text-gray-400">{description}</DialogDescription>
          {img && (
            <img src={img} alt={title} className="mt-4 w-full rounded-md shadow-md" />
          )}
        </div>

        {/* Fixed Close Button */}
        <div className="mt-4">
          <DialogClose asChild>
            <button className="w-full bg-red-500 py-2 rounded-md hover:bg-red-600 transition">
              Close
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
