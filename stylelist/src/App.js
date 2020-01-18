import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import ProductCard from './ProductCard';
import Figure from './components/Figure/Figure'


function App() {
  return (
    <>
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">StyleList</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="products">Products</Nav.Link>
          <Nav.Link href="figure">Figure</Nav.Link>
        </Nav>
      </Navbar>
      <Router>
        {/* <div className="App">
          <Switch>
            <Route path="/products">
              <ProductCard />
            </Route>
          </Switch>
        </div> */}
        <Route path="/products" component={ProductCard} />
        <Route path="/figure" component={Figure} />
      </Router>
      
    </>
  );
  
}

export default App;
