import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "App.scss";
class VerifyEmail extends Component {

    render() {
        return(
        <div 
        style={{textAlign: "center", paddingTop:"4rem"}}>
            
            <h2 >Email đã được xác thực!</h2>
            <h3>Vui lòng cập nhật thông tin cá nhân!</h3>
          
           <Link className="btn btn-primary" to="/">Login</Link>
            

        </div>
        )
    }
}
export default VerifyEmail