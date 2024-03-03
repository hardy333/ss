import { nanoid } from "nanoid";
import { Images, Img } from "../../models/images";

const computeNewImages = (
  newImagesData: any,
  currImages: Images | null,
  searchValue: string
) => {
  const newImages = newImagesData.results.map((obj: any) => ({
    url: obj.urls.small,
    key: nanoid(),
    id: obj.id,
    searchValue: searchValue,
  })) as Img[];

  if (!currImages) {
    return {
      [searchValue]: {
        pageIndex: 1,
        imgArr: [...newImages],
      },
    };
  }

  let newSearchValueImages = [] as Img[];

  if (currImages[searchValue]?.imgArr) {
    newSearchValueImages = [...currImages[searchValue].imgArr, ...newImages];
  } else {
    newSearchValueImages = [...newImages];
  }

  return {
    ...currImages,
    [searchValue]: {
      // ...currImages[searchValue],
      pageIndex: currImages[searchValue]?.pageIndex
        ? currImages[searchValue].pageIndex + 1
        : 1,
      imgArr: newSearchValueImages,
    },
  };
};

export { computeNewImages };
