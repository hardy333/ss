import { useEffect, useRef } from "react";
import { ImageContextProps, useImagesContext } from "../context/ImagesContext";

let allowFetch = true;

const BottomLoadingComponent = () => {
  const { images, getImages, searchValue } =
    useImagesContext() as ImageContextProps;
  const loadingElement = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const rect = loadingElement.current?.getBoundingClientRect();
      if (rect?.top && rect?.top <= window.innerHeight) {
        if (allowFetch && images) {
          allowFetch = false;
          getImages(images[searchValue].pageIndex + 1, searchValue);
        }
      }

      if (rect?.top && rect?.top >= window.innerHeight + 200) {
        allowFetch = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [searchValue, images]);

  return (
    <div
      ref={loadingElement}
      style={{ width: 100, height: 100, background: "gray" }}
    ></div>
  );
};

export default BottomLoadingComponent;
