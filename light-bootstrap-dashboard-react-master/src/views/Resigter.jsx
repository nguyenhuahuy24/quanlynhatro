import React, { Component } from "react";
import { Link ,NavLink} from 'react-router-dom';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/animate.min.css";
import { Toast } from 'primereact/toast';
import { URL } from "utility/config";
import "../assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "../assets/css/demo.css";
import "../assets/css/pe-icon-7-stroke.css";
import "../App.scss"
class Resigter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        let state = { submitted: true };
        const { email, password, password_confirmation } = this.state;
        if(password === password_confirmation)
        {
        axios
            .post(
                `${URL}/register`,
                {
                   
                        Email: email,
                        PassWord: password
                    
                },
                { withCredentials: true }
            )
            .then(response => {
                console.log(response)
                if (response.data.Status === 0) {
                     this.toast.show({
                        severity: "success",
                        summary: "Đăng kí",
                        detail: "Vui lòng xác thực bằng Email",
                        life: 4000
                        });
                    state = {
                      ...state,
                    // rooms,
                      email:"",
                      password:"",
                      password_confirmation: "",
                    };
                    this.setState(state)
                }
            })
            .catch(error => {
                console.log("registration error", error);
                this.toast.show({
                        severity: "error",
                        summary: "Đăng kí",
                        detail: error,
                        life: 4000
                        });
            });
        }
        else{
            this.toast.show({
                        severity: "error",
                        summary: "Đăng kí",
                        detail: "Vui lòng nhập lại mật khẩu!",
                        life: 4000
                        });
            
        }
        event.preventDefault();
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
                activeClassName="formTitleLink"
                className="formTitleLink"
              >
                Đăng Nhập
              </NavLink>{" "}
              or{" "}
              <NavLink
                exact
                to="/signup"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Đăng Ký
              </NavLink>
            </div>
        <div className="formCenter">
            <form onSubmit={this.handleSubmit} className="formFields">
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail:
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Nhập email bạn muốn đăng ký"
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
              placeholder="Nhập mật khẩu muốn đăng ký"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
           <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Xác Nhận Lại Mật Khẩu:
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Nhập lại mật khẩu muốn đăng ký"
              name="password_confirmation"
              value={this.state.password_confirmation}
              onChange={this.handleChange}
            />
          </div>

          <div className="formField">
            <button className="formFieldButton">Đăng Ký</button>{" "}
            <Link to="/signin" className="formFieldLink">
              Bạn đã là thành viên ?
            </Link>
          </div>
        </form>
        </div>
        
          </div>
          </div>
          
        </div>
      
    )}
}
export default Resigter;
 