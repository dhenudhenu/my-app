// pages/history.js

import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { removeFromHistory } from '../lib/userData'; // Import the new function

const History = () => {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function removeHistoryClicked(index) {
    // Remove history item at the specified index
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  }

  if (!searchHistory) return null; // Return null while the search history is being fetched

  return (
    <div>
      {/* Your history list rendering goes here */}
    </div>
  );
};

export default History;
