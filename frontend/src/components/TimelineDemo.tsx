import { Timeline } from "@/components/ui/timeline";
import { useState } from "react";

export function TimelineDemo() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (src: string): void => {
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const data = [
    {
      title: "Will be announced soon",
      content: (
        <div>
          <p className="text-neutral-200 dark:text-neutral-200 text-xl md:text-xl font-normal mb-8">
            24-hour Hackathon
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://res.cloudinary.com/dcalf4l66/image/upload/c_limit,w_800,q_80/v1742486183/WhatsApp_Image_2025-03-20_at_20.33.05_f8dc14e6_rxtfjn.jpg"
              alt="Hackathon"
              width={500}
              height={500}
              className="rounded-lg object-center h-50 md:h-44 lg:h-60 w-full cursor-pointer shadow-lg"
              onClick={() =>
                openModal(
                  "https://res.cloudinary.com/dcalf4l66/image/upload/c_limit,w_800,q_80/v1742486183/WhatsApp_Image_2025-03-20_at_20.33.05_f8dc14e6_rxtfjn.jpg"
                )
              }
            />
          </div>
        </div>
      ),
    },
    {
      title: "Will be announced soon",
      content: (
        <div>
          <p className="text-neutral-200 dark:text-neutral-200 text-xl md:text-xl font-normal mb-8">
            Technical Quiz
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://res.cloudinary.com/dcalf4l66/image/upload/c_limit,w_800,q_80/v1742486313/VCODE_QUIZZ_jbpmva.png"
              alt="Technical Quiz"
              width={500}
              height={500}
              className="rounded-lg object-center h-50 md:h-44 lg:h-60 w-full cursor-pointer shadow-lg"
              onClick={() =>
                openModal(
                  "https://res.cloudinary.com/dcalf4l66/image/upload/c_limit,w_800,q_80/v1742486313/VCODE_QUIZZ_jbpmva.png"
                )
              }
            />
          </div>
        </div>
      ),
    },
    {
      title: "Will be announced soon",
      content: (
        <div>
          <p className="text-neutral-200 dark:text-neutral-200 text-xl md:text-xl font-normal mb-4">
            Code Arena
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://res.cloudinary.com/dcalf4l66/image/upload/c_limit,w_800,q_80/v1742486402/h_mwtcvi.png"
              alt="Code Arena"
              width={500}
              height={500}
              className="rounded-lg object-center h-50 md:h-44 lg:h-60 w-full cursor-pointer shadow-lg"
              onClick={() =>
                openModal(
                  "https://res.cloudinary.com/dcalf4l66/image/upload/c_limit,w_800,q_80/v1742486402/h_mwtcvi.png"
                )
              }
            />
          </div>
        </div>
      ),
    },
    {
      title: "Will be announced soon",
      content: (
        <div>
          <p className="text-neutral-200 dark:text-neutral-200 text-xl md:text-xl font-normal mb-8">
            CodeHunt
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://res.cloudinary.com/dcalf4l66/image/upload/c_limit,w_800,q_80/v1742486482/Codehunt_civ6yt.png"
              alt="CodeHunt"
              width={500}
              height={500}
              className="rounded-lg object-right h-50 md:h-44 lg:h-60 w-full cursor-pointer shadow-lg"
              onClick={() =>
                openModal(
                  "https://res.cloudinary.com/dcalf4l66/image/upload/c_limit,w_800,q_80/v1742486482/Codehunt_civ6yt.png"
                )
              }
            />
          </div>
        </div>
      ),
    },
    {
      title: "Will be announced soon",
      content: (
        <div>
          <p className="text-neutral-200 dark:text-neutral-200 text-xl md:text-xl font-normal mb-8">
            Poster Presentation
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://res.cloudinary.com/dcalf4l66/image/upload/c_limit,w_800,q_80/v1742489959/WhatsApp_Image_2025-03-20_at_22.28.43_1a1dabea_wngawg.jpg"
              alt="Poster Presentation"
              width={500}
              height={500}
              className="rounded-lg object-cover h-50 md:h-44 lg:h-60 w-full cursor-pointer shadow-lg"
              onClick={() =>
                openModal(
                  "https://res.cloudinary.com/dcalf4l66/image/upload/c_limit,w_800,q_80/v1742489959/WhatsApp_Image_2025-03-20_at_22.28.43_1a1dabea_wngawg.jpg"
                )
              }
            />
          </div>
        </div>
      ),
    },
    {
      title: "Will be announced soon",
      content: (
        <div>
          <p className="text-neutral-200 dark:text-neutral-200 text-xl md:text-xl font-normal mb-8">
            Sports
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div
              className="rounded-lg object-cover h-50 md:h-44 lg:h-60 w-full cursor-pointer shadow-lg bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/30 flex items-center justify-center"
            >
              <span className="text-gray-300 font-semibold">Sports Event</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full relative">
      <Timeline data={data} />

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Enlarged"
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
