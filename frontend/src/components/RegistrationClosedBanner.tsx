import {  useState } from "react";

const RegistrationClosedBanner = () => {
  const [showBanner, setShowBanner] = useState(true); // shown on initial page load

  const handleDismiss = () => {
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-[9999] bg-white shadow-lg p-4 flex flex-col items-center gap-2">
      <h2 className="text-xl font-semibold text-red-600 text-center">
        Registration has been closed and the details of participants will be announced soon.
      </h2>
      <button
        onClick={handleDismiss}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Dismiss
      </button>
    </div>
  );
};

export default RegistrationClosedBanner;
