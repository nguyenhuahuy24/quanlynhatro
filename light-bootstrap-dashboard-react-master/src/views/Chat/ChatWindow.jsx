import React, { Component } from "react";
import { UserAddOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Button, Tooltip, Avatar, Form, Input, Alert } from 'antd';
import Message from './Message';
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
class ChatWindow extends Component {

    render() {
        return(
           <WrapperStyled>
               
          <ContentStyled>
            <MessageListStyled >
                <Message
                  //key={mes.id}
                  text="Text"
                  photoURL={null}
                  displayName="Huy"
                  createdAt={"5 giờ trước"}
                />
                <Message
                  //key={mes.id}
                  text="Vui ve"
                  photoURL={null}
                  displayName="tung"
                  createdAt={"2 phút trước"}
                />
                <Message
                  //key={mes.id}
                  text="Text 123"
                  photoURL={null}
                  displayName="Huy"
                  createdAt={"1 giây trước"}
                />
              
                
               

           
            </MessageListStyled>
            <FormStyled>
              <Form.Item name='message'>
                <Input
                  
                  placeholder='Nhập tin nhắn...'
                  bordered={false}
                  autoComplete='off'
                />
              </Form.Item>
              <Button type='primary'>
                Gửi
              </Button>
            </FormStyled>
          </ContentStyled>
    </WrapperStyled>
        )
    }
}
export default ChatWindow