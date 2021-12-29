import React, { Component } from "react";
import { Row, Col, Button, Tooltip, Avatar, Form, Input, Alert, Collapse, Typography } from "antd";
import 'antd/dist/antd.css';
import axios from "axios"
import Roomchat from './Roomchat';
import Message from './Message';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';
import { io } from 'socket.io-client';
const URL = "http://localhost:8080"
const { Panel } = Collapse
import { InputText } from 'primereact/inputtext';

class Conservation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            listRoomchat: [],
            messages: [],
            currentChat: null,
            newMessage: "",
            arriveMessage: {},
            socket: io(URL)
        };
        this.scrollRef = React.createRef()

    }

    componentDidMount() {
        this.state.socket.on("getMessage", (data) => {
            this.setState({
                arriveMessage: {
                    SenderId: data.senderId,
                    Text: data.text,
                    createdAt: Date.now(),
                }
            });
        });
        axios.get(URL + "/roomchat/" + localStorage.getItem("userIDlogin")).then((response) => {
            this.setState({ listRoomchat: response.data, currentChat: response.data[0], userId: localStorage.getItem("userIDlogin") })
        })

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentChat !== prevState.currentChat) {
            this.getMessage()
        }
        if (this.state.userId !== prevState.userId) {
            axios.get(URL + "/roomchat/" + localStorage.getItem("userIDlogin")).then((response) => {
                this.setState({ listRoomchat: response.data, currentChat: response.data[0] })
            })
            this.state.socket.emit("addUser", this.state.userId);
        }
        if (this.state.arriveMessage !== prevState.arriveMessage) {
            if (this.state.currentChat?.Members.includes(this.state.arriveMessage.SenderId)) {
                this.setState({ messages: [...this.state.messages, this.state.arriveMessage] })
            }
        }
        if (this.state.messages !== prevState.messages) {
            this.scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }
    getMessage() {
        axios.get(URL + "/message/" + this.state.currentChat._id).then((response) => {
            this.setState({ messages: response.data })
        })
    }
    handleSubmit = () => {
        if (this.state.newMessage !== "") {
            const message = {
                SenderId: localStorage.getItem("userIDlogin"),
                Roomchat: this.state.currentChat._id,
                Text: this.state.newMessage
            }
            try {
                axios.post(URL + "/message", message).then((res) => {
                    const receiverId = this.state.currentChat.Members.find(
                        (member) => member !== this.state.userId
                    );
                    this.setState({ newMessage: "", messages: [...this.state.messages, res.data] });
                    this.state.socket.emit("sendMessage", {
                        senderId: this.state.userId,
                        receiverId,
                        messageId: res.data._id
                    });
                })
            } catch (err) {
                console.log(err);
            }
        }
    }
    handleChange(event) {
        this.setState({ newMessage: event.target.value });
    }
    render() {
        return (
            <div>
                <Row>
                    <Col style={{ backgroundColor: "#fff" }} span={5}>
                        <SidebarStyled>
                            <Collapse ghost defaultActiveKey={['1']}>
                                <PanelStyled header='Danh sách các phòng' key='1'>
                                    {this.state.listRoomchat.map((value) => (
                                        <LinkStyled type="text" onClick={() => this.setState({ currentChat: value })} >
                                            <Roomchat room={value} userId={this.state.userId} />
                                        </LinkStyled>
                                    ))}
                                    <Button
                                        type='text'
                                        icon={<PlusSquareOutlined />}
                                        className='add-room'
                                    >
                                        Thêm phòng
                                    </Button>
                                </PanelStyled>
                            </Collapse>

                        </SidebarStyled>

                    </Col>
                    <Col style={{ backgroundColor: "#fff" }} span={19}>
                        <WrapperStyled  >
                            <ContentStyled>
                                <MessageListStyled >
                                    {this.state.messages.map((m) => (
                                        <div ref={this.scrollRef}>
                                            <Message message={m} own={m.SenderId === this.state.userId} />
                                        </div>
                                    ))}

                                </MessageListStyled>
                                <FormStyled>
                                    <Form.Item name='message'>
                                        <InputText
                                            placeholder='Nhập tin nhắn...'
                                            onChange={(e) => this.handleChange(e)}
                                            value={this.state.newMessage}
                                        />
                                    </Form.Item>
                                    <Button type='primary' onClick={() => { this.handleSubmit() }}>
                                        Gửi
                                    </Button>
                                </FormStyled>
                            </ContentStyled>
                        </WrapperStyled>
                    </Col>
                </Row>
            </div >
        )
    }
}
const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);
  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__title {
      margin: 0;
      font-weight: bold;
    }
    &__description {
      font-size: 13px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 90.8vh;
`;

const ContentStyled = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;


const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: black;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    
    .add-room {
      color: black;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;
const SidebarStyled = styled.div`
  border-right: 1px solid rgb(230,230,230);
  color: white;
  height: 90.8vh;
`;
export default Conservation