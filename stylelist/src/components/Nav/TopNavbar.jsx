import React, { Component } from "react";
import { Navbar } from 'react-bootstrap';
import "./TopNavbar.css"
export default class TopNavbar extends Component {
  render() {
    return (
      <div>
        <Navbar bg="light" id="topNav" expand="lg">
          <Navbar.Brand href="/">
            <img src="/logo.png" style={{height: "55px"}}/>
            </Navbar.Brand>

        </Navbar>
      </div>
    );
  }
}
