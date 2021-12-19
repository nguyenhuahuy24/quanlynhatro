
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from "react-bootstrap";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import UserContext from "../context/UserContext";
//redux
import { withGlobalContext } from '../GlobalContextProvider';
import { connect } from 'react-redux';
import { getEmptyRoom ,getNotEmptyRoom} from '../redux/action/roomAction/RoomAction';
import { getAllCustomerOfUser } from '../redux/action/customerAction/CustomerAction';

import { Chart } from 'primereact/chart';

class Dashboard extends Component {


  static contextType = UserContext
  constructor(props){
    super(props);
     this.basicData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#42A5F5',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#FFA726',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
    this.options = this.getLightTheme();
  }
  componentDidMount(){
    this.props.getEmptyRoom();
    this.props.getNotEmptyRoom();
    this.props.getAllCustomerOfUser();
  }
     getLightTheme() {
        let basicOptions = {
            legend: {
                labels: {
                    fontColor: '#495057'
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: '#495057'
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: '#495057'
                    }
                }]
            }
        };

      

        return {
            basicOptions,
          
        }
    }
  render() {
    const { basicOptions } = this.options;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Đã thuê"
                statsValue={this.props.listNotEmptyRoom.data.AmountOfRoom}
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Phòng trống"
                statsValue={this.props.listEmptyRoom.data.AmountOfRoom}
              />
            </Col>
           
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="Khách Thuê"
                statsValue={this.props.listCustomer.data.length}
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
    listEmptyRoom: state.RoomReducer.listEmptyRoom,
    listNotEmptyRoom: state.RoomReducer.listNotEmptyRoom,
    //customer
    listCustomer: state.CustomerReducer.listCustomer,
  };
}
export default withGlobalContext(
  connect(mapStateToProps, { getEmptyRoom,getNotEmptyRoom,getAllCustomerOfUser})(Dashboard),
);