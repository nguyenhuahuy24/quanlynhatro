
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
           <Nav>
          <NavDropdown
            eventKey={2}
            title={notification}
            noCaret
            style={{marginTop:"9px"}}
            id="basic-nav-dropdown"
          >
            <MenuItem eventKey={2.1}>Notification 1</MenuItem>
            <MenuItem eventKey={2.2}>Notification 2</MenuItem>
            <MenuItem eventKey={2.3}>Notification 3</MenuItem>
            <MenuItem eventKey={2.4}>Notification 4</MenuItem>
            <MenuItem eventKey={2.5}>Another notifications</MenuItem>
          </NavDropdown>
        </Nav>
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
