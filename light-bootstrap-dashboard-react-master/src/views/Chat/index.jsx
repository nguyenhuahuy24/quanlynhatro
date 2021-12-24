import React, { Component } from "react";
// import { Grid, Row, Col } from "react-bootstrap";
import {  Row, Col } from "antd";
import 'antd/dist/antd.css';

import RoomList from './RoomList';
import ChatWindow from "./ChatWindow";
class ChatRoom extends Component {

    render() {
        return(
        <div>
            <Row>
                <Col style={{backgroundColor:"#fff"}} span={5}><RoomList/></Col>
                <Col style={{backgroundColor:"#fff"}} span={19}><ChatWindow/></Col>
            </Row>
        </div>
        )
    }
}
export default ChatRoom