import React from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import './App.css';
import ProductCard from './ProductCard';

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">StyleList</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="products">Products</Nav.Link>
        </Nav>
      </Navbar>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/products">
              <ProductCard />
            </Route>
          </Switch>
        </div>
      </Router>
      <ProductCard />
    </div>
  );
}

export default App;
