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


function App() {
  return (
    <>
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
    <div className="App">
      Hello
      <section class="bg-white py-md-5 separator-bottom">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6 text-center">
              <span class="eyebrow d-block mb-1 text-primary">
                Our Creative Team
              </span>
            </div>
          </div>
          <div class="row gutter-0">
            <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <figure class="user">
                <a href="" class="user-photo">
                  <img src="kevin.png" alt="Avatar" />
                </a>
                <figcaption class="user-caption text-center">
                  <h4>Kevin</h4>
                  <span>MAT137, PHY131, MAT187</span>
                  <ul class="socials">
                    <section class="text-left text-white pr-md-2">
                      Master in Mechanical Engineering at the University of
                      Toronto Research focus: Electrochemical and fuel cells and
                      fluid mechanics 3-year Research Assistant
                    </section>
                  </ul>
                </figcaption>
              </figure>
            </div>
            <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <figure class="user">
                <a href="" class="user-photo">
                  <img
                    src="../../assets/img/instructors/Nancy.png"
                    alt="Avatar"
                  />
                </a>
                <figcaption class="user-caption text-center">
                  <h4>Nancy</h4>
                  <span>STA220, CHM135</span>
                  <ul class="socials">
                    <section class="text-left text-white pr-md-2"></section>
                  </ul>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
  
}

export default App;
