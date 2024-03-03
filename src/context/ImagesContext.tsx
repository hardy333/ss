import { ReactNode, createContext, useContext, useState } from "react";
import fetchImages from "../api/images";
import { computeNewImages } from "../pages/home/utils";
import { Images } from "../models/images";

export type ImageContextProps = {
  images: null | Images;
  setImages: React.Dispatch<React.SetStateAction<Images | null>>;
  getImages: (pageIndex: number, searchValue: string) => Promise<void>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  imagesError: null | string;
};

const ImagesContext = createContext<ImageContextProps | null>(null);

type Props = {
  children: ReactNode;
};

const ImagesContextProvider = ({ children }: Props) => {
  const [images, setImages] = useState<null | Images>(null);
  const [inputValue, setInputValue] = useState("popular");
  const [searchValue, setSearchValue] = useState(inputValue);
  const [imagesError, setImagesError] = useState<null | string>(null);

  const getImages = async (pageIndex: number, searchValue: string) => {
    setImagesError(null);
    const data = await fetchImages(pageIndex, searchValue);

    if (data === null) {
      setImagesError("Something went wrong, please try again.");
      return;
    }

    setImages((images) => {
      const res = computeNewImages(data, images, searchValue);
      return res;
    });
  };

  return (
    <ImagesContext.Provider
      value={{
        images,
        setImages,
        getImages,
        inputValue,
        setInputValue,
        searchValue,
        setSearchValue,
        imagesError,
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
};

export default ImagesContextProvider;

export const useImagesContext = () => useContext(ImagesContext);
