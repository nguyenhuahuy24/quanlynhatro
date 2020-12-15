
import React, { Component } from "react";
import { Table, Grid, Row, Col } from "react-bootstrap";
import axios from "axios";
import Card from "components/Card/Card";

class Changpass extends Component {
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
            if (response.data.logged_in) {
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
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8} mdOffset={2}>
              <Card
                hCenter
                title="Đổi mật khẩu"
                content={
                  <Table>
                    <div className="form">
                      <div className="form-group">
                        <label>Mật khẩu cũ</label>
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          placeholder="Mật khẩu cũ"
                          value={this.state.email}
                          onChange={this.handleChange}
                          required />
                      </div>

                      <div className="form-group">
                        <label>Mật khẩu mới</label>
                        <input
                          className="form-control"
                          type="password"
                          name="password"
                          placeholder="Mật khẩu mới"
                          value={this.state.password}
                          onChange={this.handleChange}
                          required />
                      </div>
                      <button
                        type="submit"
                        className="btn"
                        onClick={this.handleSubmit}
                      >
                        Submit</button>
                    </div>

                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Changpass;
