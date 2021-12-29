import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import {getUser } from '../redux/action/userAction/UserAction'
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/animate.min.css";

import "../assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "../assets/css/demo.css";
import "../assets/css/pe-icon-7-stroke.css";
import "../App.scss"
import axios from "axios";
import UserContext from "../context/UserContext"
import { withGlobalContext } from '../GlobalContextProvider';
import { connect } from 'react-redux';
import { dataStatus,userProfile,URL } from "../utility/config";
import "../index.css";

class Login extends Component {
    static contextType = UserContext
   
    constructor(props) {
        super(props);     
        this.state = {
            email: "",
            password: "",
            loginErrors: ""
        };
     
       
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loginTest = this.loginTest.bind(this);
    }
    loginTest(){
      this.toast.show({
      severity: "error",
      summary: "Thất bại",
      detail: "Chức năng đang cập nhật",
      life: 3000
      });
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
            .post(
                `${URL}/auth`,
                {
                    Email: this.state.email,
                    PassWord: this.state.password
                },
                { withCredentials: true }
            )
            .then(response => {
                if (response.data) {
                    localStorage.setItem("auth-token",response.data.accessToken)
                    localStorage.setItem("userIDlogin",response.data.userId)
               
                    this.context.setUserData({
                        token: response.data.accessToken,
                        user: response.data.userId,
                    })
                    userProfile.userId = response.data.userId
                    this.props.getUser();
                    this.props.history.push("/admin/support")
                }
            })
            .catch(error => {
                alert("Sai tên đăng nhập hoặc mật khẩu!")
            });
        
    }
     render() {
    return (
      
        <div className="App">
                <Toast ref={(el) => (this.toast = el)} />

          <div className="appAside">
            <div className="appForm">
              

            <div className="formTitle-home">
              
            
              <NavLink
                exact
                to="/"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Trang Chủ
              </NavLink>
            </div>
            <div className="formTitle">
              <NavLink
                to="/signin"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Đăng Nhập
              </NavLink>{" "}
              or{" "}
              <NavLink
                exact
                to="/signup"
                activeClassName="formTitleLink"
                className="formTitleLink"
              >
                Đăng Ký
              </NavLink>
            </div>
       
      <div className="formCenter">
        <form className="formFields" onSubmit={this.handleSubmit}>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail:
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Nhập email của bạn"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Mật Khẩu:
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Nhập mật khẩu của bạn"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div className="formField">
            <button className="formFieldButton">Đăng Nhập</button>{" "}
            <Link to="/signup" className="formFieldLink">
              Tạo tài khoản mới.
            </Link>
          </div> 
        </form>
        
              <div className="button-demo">
                  <div className="template">
                       <Button className="facebook p-p-0" onClick={this.loginTest}>
                  <i className="pi pi-facebook p-px-2"></i>
                  <span className="p-px-3">Facebook</span>
              </Button>
              <Button className="twitter p-p-0" onClick={this.loginTest}>
                  <i className="pi pi-twitter p-px-2"></i>
                  <span className="p-px-3">Twitter</span>
              </Button>
              <Button className="google p-p-0" onClick={this.loginTest}>
                  <i className="pi pi-google p-px-2"></i>
                  <span className="p-px-3">Google</span>
              </Button>
                  </div>
              </div>
      </div>
       
          </div>
          </div>
          
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
  connect(mapStateToProps, { getUser})(Login),
);