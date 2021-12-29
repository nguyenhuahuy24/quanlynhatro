import React from 'react';
import { Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { formatRelative } from 'date-fns/esm';
import { format } from "timeago.js";
import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react";
import customer_1 from 'assets/img/download.png'
import { URL } from 'utility/config';

import { roundToNearestMinutesWithOptions } from 'date-fns/fp';
const WrapperStyled = styled.div`
  margin-bottom: 10px;
  .author {
    margin-left: 5px;
    font-weight: bold;
  }
  .message {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  .message_own{
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    align-items: flex-end;
    margin-right:20px
  }
  .own{
    display: flex;
    flex-direction: row-reverse;
    
  }
  .bt{
   
  }
  .date {
    margin-left: 20px;
    font-size: 11px;
    color: #a7a7a7;
  }
  .content {
    margin-left:10px;
    margin-right:10px;
  }
`;

function formatDate(seconds) {
  let formattedDate = '';

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

export default function Message({ message, own }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (own === false) {
      axios.get(URL + "/customer/" + message.SenderId).then((response) => {
        setUser(response.data)
      })
    }
    axios.get(URL + "/user/", { headers: { Authorization: 'Bearer ' + localStorage.getItem("auth-token") } }).then((response) => {
      setUser(response.data)
    })
  }, []);
  return (
    <WrapperStyled  >
      <div className={own ? "message_own" : "message"}>
        <div className={own ? "own" : "bt"}>
          <Avatar src={customer_1} size='small' />
          <Typography.Text className='content'>{message.Text}</Typography.Text>
        </div>
        <div>
          <Typography.Text className='date'>
            {format(message.createdAt)}
          </Typography.Text>
        </div>
      </div>

    </WrapperStyled >
  );
}