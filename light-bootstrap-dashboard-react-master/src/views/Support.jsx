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
                                        <div class="body-sp">
                                            <p>Hệ thống <a style={{fontWeight:"bold",color:"black"}} >Nhà Trọ Huy </a>, là hệ thống PHẦN MỀM QUẢN LÝ NHÀ TRỌ CHO THUÊ trực tuyến cho phép quản lý nhiều nhà trọ, quản lý dịch vụ linh hoạt, quản lý thông tin khách thuê, hợp đồng thuê một cách hiệu quả, khả năng tính toán xuất hoá đơn nhanh chóng.</p>
                                            <div>
                                                <p style={{marginBottom:"2px",fontWeight:"bold",color:"black"}}>3 BƯỚC CƠ BẢN SỬ DỤNG PHẦN MỀM:</p>
                                                <p style={{margin:"2px"}}>- Khai báo khởi tạo ban đầu <b><i class="fa fa-building"></i> Nhà Trọ</b></p>
                                                <p style={{margin:"2px"}}>- Quản lý thông tin <b><i class="fa fa-handshake-o"></i> Hợp Đồng</b></p>
                                                <p style={{margin:"2px"}}>- Công việc hàng tháng <b><i class="fa fa-money"></i> Hóa Đơn</b></p>
                                                
                                            </div>
                                            {/*  */}
                                            <div class="form-step">
                                                <p style={{marginBottom:"2px",marginTop:"15px",fontWeight:"bold",color:"black"}}>BƯỚC 1: KHAI BÁO KHỞI TẠO BAN ĐẦU - KHAI BÁO THÔNG TIN KHU TRỌ</p>
                                                 <p>
                                                    Để có thể bắt đầu bạn cần phải khai báo địa chỉ nhà trọ tại  <a style={{fontWeight:"bold",color:"black"}} >NHÀ </a> , sau đó khai báo thông tin phòng tại <a style={{fontWeight:"bold",color:"black"}}>PHÒNG </a> , và cuối cùng là điều chỉnh dịch vụ tại  <a style={{fontWeight:"bold",color:"black"}} >DỊCH VỤ </a>
                                                </p>
                                                <div class="col-md-4 sp">
                                                        <div class="radius">1</div>
                                                        <div class="title-radius" style={{fontWeight:"bold",fontSize:"20px",color:"#26C281"}}><i class="fa fa-building"></i>NHÀ</div>
                                                         <div class="" style={{color:"#26C281"}} >Khai báo địa chỉ nhà trọ, cấu hình ban đầu</div>
                                                </div>
                                                <div class="col-md-4 sp">
                                                        <div class="radius-2" >2</div>
                                                        <div class="title-radius" style={{fontWeight:"bold",fontSize:"20px",color:"#E7505A"}}><i class="fa fa-bed"></i> PHÒNG</div>
                                                         <div class="" style={{color:"#E7505A"}} >Tạo phòng, quản lý phòng, giá phòng</div>
                                                </div>
                                                <div class="col-md-4 sp">
                                                        <div class="radius-3" >3</div>
                                                        <div class="" style={{fontWeight:"bold",fontSize:"20px",color:"#3d3d29"}}><i class="fa fa-cloud"></i> DỊCH VỤ</div>
                                                         <div class="" style={{color:"#3d3d29"}} >Quản lý dịch vụ, điều chỉnh giá, trạng thái dịch vụ</div>
                                                </div>
                                            </div>
                                            <div class="form-step">
                                                <p style={{marginBottom:"2px",marginTop:"10px",fontWeight:"bold",color:"black"}}>BƯỚC 2: QUẢN LÝ THÔNG TIN - KHAI BÁO HỢP ĐỒNG, KHÁCH THUÊ VÀ ĐẶT CỌC PHÒNG</p>
                                                <p>
                                                    Tiếp theo bạn cần làm là quản lý thông tin khách thuê tại <a style={{fontWeight:"bold",color:"black"}} >KHÁCH THUÊ </a> sau đó: Thiết lập hợp đồng cho khách thuê tại <a style={{fontWeight:"bold",color:"black"}} >HỢP ĐỒNG </a>
                                                </p>
                                                
                                                <div class="col-md-6 sp">
                                                        <div class="radius">1</div>
                                                        
                                                         <div class="title-radius-2" style={{fontWeight:"bold",fontSize:"20px",color:"#26C281"}}><i class="fa fa-group"></i> KHÁCH THUÊ</div>
                                                         <div class="" style={{color:"#26C281"}} >Quản lý thông tin khách thuê</div>
                                                </div>
                                                <div class="col-md-6 sp">
                                                        <div class="radius-2" >2</div>
                                                        <div class="" style={{fontWeight:"bold",fontSize:"20px",color:"#E7505A"}}><i style={{paddingRight:"25px"}} class="fa fa-handshake-o"></i> HỢP ĐỒNG</div>
                                                         <div class="" style={{color:"#E7505A"}} >Quản lý thông tin hợp đồng thuê phòng</div>
                                                </div>
                                                
                                            </div>
                                            <div class="form-step" >
                                                <p style={{marginBottom:"2px",fontWeight:"bold",color:"black"}}>BƯỚC 3: CÔNG VIỆC HÀNG THÁNG - NHẬP ĐIỆN NƯỚC & XUẤT HOÁ ĐƠN</p>
                                                <p>Công việc hàng tháng của bạn rất đơn giản. Bạn chỉ cần nhập chỉ số điện nước, sau đó tiến hành xuất hoá đơn, hệ thống sẽ tự động tính tiền hàng tháng.</p>
                                                <p>- Nhập chỉ số điện nước tại <a style={{fontWeight:"bold",color:"black"}} >CHỈ SỐ ĐIỆN/NƯỚC</a> </p>
                                                <p>- Sau đó tính tiền và gửi thông báo cho hóa đơn cho khách thuê tại <a style={{fontWeight:"bold",color:"black"}} >HÓA ĐƠN</a> </p>
                                                <div class="col-md-6 sp">
                                                        <div class="radius">1</div>
                                                        <div class="title-radius-2" style={{fontWeight:"bold",fontSize:"20px",color:"#26C281"}}><i class="fa fa-plug"></i> ĐIỆN NƯỚC</div>
                                                         <div class="" style={{color:"#26C281"}} >Nhập chỉ số điện nước</div>
                                                </div>
                                                <div class="col-md-6 sp">
                                                        <div class="radius-2" >2</div>
                                                        <div class="" style={{fontWeight:"bold",fontSize:"20px",color:"#E7505A"}}><i class="fa fa-money"></i> HÓA ĐƠN HÀNG THÁNG</div>
                                                         <div class="" style={{color:"#E7505A"}} >Tạo hóa đơn, gửi thông báo tính tiền</div>
                                                </div>
                                               
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
