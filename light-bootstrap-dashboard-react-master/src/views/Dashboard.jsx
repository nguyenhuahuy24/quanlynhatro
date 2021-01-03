
import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import PhongTroService from '../service/phongtroService';
import UserContext from "../context/UserContext";
import KhachThueService from '../service/khachthueService';
class Dashboard extends Component {


  static contextType = UserContext
  constructor(props){
    super(props);
    this.state ={
      EmptyRoom:0,
      NotemtyRoom: 0,
      AmountofCustomer:0
    }
    this.phongtroService = new PhongTroService();
    
    this.userService = new KhachThueService();
    this.userService.getAllCustomerOfUser().then(response => this.setState({AmountofCustomer : response.length}))
  }
  componentDidMount(){
    const{userData,setUserData}= this.context;
      this.phongtroService
      .getemtyRoom()
      .then(data => this.setState({ EmptyRoom: data.AmountOfRoom }));
    this.phongtroService
      .getNotemtyRoom()
      .then(data => this.setState({ NotemtyRoom: data.AmountOfRoom }));
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Đã thuê"
                statsValue={this.state.NotemtyRoom}
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Phòng trống"
                statsValue={this.state.EmptyRoom}
              />
            </Col>
           
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="Khách Thuê"
                statsValue={this.state.AmountofCustomer}
              />
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}

export default Dashboard;
