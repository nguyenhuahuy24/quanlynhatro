import React, { Component } from "react";
import { Table, Grid, Row, Col } from "react-bootstrap";
import Card from "components/Card/Card";
import "App.scss";
import { withGlobalContext } from '../GlobalContextProvider';
import { connect } from 'react-redux';
import {getUser ,changePassWord, editUser} from '../redux/action/userAction/UserAction'
import { dataStatus } from "../utility/config";

class InformationOfUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Name: "",
            Image: "",
            Age: 0,
            Phone: "",
            selectedFile: null

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
                    let image = `http://localhost:8080/`+this.props.user.data.Image
                    this.setState({ Image: image })
                } else {
                    this.setState({ Image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' })
                }
                if (this.props.user.data.Age) this.setState({ Age: this.props.user.data.Age });
                if (this.props.user.data.Phone) this.setState({ Phone: this.props.user.data.Phone });
             } 
        }
        if (this.props.editStatus !== prevProps.editStatus) {
            if (this.props.editStatus.status === dataStatus.SUCCESS) {
                 this.props.getUser();
                alert("Cập nhật thông tin thành công")
            }
            else{
                alert("Cập nhật thông tin thất bại")
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
        console.log(`test selectedFile: `,this.state.selectedFile)
        if(this.state.selectedFile !=null)
        {
            fd.append("Image", this.state.selectedFile);
        }
        fd.append("Name", this.state.Name);
        fd.append("Image", this.state.selectedFile);
        fd.append("Age", this.state.Age);
        fd.append("Phone", this.state.Phone);
        console.log(`test fd: `,fd)

        this.props.editUser(fd);
        event.preventDefault();
    }
    render() {
        
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={8} mdOffset={2}>
                            <Card
                                hCenter
                                title="Thông tin cá nhân"
                                content={
                                    <Table>
                                        <div className="form-group">
                                        <label >Họ và tên</label>
                                            <input
                                                className="form-control"
                                                type="Name"
                                                name="Name"
                                                placeholder="Họ và tên"
                                                value={this.state.Name}
                                                onChange={this.handleChange}
                                                required />
                                        </div>

                                        <div className="form-group">
                                        <label >Tuổi</label>
                                            <input
                                                className="form-control"
                                                type="Age"
                                                name="Age"
                                                placeholder="Tuổi"
                                                value={this.state.Age}
                                                onChange={this.handleChange}
                                                required />
                                        </div>
                                        <div className="form-group">
                                        <label >Số điện thoại</label>
                                            <input
                                                className="form-control"
                                                type="Phone"
                                                name="Phone"
                                                placeholder="Số điện thoại"
                                                value={this.state.Phone}
                                                onChange={this.handleChange}
                                                required />
                                        </div>

                                        <div className="form-group">
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
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"
                                            onClick={this.handleSubmit}
                                        >
                                            Cập nhập thông tin</button>
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