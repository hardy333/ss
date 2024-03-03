const api_key = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const fetchImages = async (pageIndex: number, searchValue: string) => {
  try {
    if (searchValue === "dog") {
      var res = await fetch(
        `https://api.unsplash.com/searchssss/photos?page=${pageIndex}&per_page=10&query=${searchValue}&client_id=${api_key}`
      );
    } else {
      var res = await fetch(
        `https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=10&query=${searchValue}&client_id=${api_key}`
      );
    }

    if (!res.ok) {
      return null;
    }
    const data = res.json();
    return data;
  } catch (err) {
    return null;
  }
};

export const fetchPhoto = async (id: string) => {
  try {
    var res = await fetch(
      `https://api.unsplash.com/photos/${id}?client_id=${api_key}`
    );

    if (!res.ok) {
      return null;
    }
    const data = res.json();
    return data;
  } catch (err) {
    return null;
  }
};

export default fetchImages;
