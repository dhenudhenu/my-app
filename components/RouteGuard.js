import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { isAuthenticatedAtom, favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/register'];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && !PUBLIC_PATHS.includes(router.pathname)) {
      router.push('/login');
    } else {
      setIsAuthenticated(!!token);
    }
  }, []);

  useEffect(() => {
    async function updateAtoms() {
      if (isAuthenticated) {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
      }
    }

    updateAtoms();
  }, [isAuthenticated]);

  return <>{children}</>;
}
