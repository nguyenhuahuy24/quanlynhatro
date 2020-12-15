import React, { Component, useState } from "react";
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import axios from "axios";
import "App.scss";
/*import AdminLayout from "layouts/Admin.jsx";
<Switch>
                    <Route path="/admin" render={props => <AdminLayout {...props} />} />
                    <Redirect from="/" to="/admin/dashboard" />
                  </Switch>


*/
class Login extends Component {
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
        axios
            .post(
                "http://localhost:3001/sessions",
                {
                    user: {
                        email: email,
                        password: password
                    }
                },
                { withCredentials: true }
            )
            .then(response => {
                if (response.data) {
                    this.props.handleSuccessfulAuth(response.data);
                }
            })
            .catch(error => {
                console.log("login error", error);
            });
        event.preventDefault();
    }
    render() {
        return (
            <div className="form" onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group" >
                    <label>Email</label>
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
                    <label>Password</label>
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
                    className="btn"
                >
                    Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p><p className="forgot-password text-right">
                    Đăng kí thành viên <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        );
    }
}
export default Login;
