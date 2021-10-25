
import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from 'primereact/button';
import UserContext from "../../context/UserContext"
import "../../index.css"
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
       <Link to ="/"></Link>
    }
    return (
      <div>
        <Nav pullRight>
        
        <NavItem eventKey={3}>
            <Button
              label="Đăng xuất"
              icon="pi pi-sign-out"
              className="p-mr-2"
              style={{background:"#ff4d4d",border: "1px solid #ff4d4d"}}
              onClick={logout}
            />
          </NavItem>
        </Nav>
      
      </div>
      
    );
  }
}

export default AdminNavbarLinks;
