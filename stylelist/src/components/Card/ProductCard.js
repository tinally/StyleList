import React from "react";
import PropTypes from "prop-types";
import { animated, interpolate } from "react-spring/hooks";
import { Card, Button } from "react-bootstrap";
import "./ProductCard.css";
class ProductCard extends React.Component {
  render() {
    const { indexes, i, x, y, rot, scale, trans, bind, data } = this.props;
    const {
      product_name,
      product_url,
      img_url,
      // color_url_list,
      details,
    } = data[i];

    return (
      <animated.div
        key={i}
        style={{
          transform: interpolate(
            [x, y],
            (x, y) => `translate3d(${x}px,${y}px,0)`
          )
        }}
      >
        <animated.div
          {...bind(i, indexes)}
          style={{
            transform: interpolate([rot, scale], trans)
          }}
        >
          {/* {color_url_list.map((color_url, index) => {
                return (
                  <img
                    className="color_bar mr-1"
                    src={color_url}
                    alt="color"
                    key={index}
                  />
                );
              })} */}
          <Card className="product-card" style={{ width: "20rem", minHeight: "200px", maxHeight:"400rpx" }}>
            
            <Card.Img className="card_image" variant="top" src={img_url} />
            <Card.Body>
              <Card.Title>{product_name}</Card.Title>
              <Card.Text>
              {details}
              </Card.Text>
              <Button className="mr-1" variant="outline-dark" href={data[i].link} target="_blank">Buy</Button>
            </Card.Body>
          </Card>
          {/* <div className="card">
            <div className="color-options">
              {color_url_list.map((color_url, index) => {
                return (
                  <img
                    className="color_bar mr-1"
                    src={color_url}
                    alt="color"
                    key={index}
                  />
                );
              })}
            </div>

            <img src={img_url} alt="profilePicture" />
            <h3>{product_name},</h3>
            <h2>${price}</h2>
            <h5>{details}</h5>
            <Button variant="outline-dark">Dive</Button>
          </div> */}
          {/* <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={img_url} />
            <Card.Body>
              <Card.Title>{product_name}</Card.Title>
              <h2>${price}</h2>
              <Card.Text>
              {details}
              </Card.Text>
            </Card.Body>
          </Card> */}
        </animated.div>
      </animated.div>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  distance: PropTypes.string,
  text: PropTypes.string,
  pics: PropTypes.array
};

export default ProductCard;
