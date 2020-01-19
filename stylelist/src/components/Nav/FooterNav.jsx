import React, { Component } from "react";
import "./FooterNav.css";
import { FaGithub } from "react-icons/fa";
// import { Grid } from "react-bootstrap";
export default class FooterNav extends Component {
  render() {
    return (
        
 
        <div class="footer bottom" fixed="bootom" id="footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <h3> Team </h3>
                        <ul class="float-left">
                            <li> <a href="https://github.com/kch3coo"> <FaGithub /> kch3coo </a> </li>
                            <li> <a href="https://github.com/tinally"> <FaGithub /> tinally </a> </li>
                        </ul>
                        <ul class="float-left ml-4">
                            <li> <a href="https://github.com/NivedithaK"> <FaGithub /> NivedithaK </a> </li>
                            <li> <a href="https://github.com/kevinleung987"><FaGithub /> kevinleung987 </a> </li>
                        </ul>
                    </div>
    
                    <div class="col-md-6 text-center">
                        <h3> Info </h3>
                        <ul class="float-left">
                            <li> <div id="info-doc"><a href="https://hackmd.io/@oL21t-1oQeOuBjnwadhgpw/BygxYlgZU"> Documentation </a> </div></li>
                            <li> <div id="info-doc"><a href="https://github.com/tinally/stylelist"> Repository </a></div> </li>
    
                        </ul>
                    </div>
                </div>
 
            </div>
 
        </div>


   

    );
  }
}
