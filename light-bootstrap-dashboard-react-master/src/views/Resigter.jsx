import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import "App.scss";
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
        const { email, password, password_confirmation } = this.state;

        axios
            .post(
                "http://localhost:3001/registrations",
                {
                   
                        Email: email,
                        Password: password
                    
                },
                { withCredentials: true }
            )
            .then(response => {
                if (response.data.status === "created") {
                    this.props.handleSuccessfulAuth(response.data);
                }
            })
            .catch(error => {
                console.log("registration error", error);
            });
        event.preventDefault();
    }
    render() {
        return (
            <div className="form">
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Email address</label>
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
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password_confirmation"
                        placeholder="Password confirmation"
                        value={this.state.password_confirmation}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <Link to="/">Sign In</Link>
                </p>
            </div>
        );
    }
}
export default Resigter;