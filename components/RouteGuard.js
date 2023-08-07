// components/RouteGuard.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated, getToken } from '@/lib/authenticate'; // Import the isAuthenticated and getToken functions
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store'; // Import the favouritesAtom and searchHistoryAtom

const PUBLIC_PATHS = ['/login', '/register'];

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    const isPublicPath = PUBLIC_PATHS.includes(router.pathname);
    const isAuth = isAuthenticated();
    const token = getToken();

    if (!isPublicPath && !isAuth) {
      router.push('/login');
    }

    // Update the atoms with favourites and history data when authenticated
    if (isAuth && token) {
      async function updateAtoms() {
        setFavouritesList(await getFavourites()); 
        setSearchHistory(await getHistory()); 
      }
      updateAtoms();
    }
  }, [router.pathname, setFavouritesList, setSearchHistory]);

  return <>{children}</>;
};

export default RouteGuard;
