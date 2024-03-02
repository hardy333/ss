import { useEffect, useRef, useState } from "react";
import { json } from "react-router-dom";


const key = import.meta.env.REACT_APP_UNSPLASH_API_KEY;
console.log('API Key:', key);


const url =
  "https://api.unsplash.com/search/photos?page=1&per_page=20&query=popular&client_id=";

type Img = {
  url: string;
  id: string;
  searchValue: string;
};

let allowFetch = true;

type Images = {
    [key: string]: Img[];
}


const Home = () => {
  const [images, setImages] = useState<null | Images>(null);
  const [page, setPage] = useState(1);
  const loadingElement = useRef<null | HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("popular")
  const [searchValue, setSearchValue] = useState(inputValue)


  const getImages = (pageIndex: number) => {
    console.log("Request", pageIndex);
    let searchValue = inputValue

    fetch(
      `https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=10&query=${searchValue}&client_id=${key}`
    )
      .then((res) => res.json())
      .then((data) => {
        const newImages = data.results.map((obj: any) => ({
          url: obj.urls.small,
          id: obj.id,
          searchValue : searchValue
        }));

        console.log(newImages);
        setImages((images) => {
          if (images) {
            let newSearchValueImages =[]

            if(images[searchValue]){
                newSearchValueImages = [...images[searchValue],...newImages ]
            }else{
                newSearchValueImages = [...newImages]
            }

            return {
                ...images,
                [searchValue] : newSearchValueImages
            }
          } else {
            return {
                [searchValue]: [...newImages]
            }
          }
        });
      });
  };

  console.log(images)
  useEffect(() => {
    getImages(page);
  }, [searchValue]);

  // console.log({allowFetch, images: images?.length})

  useEffect(() => {
    const handleScroll = () => {
        // console.log({allowFetch, images: images?.length})
  
        const rect = loadingElement.current?.getBoundingClientRect();
        if (rect?.top && rect?.top <= window.innerHeight) {
          if (allowFetch) {
            setPage((currPage) => {
              allowFetch = false;
              console.log({ currPage: currPage + 1, searchValue });
              getImages(currPage + 1);
              return currPage + 1;
            });
          }
        }
  
        if (rect?.top && rect?.top >= window.innerHeight + 500) {
          allowFetch = true;
        }
      }

    window.addEventListener("scroll", handleScroll);

    return () => {
        window.removeEventListener("scroll", handleScroll)
    }

  }, [searchValue]);

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <input className="search-inp" value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Search for images" />
        <button onClick={() => {
            setSearchValue(inputValue)
        }}>Submit</button>
      </div>

      <div className="images-container">
        {images ? (
          images?.[searchValue]?.map((img) => <img key={img.url} src={img.url} />)
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <div
        ref={loadingElement}
        style={{ width: 100, height: 100, background: "gray", opacity: 0 }}
      ></div>
    </div>
  );
};

export default Home;

// alt + shift + f
