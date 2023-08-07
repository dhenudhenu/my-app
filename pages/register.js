import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { userAtom, favouritesAtom, searchHistoryAtom } from '../store';

import { getFavourites, getHistory } from '../lib/userData';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useAtom(userAtom);
  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await registerUser(username, password, password2);
      router.push('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        {error && <div>{error}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
