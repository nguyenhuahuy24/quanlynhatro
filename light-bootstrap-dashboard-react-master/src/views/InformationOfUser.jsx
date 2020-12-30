import React, { Component } from "react";
import { Table, Grid, Row, Col } from "react-bootstrap";
import axios from "axios";
import Card from "components/Card/Card";
import "App.scss";
import UserService from '../service/userService';


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
        this.userService = new UserService();
        this.userService.getUser().then(data => {
            if (data.Name) this.setState({ Name: data.Name });
            if (data.Image) {
                let image = `http://localhost:8080/`+data.Image
                this.setState({ Image: image })
            } else {
                this.setState({ Image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' })
            }
            if (data.Age) this.setState({ Age: data.Age });
            if (data.Phone) this.setState({ Phone: data.Phone });
        })
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
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
        fd.append("Image", this.state.selectedFile);
        fd.append("Age", this.state.Age);
        fd.append("Phone", this.state.Phone);
        
        axios.patch("http://localhost:8080/user", fd, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("auth-token")
            }
        })
            .then(response => {
                console.log(response)
                alert("Cập nhật thông tin thành công")
            })
            .catch(error => {
                alert("Cập nhật thông tin thất bại")
            });
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

} export default InformationOfUser;