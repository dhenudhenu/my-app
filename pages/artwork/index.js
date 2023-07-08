import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import { Container, Row, Col, Pagination, Card } from 'react-bootstrap';
import ArtWorkCard from '/components/ArtWorkCard';
import { useState, useEffect } from 'react';

const PER_PAGE = 12;

export default function ArtWork() {
  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];

  const [artWorkList, setArtWorkList] = useState(null);
  const [page, setPage] = useState(1);

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  useEffect(() => {
    if (data) {
      const results = [];
      if (data.objectIDs) {
        for (let i = 0; i < data.objectIDs.length; i += PER_PAGE) {
          const chunk = data.objectIDs.slice(i, i + PER_PAGE);
          results.push(chunk);
        }
      }
      setArtWorkList(results);
      setPage(1);
    }
  }, [data]);

  if (error) return <Error statusCode={404} />;
  if (artWorkList === null) return null;

  const previousPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const nextPage = () => {
    setPage((prevPage) =>
      prevPage < artWorkList.length ? prevPage + 1 : prevPage
    );
  };

  return (
    <Container>
  <Row className='gy-4'>
    {artWorkList.length > 0 &&
      artWorkList[page - 1].map((currentObjectID) => (
        <Col lg={3} key={currentObjectID}>
          <ArtWorkCard objectID={currentObjectID} />
        </Col>
      ))}
    {artWorkList.length === 0 && (
      <div className="empty-results">
        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>
            <p>Try searching for something else</p>
          </Card.Body>
        </Card>
      </div>
    )}
  </Row>
  {artWorkList.length > 0 && (
    <Row style={{ marginTop: '10px' }}>
      <Col className='d-flex justify-content-center'>
        <Pagination>
          <Pagination.Prev onClick={previousPage} />
          <Pagination.Item>{page}</Pagination.Item>
          <Pagination.Next onClick={nextPage} />
        </Pagination>
      </Col>
    </Row>
  )}
</Container>

  );
}
