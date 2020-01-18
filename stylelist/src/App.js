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
import ProductCard from './ProductCard';
import Figure from './components/Figure/Figure'


function App() {
  return (
    <div className="background">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">StyleList</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="products">Products</Nav.Link>
          <Nav.Link href="figure">Figure</Nav.Link>
        </Nav>
      </Navbar>
      <Router>
        <Switch>
          <Route path="/products" component={ProductCard} />
          <Route path="/figure" component={Figure} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );

}

export default App;
