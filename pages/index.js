/*********************************************************************************
*  WEB422 – Assignment 4
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Huu Tinh Luu Student ID: 152712196  Date: 7/7/2023
*  Netlify Link: https://melodic-youtiao-9f39b3.netlify.app
*
********************************************************************************/ 


import { Row, Col } from 'react-bootstrap';
import Head from 'next/head';

const Home = () => {
  return (
    <>
      <Head>
        <title>The Metropolitan Museum of Art</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Row>
          <Col>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
              className="img-fluid rounded"
              alt="The Metropolitan Museum of Art"
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p>
              The Metropolitan Museum of Art, colloquially the Met is located in New York City and is the largest art museum in the United States.
              Its permanent collection contains over two million works, divided among seventeen curatorial departments.
              The museum is also known for its annual Costume Institute Gala, a fundraising benefit held each May.
            </p>
            <p>
              <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">
                Learn more about the Metropolitan Museum of Art
              </a>
            </p>
          </Col>
        </Row>
      </main>
    </>
  );
};

export default Home;

