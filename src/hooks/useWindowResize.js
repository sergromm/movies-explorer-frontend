import { useEffect, useState } from "react";

function useRenderOptions() {
  const [renderOptions, setShowOption] = useState([]);

  useEffect(() => {
    const mobileLayout = [5, 1];
    const tabletLayout = [8, 2];
    const desktopLayout = [12, 3];

    const handleResize = () => {
      if (window.innerWidth > 1280) {
        setShowOption(desktopLayout);
      } else if (window.innerWidth < 768) {
        setShowOption(mobileLayout);
      } else {
        setShowOption(tabletLayout);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { renderOptions, setShowOption };
}

export default useRenderOptions;
