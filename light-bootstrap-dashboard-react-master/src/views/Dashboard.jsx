
import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import UserContext from "../context/UserContext";
//redux
import { withGlobalContext } from '../GlobalContextProvider';
import { connect } from 'react-redux';
import { getEmptyRoom ,getNotEmptyRoom} from '../redux/action/roomAction/RoomAction';
import { getAllCustomerOfUser } from '../redux/action/customerAction/CustomerAction';

class Dashboard extends Component {


  static contextType = UserContext
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.getEmptyRoom();
    this.props.getNotEmptyRoom();
    this.props.getAllCustomerOfUser();
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