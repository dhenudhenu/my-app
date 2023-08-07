// pages/favourites.js

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { getFavourites } from '../lib/userData';

const Favourites = () => {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  useEffect(() => {
    const fetchFavourites = async () => {
      const favourites = await getFavourites();
      setFavouritesList(favourites);
    };

    fetchFavourites();
  }, [setFavouritesList]);

  if (!favouritesList) return null; // Return null while the favourites list is being fetched

  return (
    <div>
      <h1>Favourites</h1>
      {/* Your favourites rendering goes here */}
    </div>
  );
};

export default Favourites;
