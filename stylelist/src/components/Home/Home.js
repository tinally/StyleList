import React from "react";
import "./Home.css";
import { useState } from "react";

import { Button, Col, Row, Form, Carousel, Navbar } from "react-bootstrap";
import TypingEffect from "../TypingEffect/TypingEffect";
import FooterNav from "../Nav/FooterNav";

import { useHistory } from "react-router-dom";

function Home() {
  const items = ["shoes", "shirts", "dresses", "jackets", "jeans"];
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const [searchValue, setValue] = useState("");

  const history = useHistory();


  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  const handleType = change => {
    const value = change.target.value;
    if (change.nativeEvent.keyCode === 13) {
      if (items.includes(value.toLowerCase())) {
        selectProduct(value.toLowerCase());
      } else {
        console.log("Invalid Product!");
      }
    }
    setValue(value);
  };

  const selectProduct = product => {
    console.log(`Selected Product: ${product}`);
    history.push("/deck");
  };

  return (
    <div className="home">
      <div className="row">
        <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={handleSelect}
        >
          <Carousel.Item>
            <img className="d-block w-100" src="./slide2.png" height="550em" />
            <Carousel.Caption>
              <TypingEffect word={"STYLE-LIST"} colorWhite={false} />

              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./slide1.5.png"
              height="550em"
            />
            <Carousel.Caption>
              <TypingEffect word={"Daily Delivery"} colorWhite={false} />
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="./slide3.png" height="550em" />
            <Carousel.Caption>
              <TypingEffect word={"Live on the edge"} colorWhite={true} />
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="mt-3 p-2">
        <Form.Group>
          <Form.Row>
            <Col sm={4}></Col>
            <Col sm={4}>
              <Form.Control
                sm={4}
                size="md"
                type="text"
                placeholder="Search..."
                value={searchValue.value}
                onKeyPress={handleType}
              />
            </Col>
          </Form.Row>
          <Form.Row className="mt-2">
            <Col sm={3}></Col>
            <Col sm={6}>
              <Button
                variant="outline-pink"
                onClick={() => selectProduct("shoes")}
              >
                Shoes
              </Button>
              <Button
                href="deck"
                variant="outline-pink"
                onClick={() => selectProduct("jackets")}
              >
                Jackets
              </Button>
              <Button
                variant="outline-pink"
                onClick={() => selectProduct("dresses")}
              >
                Dresses
              </Button>
              <Button
                variant="outline-pink"
                onClick={() => selectProduct("jackets")}
              >
                Shirts
              </Button>
              <Button
                variant="outline-pink"
                onClick={() => selectProduct("jeans")}
              >
                Jeans
              </Button>
            </Col>
          </Form.Row>
        </Form.Group>
      </div>
      <FooterNav />
    </div>
  );
}

export default Home;
