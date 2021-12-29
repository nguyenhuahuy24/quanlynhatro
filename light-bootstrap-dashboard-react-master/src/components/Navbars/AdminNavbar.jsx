
import React, { Component } from "react";
import { Navbar ,NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

import AdminNavbarLinks from "./AdminNavbarLinks.jsx";

class Header extends Component {
render() {
   const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );


    return (
      <Navbar fluid>
        <Navbar.Header>
           
          <Navbar.Brand>
         
            <a href="#pablo">{this.props.brandText}</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <AdminNavbarLinks />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default Header;
