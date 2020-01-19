import React from 'react';
import './Home.css';
import { useState } from 'react';

import {Button, Col, Row, Form, Carousel, Navbar} from 'react-bootstrap'
import TypingEffect from '../TypingEffect/TypingEffect'
import FooterNav from '../Nav/FooterNav'


function Home() {
  const items = ['shoes', 'shirts', 'dresses', 'jackets', 'jeans'];
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const [searchValue, setValue] = useState("");

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  const handleType = (change) => {
    const value = change.target.value;
    if (change.nativeEvent.keyCode === 13) {
      if (items.includes(value.toLowerCase())) {
        selectProduct(value.toLowerCase());
      } else {
        console.log('Invalid Product!');
      }
    }
    setValue(value);
  }

  const selectProduct = (product) => {
    console.log(`Selected Product: ${product}`);
  }

  return (
    <div className="home">
      <div className="row">
        <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./slide2.png"
              height="650em"
            />
            <Carousel.Caption>
              <TypingEffect word={"STYLE-LIST"}/>
  
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://componentblox.com/wp-content/uploads/img-116.jpg"
              height="650em"
            />
            <Carousel.Caption>
            <TypingEffect word={"Daily Delivery"}/>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://componentblox.com/wp-content/uploads/img-117.jpg"
              height="650em"
            />
            <Carousel.Caption>
            <TypingEffect word={"Live on the edge"}/>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <Form.Group>
        <Form.Row>
          <Col sm={4}>
          </Col>
          <Col sm={4}>
            <Form.Control sm={4} size="md" type="text" placeholder="Search..." value={searchValue.value} onKeyPress={handleType} />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col sm={3}>
          </Col>
          <Col sm={6}>
            <Button variant="secondary" onClick={() => selectProduct('shoes')}>Shoes</Button>
            <Button variant="secondary" onClick={() => selectProduct('shirts')}>Shirts</Button>
            <Button variant="secondary" onClick={() => selectProduct('dresses')}>Dresses</Button>
            <Button variant="secondary" onClick={() => selectProduct('jackets')}>Jackets</Button>
            <Button variant="secondary" onClick={() => selectProduct('jeans')}>Jeans</Button>
          </Col>
        </Form.Row>
      </Form.Group>

      <FooterNav />
    </div>
  );
}

export default Home;
