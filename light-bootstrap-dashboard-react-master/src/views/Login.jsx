import React, { Component, useState, useContext } from "react";
import { Link, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import axios from "axios";
import "App.scss";
import UserContext from "../context/UserContext"


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
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const { email, password } = this.state;
        event.preventDefault();
        axios
            .post(
                "http://localhost:8080/auth",
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
                        user: response.data.userId
                    })
                    this.props.history.push("/admin/dashboard")
                }
            })
            .catch(error => {
                console.log("login error", error);
            });
        
    }
    render() {
      
        return (
           
            <div className="login-form">
                 <form>
                <h2 className="text-center">Sign In</h2>

                <div className="form-group">
               
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required />
                </div>

                <div className="form-group">
                  
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={this.handleSubmit}
                >
                    Submit</button>
               
                <p className="forgot-password text-center">
                    Đăng kí thành viên <Link to="/signup">Sign Up</Link>
                </p>
                </form>
            </div>
           
        );
    }
}
export default Login;