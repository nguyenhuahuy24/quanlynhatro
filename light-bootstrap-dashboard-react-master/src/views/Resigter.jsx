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
        console.log("a")
        const { email, password, password_confirmation } = this.state;
        if(password === password_confirmation)
        {
        axios
            .post(
                "http://localhost:8080/register",
                {
                   
                        Email: email,
                        PassWord: password
                    
                },
                { withCredentials: true }
            )
            .then(response => {
                console.log(response)
                if (response.data.Status === 0) {
                    alert("Vui lòng xác thực bằng Email")
                    
                }
            })
            .catch(error => {
                console.log("registration error", error);
            });
        }
        else{
            alert("Vui lòng nhập lại mật khẩu!")
        }
        event.preventDefault();
    }
    render() {
       
        return (
            <div className="login-form">
                <form>
                <h2 className="text-center">Sign Up</h2>
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
                        required
                    />
                </div>
                <div className="form-group">
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
                <button type="submit" className="btn btn-primary btn-block" onClick = {this.handleSubmit}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <Link to="/">Sign In</Link>
                </p>
                </form>
            </div>
        );
    }
}
export default Resigter;