
import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext"
class AdminNavbarLinks extends Component {
  static contextType = UserContext
  render() {
    
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    const logout=()=>{
      const{userData,setUserData}= this.context;
      setUserData({
        token:undefined,
        user:undefined,
      });
      localStorage.clear();
    }
    return (
      <div>
        <Nav>
          <NavDropdown
            eventKey={2}
            title={notification}
            noCaret
            id="basic-nav-dropdown"
          >
            <MenuItem eventKey={2.1}>Notification 1</MenuItem>
            <MenuItem eventKey={2.2}>Notification 2</MenuItem>
            <MenuItem eventKey={2.3}>Notification 3</MenuItem>
            <MenuItem eventKey={2.4}>Notification 4</MenuItem>
            <MenuItem eventKey={2.5}>Another notifications</MenuItem>
          </NavDropdown>
        </Nav>
        <Nav pullRight>
        
        <NavItem eventKey={3} href="#">
            <label onClick={logout}>
              <Link to ="/">Log out</Link>
            </label>
          </NavItem>
          
          
        </Nav>
      
      </div>
      
    );
  }
}

export default AdminNavbarLinks;
