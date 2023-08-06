import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { userAtom, favouritesAtom, searchHistoryAtom } from '../store';
import { authenticateUser } from '../lib/authenticate';
import { getFavourites, getHistory } from '../lib/userData';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useAtom(userAtom);
  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const authenticatedUser = await authenticateUser(username, password);
      setUser(authenticatedUser);
      await updateAtoms();
      router.push('/favourites');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
