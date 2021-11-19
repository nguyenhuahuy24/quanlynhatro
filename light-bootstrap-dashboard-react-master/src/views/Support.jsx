import React, { Component } from "react";
import { Table, Grid, Row, Col } from "react-bootstrap";
import { Calendar } from 'primereact/calendar'
import Card from "components/Card/Card";
import { Toast } from 'primereact/toast';

export default class InformationOfUser extends Component {
    constructor(props) {
        super(props);

        
        
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
                                        <div class="header-sp">
                                            <p>TỔNG QUAN HỆ THỐNG - <a style={{fontWeight:"bold",color:"red"}}>LƯU Ý: ĐỌC KỸ 3 BƯỚC NÀY TRƯỚC KHI BẮT ĐẦU TIẾN HÀNH SỬ DỤNG PHẦN MỀM</a> </p>
                                        </div>
                                        <div>
                                            <p>Hệ thống <a style={{fontWeight:"bold",color:"black"}} >Nhà Trọ Huy - GIẢI PHÁP QUẢN LÝ NHÀ TRỌ 4.0 - SỐ 1 THỊ TRƯỜNG</a>, là hệ thống PHẦN MỀM QUẢN LÝ NHÀ TRỌ CHO THUÊ trực tuyến cho phép quản lý nhiều nhà trọ, quản lý dịch vụ linh hoạt, quản lý thông tin khách thuê, hợp đồng thuê một cách hiệu quả, khả năng tính toán xuất hoá đơn nhanh chóng.</p>
                                            <div>
                                                <p style={{marginBottom:"2px",fontWeight:"bold",color:"black"}}>3 BƯỚC CƠ BẢN SỬ DỤNG PHẦN MỀM:</p>
                                                <p style={{margin:"2px"}}>- Khai báo khởi tạo ban đầu <b><i class="fa fa-building"></i> Nhà Trọ</b></p>
                                                <p style={{margin:"2px"}}>- Quản lý thông tin <b><i class="fa fa-handshake-o"></i> Hợp Đồng</b></p>
                                                <p style={{margin:"2px"}}>- Công việc hàng tháng <b><i class="fa fa-money"></i> Hóa Đơn</b></p>
                                                
                                            </div>
                                            {/*  */}
                                            <div>
                                                <p style={{marginBottom:"2px",marginTop:"15px",fontWeight:"bold",color:"black"}}>BƯỚC 1: KHAI BÁO KHỞI TẠO BAN ĐẦU - KHAI BÁO THÔNG TIN KHU TRỌ</p>
                                                
                                            </div>
                                            <div>
                                                <p style={{marginBottom:"2px",marginTop:"15px",fontWeight:"bold",color:"black"}}>BƯỚC 2: QUẢN LÝ THÔNG TIN - KHAI BÁO HỢP ĐỒNG, KHÁCH THUÊ VÀ ĐẶT CỌC PHÒNG</p>

                                            </div>
                                            <div>
                                                <p style={{marginBottom:"2px",marginTop:"15px",fontWeight:"bold",color:"black"}}>BƯỚC 3: CÔNG VIỆC HÀNG THÁNG - NHẬP ĐIỆN NƯỚC & XUẤT HOÁ ĐƠN</p>

                                            </div>
                                        
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
