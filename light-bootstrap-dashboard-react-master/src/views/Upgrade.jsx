
import React, { Component } from "react";
import { Table, Grid, Row, Col } from "react-bootstrap";
import UserService from '../service/userService';
import Card from "components/Card/Card";
import "App.scss";
//redux
import { withGlobalContext } from '../GlobalContextProvider';
import { connect } from 'react-redux';
import {changePassWord} from '../redux/action/userAction/UserAction'
import { dataStatus } from "../utility/config";




class Changpass extends Component {
  constructor(props) {
    super(props);

    this.state = {
        currentPassWord: "",
        newPassWord:""
    };
    this.userService = new UserService();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
}

handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    });
}
componentDidUpdate(prevProps){
   if (this.props.changPasswordStatus !== prevProps.changPasswordStatus) {
        if (this.props.changPasswordStatus.status === dataStatus.SUCCESS) {
            if(this.props.changPasswordStatus.data.err){
                return alert(this.props.changPasswordStatus.data.err)}
            else{
                alert("Đổi mật khẩu thành công")
              }
        } 
  }
}
handleSubmit(event) {
    const { Email, PassWord } = this.state;
    let data={
      currentPassWord: this.state.currentPassWord,
      newPassWord: this.state.newPassWord
    };
  this.props.changePassWord(data);
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
                      <div className="form-group">
                        <label>Mật khẩu cũ</label>
                        <input
                          className="form-control"
                          type="currentPassWord"
                          name="currentPassWord"
                          placeholder="Mật khẩu cũ"
                          value={this.state.currentPassWord}
                          onChange={this.handleChange}
                          required />
                      </div>

                      <div className="form-group">
                      <label>Mật khẩu mới</label>
                        <input
                          className="form-control"
                          type="newPassWord"
                          name="newPassWord"
                          placeholder="Mật khẩu mới"
                          value={this.state.newPassWord}
                          onChange={this.handleChange}
                          required />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        onClick={this.handleSubmit}
                      >
                        Submit</button>
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
function mapStateToProps(state) {
  return {
  
    changPasswordStatus: state.UserReducer.changPasswordStatus,
  
  };
}
export default withGlobalContext(
  connect(mapStateToProps, { changePassWord})(Changpass),
);