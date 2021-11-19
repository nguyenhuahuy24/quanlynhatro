import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import logo from 'assets/img/logo_1.png'

class FooterNavbar extends Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return (
      <div>
        <div class="page-footer">
         <div class="container">
      <div class="row_home">
        <div class="col-lg-4 py-3">
        <img class="img-footer" src={logo}></img>
        <a>NHATROHUY – Phần mềm Quản lý Nhà trọ. Là một trong những ứng dụng hàng đầu về phần mềm quản lý bất động sản cho thuê số 1 của thị trường hiện nay.</a>
        </div>
        <div class="col-lg-8 py-3 text-footer">
          <h5>Liên hệ</h5>
          <p>Email: <a>huahuy1113@mail.com</a></p>
          <p>Phone: <a>+0778908123</a></p>
        </div>
      

      </div>
    </div>
     </div>
      </div>
    );
  }
}

export default FooterNavbar;
