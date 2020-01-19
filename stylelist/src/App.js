import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Home from './components/Home/Home';
import ProductCard from './components/Card/ProductCard';
import Deck from './components/Deck/Deck'
import FooterNav from './components/Nav/FooterNav'


function App() {
  return (
    <div className="bg">
      {/* <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">StyleList</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="products">Products</Nav.Link>
          <Nav.Link href="deck">Deck</Nav.Link>
        </Nav>
      </Navbar> */}
      <Router>
        <Switch>
          <Route path="/products" component={ProductCard} />
          <Route path="/deck" component={Deck} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
      <FooterNav />
    </div>
  );

}

export default App;
