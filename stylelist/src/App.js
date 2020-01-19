import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Home from './components/Home/Home';
import ProductCard from './components/Card/ProductCard';
import Deck from './components/Deck/Deck'


function App() {
  return (
    <div className="background" >
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
    </div>
  );

}

export default App;
