import React, { Component } from "react";
import { Collapse, Typography, Button } from 'antd';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';

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
class RoomList extends Component {

  render() {
    return (
      <SidebarStyled>
        <Collapse ghost defaultActiveKey={['1']}>
          <PanelStyled header='Danh sách chat' key='1'>
            <LinkStyled>Room 1</LinkStyled>
            <LinkStyled>Room 2</LinkStyled>
            <LinkStyled>Room 3</LinkStyled>
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

    )
  }
}
export default RoomList