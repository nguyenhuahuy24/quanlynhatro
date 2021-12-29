import React, { Component } from "react";
import { Collapse, Typography, Button } from 'antd';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';
import axios from "axios";
import { URL } from "utility/config";
const { Panel } = Collapse
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
class Roomchat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customer: {}
    };
  }
  componentDidMount() {
    const customerid = this.props.room.Members.find((m) => m !== this.props.userId);
    axios.get(URL + "/customer/" + customerid).then((response) => {
      this.setState({ customer: response.data })
    })
  }
  render() {
    return (
      <>
        <p>{this.state.customer.Name}</p>
      </>

    )
  }
}
export default Roomchat