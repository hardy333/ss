export type Img = {
  url: string;
  id: string;
  key: string;
  searchValue: string;
};

export type Images = {
  [key: string]: {
    imgArr: Img[];
    pageIndex: number;
  };
};
