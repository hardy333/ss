import { useEffect } from "react";
import ImageGallery from "../../components/ImageGallery";
import {
  ImageContextProps,
  useImagesContext,
} from "../../context/ImagesContext";
import BottomLoadingComponent from "../../components/BottomLoadingComponent";
import DebounceInput from "../../components/DebounceInput";

const Home = () => {
  const {
    images,
    getImages,
    inputValue,
    setInputValue,
    searchValue,
    setSearchValue,
    imagesError,
  } = useImagesContext() as ImageContextProps;

  useEffect(() => {
    if (images && images[searchValue]) return;
    getImages(1, searchValue);
  }, [searchValue]);

  console.log(images);

  const handleInput = (value: string) => {
    console.log("Debounced Input:", value);
    // You can perform further actions here, such as API calls or state updates
    setSearchValue(value);
  };

  return (
    <div>
      <div>
        <input
          className="search-inp"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          placeholder="Search for images"
        />
        <button
          onClick={() => {
            setSearchValue(inputValue);
          }}
        >
          Submit
        </button>
        <DebounceInput onInput={handleInput} />
      </div>
      <ImageGallery
        imagesError={imagesError}
        images={images && images[searchValue]?.imgArr}
      />
      <BottomLoadingComponent />
    </div>
  );
};

export default Home;
