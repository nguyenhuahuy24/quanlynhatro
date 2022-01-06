import React, { Component } from "react";
import { Table, Grid, Row, Col } from "react-bootstrap";
import { Calendar } from 'primereact/calendar'
import Card from "components/Card/Card";
import { Toast } from 'primereact/toast';
import "App.scss";
import { withGlobalContext } from '../GlobalContextProvider';
import { connect } from 'react-redux';
import {getUser ,changePassWord, editUser} from '../redux/action/userAction/UserAction'
import { dataStatus,URL } from "../utility/config";

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';

class InformationOfUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Name: "",
            Image: "",
            Age: 0,
            Phone: "",
            selectedFile: "",
            PermanentAddress:"",
            Cmnd:"",
            DateCmnd:"",
            PlaceCmnd:"",

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }
    componentDidMount(){
        this.props.getUser();
    }
    componentDidUpdate(prevProps){
        if (this.props.user !== prevProps.user) {
            if (this.props.user.status === dataStatus.SUCCESS) {
                if (this.props.user.data.Name) this.setState({ Name: this.props.user.data.Name });
                if (this.props.user.data.Image) {
                    let image = `${URL}`+this.props.user.data.Image
                    this.setState({ Image: image })
                } else {
                    this.setState({ Image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' })
                }
                if (this.props.user.data.Age) this.setState({ Age: new Date(this.props.user.data.Age) });
                if (this.props.user.data.Phone) this.setState({ Phone: this.props.user.data.Phone });
                if (this.props.user.data.PermanentAddress) this.setState({ PermanentAddress: this.props.user.data.PermanentAddress });
                if (this.props.user.data.Cmnd) this.setState({ Cmnd: this.props.user.data.Cmnd });
                if (this.props.user.data.DateCmnd) this.setState({ DateCmnd: new Date(this.props.user.data.DateCmnd) });
                if (this.props.user.data.PlaceCmnd) this.setState({ PlaceCmnd: this.props.user.data.PlaceCmnd });
             } 
        }
        if (this.props.editStatus !== prevProps.editStatus) {
            if (this.props.editStatus.status === dataStatus.SUCCESS) {
                 this.props.getUser();
                 this.toast.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Cập nhật thành công",
                    life: 2500
                });
            }
            else{
                this.toast.show({
                    severity: "error",
                    summary: "Fail",
                    detail: "Cập nhật thất bại",
                    life: 3000
                });
            }
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleImageChange(e) {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({ Image: reader.result })
            }
        }
        reader.readAsDataURL(e.target.files[0])
        this.setState({ selectedFile: e.target.files[0] })
    }
    handleSubmit(event) {
        const fd = new FormData()

        fd.append("Name", this.state.Name);
        if(this.state.selectedFile!=""){
            fd.append("Image", this.state.selectedFile);
        }
        fd.append("Age", this.state.Age);
        fd.append("Phone", this.state.Phone);
        fd.append("PermanentAddress", this.state.PermanentAddress);
        fd.append("Cmnd", this.state.Cmnd);
        fd.append("DateCmnd", this.state.DateCmnd);
        fd.append("PlaceCmnd", this.state.PlaceCmnd);
        this.props.editUser(fd);
        event.preventDefault();
    }
    render() {
        
        return (
            
            <div className="content">
            <Toast ref={(el) => (this.toast = el)} />
                <Grid fluid>
                    <Row>
                        <Col>
                            <Card
                                content={
                                    <Table>
                                        <div className="form-group">
                                            <div className="col-md-10">
                                                 <label >Họ và tên</label>
                                            <input
                                                className="form-control"
                                                type="Name"
                                                name="Name"
                                         
                                                value={this.state.Name}
                                                onChange={this.handleChange}
                                                required />
                                            </div>
                                            <div className="col-md-2">
                                                  <label >Ngày Sinh</label>
                                            <div>
                                                <Calendar 
                                                    id="navigatorstemplate"
                                                    monthNavigator 
                                                    yearNavigator 
                                                    dateFormat="dd/mm/yy"
                                                    yearRange="1950:2010"
                                                    value={this.state.Age}
                                                    onChange={(e) => this.setState({ Age: e.value })} 
                                                    showIcon />
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-6">
                                                <label >Số điện thoại</label>
                                            <input
                                                className="form-control"
                                                type="Phone"
                                                name="Phone"
                                                
                                                value={this.state.Phone}
                                                onChange={this.handleChange}
                                                required />
                                            </div>
                                            <div className="col-md-6">
                                                <label >Số CMND/CCCD</label>
                                            <input
                                                className="form-control"
                                                type="Cmnd"
                                                name="Cmnd"
                                             
                                                value={this.state.Cmnd}
                                                onChange={this.handleChange}
                                                required />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                         
                                            <div className="col-md-10">
                                                <label >Nơi Cấp</label>
                                            <input
                                                className="form-control"
                                                type="PlaceCmnd"
                                                name="PlaceCmnd"
                                               
                                                value={this.state.PlaceCmnd}
                                                onChange={this.handleChange}
                                                required />
                                            </div>
                                               <div className="col-md-2">
                                                <label >Ngày cấp</label>
                                                <div>
                                                <Calendar 
                                                    id="navigatorstemplate"
                                                    monthNavigator 
                                                    yearNavigator
                                                    dateFormat="dd/mm/yy" 
                                                    yearRange="1950:2010"
                                                    value={this.state.DateCmnd}
                                                    onChange={(e) => this.setState({ DateCmnd: e.value })} 
                                                    showIcon />
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                    
                                                <label >Hộ Khẩu thường trú</label>
                                            <input
                                                className="form-control"
                                                type="PermanentAddress"
                                                name="PermanentAddress"
                                             
                                                value={this.state.PermanentAddress}
                                                onChange={this.handleChange}
                                                required />
                                          
                            
                                        </div>
                                        <div className="col-md-12">
                                            <label >Hình ảnh</label>
                                            <input
                                                id="Image"
                                                className="fileInput"
                                                type="file"
                                                onChange={(e) => this.handleImageChange(e, "Image")}
                                            />
                                            <div className="img-holder">
                                                <img src={this.state.Image} alt="" id="img" className="img" />
                                                {/* `http://localhost:8080/`+ this.state.room.Image */}
                                            </div>
                                        </div>
                                        <div className="btn1">
                                            <button
                                            type="submit"
                                            className="btn2"
                                            onClick={this.handleSubmit}
                                        >
                                            Cập nhập thông tin</button>
                                        </div>
                                        
                                    </Table>
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
    user: state.UserReducer.user,
    changPasswordStatus: state.UserReducer.changPasswordStatus,
    editStatus: state.UserReducer.editStatus,
  };
}
export default withGlobalContext(
  connect(mapStateToProps, { getUser ,changePassWord, editUser})(InformationOfUser),
);