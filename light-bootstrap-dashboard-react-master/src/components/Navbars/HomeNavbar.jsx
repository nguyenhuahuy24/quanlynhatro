import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import logo from 'assets/img/logo_1.png'

class HomeNavbar extends Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return (
      <div>
           <div class="top-bar">
      <div class="container">
        <div class="row_home align-items-center">
          <div class="col-md-8">
            <div class="d-inline-block">
              <span class="mai-mail fg-primary"></span> <a href="mailto:huahuy1113@mail.com">huahuy1113@mail.com</a>
            </div>
            <div class="d-inline-block ml-2">
              <span class="mai-call fg-primary"></span> <a href="tel:+0778908123">+0778908123</a>
            </div>
          </div>
          <div class="col-md-4 text-right-home d-none d-md-block">
            <div class="social-mini-button">
              <a href="#"><span class="mai-logo-facebook-f"></span></a>
              <a href="#"><span class="mai-logo-youtube"></span></a>
              <a href="#"><span class="mai-logo-twitter"></span></a>
              <a href="#"><span class="mai-logo-linkedin"></span></a>
            </div>
          </div>
        </div>
      </div> 
    </div> 
    <nav class="navbar-home navbar-expand-lg">
      <div class="container-home">
        
          <a href=""><img class="img-logo"  src={logo}/></a>
          
   


        <div class="navbar-collapse-home collapse">
          <ul class="navbar-nav-home ml-auto pt-3 pt-lg-0">
          <li class="nav-item">
              <a href="signin" class="nav-link navbar-a">Đăng nhập</a>
            </li>
            <li class="nav-item">
              <a href="signup" class="nav-link navbar-a">Đăng Ký</a>
            </li>
      
            {/* <li class="nav-item">
              <a href="" class="nav-link navbar-a">Liên hệ</a>
            </li> */}
            
          </ul>
        </div>
      </div> 
    </nav> 
      </div>
    );
  }
}

export default HomeNavbar;
