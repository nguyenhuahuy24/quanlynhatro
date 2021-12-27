import React, { Component } from "react";
// import { Grid, Row, Col } from "react-bootstrap";
import { Row, Col } from "antd";
import 'antd/dist/antd.css';
import axios from "axios"
import RoomList from './RoomList';
import ChatWindow from "./ChatWindow";
import { userProfile } from "../../utility/config"
class ChatRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listRoomchat: []
        };
    }

    componentDidMount() {
        const a = this.getlistRoomchat()
        this.setState({ listRoomchat: a })

    }
    async getlistRoomchat() {
        const list = await axios.get("http://localhost:8080/roomchat/" + userProfile.userId)
        return list
    }
    render() {
        console.log(this.state.listRoomchat)
        return (
            <div>
                <Row>
                    <Col style={{ backgroundColor: "#fff" }} span={5}><RoomList /></Col>
                    <Col style={{ backgroundColor: "#fff" }} span={19}><ChatWindow /></Col>
                </Row>
            </div>
        )
    }
}
export default ChatRoom