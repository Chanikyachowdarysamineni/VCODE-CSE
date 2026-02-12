import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPath = useRef(pathname); // Store previous path

  useEffect(() => {
    if (prevPath.current !== pathname && pathname !== "/") {
      window.scrollTo(0, 0); // Scroll only if path changes and it's not "/"
    }
    prevPath.current = pathname; // Update previous path
  }, [pathname]);

  return null;
};

export default ScrollToTop;
