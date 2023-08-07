import { Button, Card } from 'react-bootstrap';
import useSWR from 'swr';
import Error from 'next/error';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { addToFavourites, removeFromFavourites } from '../lib/userData'; // Import the new functions
import { useState, useEffect } from 'react'; // Import useState and useEffect

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false); // Set the default value of showAdded to false

  useEffect(() => {
    setShowAdded(favouritesList.includes(objectID));
  }, [favouritesList, objectID]);

  async function favouritesClicked() {
    if (showAdded) {
      // Remove from favourites
      await removeFromFavourites(objectID);
    } else {
      // Add to favourites
      await addToFavourites(objectID);
    }
    setShowAdded((prevShowAdded) => !prevShowAdded);
  }

  if (error) {
    return <Error statusCode={404} />
  }

  if (data) {
    return (<>
      <Card>
        {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
        <Card.Body>
          <Card.Title>{data.title || "N/A"}</Card.Title>
          <Card.Text>
            <strong>Date: </strong>{data.objectDate || "N/A"}<br />
            <strong>Classification: </strong>{data.classification || "N/A"}<br />
            <strong>Medium: </strong>{data.medium || "N/A"}
            <br /><br />

            <strong>Artist: </strong> {data.artistDisplayName || "N/A"} {data.artistWikidata_URL && <>( <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a> )</>}<br />
            <strong>Credit Line: </strong> {data.creditLine || "N/A"}<br />
            <strong>Dimensions: </strong> {data.dimensions || "N/A"}<br /><br />

            <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}>+ Favourite {showAdded && "( added )"}</Button>

          </Card.Text>

        </Card.Body>
      </Card>

    </>);

  } else {
    return null
  }
}
