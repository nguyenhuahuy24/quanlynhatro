
import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from 'primereact/button';
import UserContext from "../../context/UserContext"
import {userProfile} from "../../utility/config"
import "../../index.css"

import { withGlobalContext } from '../../GlobalContextProvider';
import { connect } from 'react-redux';

class AdminNavbarLinks extends Component {
  static contextType = UserContext
  render() {
    
   
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
        <Nav style={{paddingTop:"15px"}}>
          <label style={{fontWeight:"400"}}>Xin Chào! {this.props.user.data.Name && <label style={{fontWeight:"400"}}>{this.props.user.data.Name}</label>}</label>
        </Nav>
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

function mapStateToProps(state) {
  return {
    user: state.UserReducer.user,
  };
}
export default withGlobalContext(
  connect(mapStateToProps, {})(AdminNavbarLinks),
);