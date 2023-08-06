
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import ArtworkCard from '@/components/ArtworkCard';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null; // Do not render until the favourites list is fetched

  return (
    <div>
      <h1>Nothing Here</h1>
      {favouritesList.length === 0 ? (
        <p>Try adding some new artwork to the list.</p>
      ) : (
        <div>
          {favouritesList.map((objectID) => (
            <ArtworkCard key={objectID} objectID={objectID} />
          ))}
        </div>
      )}
    </div>
  );
}
