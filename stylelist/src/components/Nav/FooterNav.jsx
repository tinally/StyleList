import React, { Component } from "react";
import "./FooterNav.css";
import { FaGithub } from "react-icons/fa";
// import { Grid } from "react-bootstrap";
export default class FooterNav extends Component {
  render() {
    return (
        
        <footer>
        <div class="footer fixed-bottom" fixed="bootom" id="footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <h3> Team </h3>
                        <ul class="float-left">
                            <li> <a href="https://github.com/kch3coo"> <FaGithub /> kch3coo </a> </li>
                            <li> <a href="https://github.com/imJeffZ"> <FaGithub /> imJeffZ </a> </li>
                        </ul>
                        <ul class="float-left ml-4">
                            <li> <a href="https://github.com/dpcjzpeter"> <FaGithub /> dpcjzpeter </a> </li>
                            <li> <a href="https://github.com/atrocitytheme"><FaGithub /> atrocitytheme </a> </li>
                        </ul>
                    </div>
    
                    <div class="col-md-6">
                        <h3> Info </h3>
                        <ul>
                            <li> <a href="#"> Documentation </a> </li>
                            <li> <a href="#"> Repository </a> </li>
    
                        </ul>
                    </div>
                </div>
 
            </div>
 
        </div>


   
    </footer>
    );
  }
}
