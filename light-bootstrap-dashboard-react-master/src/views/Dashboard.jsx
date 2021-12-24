
import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";

import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import UserContext from "../context/UserContext";
//redux
import { withGlobalContext } from '../GlobalContextProvider';
import { connect } from 'react-redux';
import { getEmptyRoom ,getNotEmptyRoom} from '../redux/action/roomAction/RoomAction';
import { getAllCustomerOfUser } from '../redux/action/customerAction/CustomerAction';
import { getByYear } from '../redux/action/statisticalAction/StatisticalAction';

import "../index.css"
import { dataStatus } from "../utility/config";

import ChartistGraph from "react-chartist";
import ChartistTooltip from "chartist-plugin-tooltips-updated";
var optionsBar = {
  seriesBarDistance: 10,
  axisX: {
    showGrid: false,
    
  },
  axisY: {
    offset: 90,
    
    
  },
  height: "265px",
  plugins: [
        ChartistTooltip({
          appendToBody: true,
          style : 'currency', currency : 'đ'
        })
      ]
};
var responsiveBar = [
  [
    "screen and (max-width: 640px)",
    {
      seriesBarDistance: 10,
      axisX: {
        labelInterpolationFnc: function(value) {
          return value[0];
        }
      }
    }
  ]
];
class Dashboard extends Component {


  static contextType = UserContext
  constructor(props){
    super(props);
    this.state={
      data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          series: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          ]
        },
        day:new Date().getFullYear(),
    };
    
   
    
  }
  
  componentDidMount(){
    this.props.getEmptyRoom();
    this.props.getNotEmptyRoom();
    this.props.getAllCustomerOfUser();
    this.props.getByYear(this.state.day);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.listStatistical !== prevProps.listStatistical) {
      if (this.props.listStatistical.status === dataStatus.SUCCESS) {
          let test = {
              labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "Mai",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
              ],
              series: [
                Object.values(this.props.listStatistical.data)
              ]
            }     
          this.setState({data:test})

      }
    }
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
          <Row>
            <Col md={12}>
              <Card
                id="chartActivity"
                title={"Năm "+ this.state.day} 
                category="Tổng doanh thu của tất cả nhà trọ"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.state.data}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
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
    listEmptyRoom: state.RoomReducer.listEmptyRoom,
    listNotEmptyRoom: state.RoomReducer.listNotEmptyRoom,
    //customer
    listCustomer: state.CustomerReducer.listCustomer,
    //statistical
    listStatistical: state.StatisticalReducer.listStatistical,
  };
}
export default withGlobalContext(
  connect(mapStateToProps, { getEmptyRoom,getNotEmptyRoom,getAllCustomerOfUser,getByYear})(Dashboard),
);