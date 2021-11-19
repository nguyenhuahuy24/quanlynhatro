import React, { Component } from "react";
import "../assets/css/maicons.css";
import "../assets/css/bootstrap1.css";

import logo from 'assets/img/logo_1.png'
import logo1 from 'assets/img/Welcomel_1.png'
import bills from 'assets/img/icon/bills.png'
import time from 'assets/img/icon/sand-clock.png'
import building from 'assets/img/icon/building.png'
import deal from 'assets/img/icon/deal.png'
import group from 'assets/img/icon/group.png'
import money from 'assets/img/icon/money.png'
import contract from 'assets/img/icon/contract.png'
import email from 'assets/img/icon/email.png'
import call from 'assets/img/icon/phone-call.png'
import support from 'assets/img/icon/support.png'
import plug from 'assets/img/icon/plug.png'
import poll from 'assets/img/icon/poll.png'
import verified from 'assets/img/icon/verified.png'
import wifi from 'assets/img/icon/wifi-signal.png'
import user from 'assets/img/icon/user.png'
import customer from 'assets/img/icon/people.png'
import customer_1 from 'assets/img/icon/group_1.png'
import remove from 'assets/img/icon/remove-user.png'

import HomeNavbar from '../components/Navbars/HomeNavbar'
import Footer from '../components/Navbars/FooterNavbar'

export default class Home extends Component {

   

    render() {
    return ( 
    <div >
    {/* <div class="back-to-top"></div> */}
      <HomeNavbar/>      
      <div class="page-banner home-banner">
   
          <img class="img-banner" src={logo1}></img>

        
      </div> 
    {/* body */}
      <div class="page-section">
        <div class="container-home">
          <div class="text-center">
            <div class="subhead">Bạn đang kinh doanh Nhà trọ? </div>
            <h2 class="title-section">Cho thuê nhà trọ, căn hộ là loại hình kinh doanh khá hấp dẫn vì có tiềm năng lớn, nhu cầu cao, doanh thu ổn định và an toàn. Tuy nhiên, lĩnh vực kinh doanh này cũng có khá nhiều khó khăn khiến không ít chủ trọ, chủ căn hộ phải đối mặt với nhiều rủi ro về tài chính cũng như hiệu quả quản lý.</h2>
          </div>

          <div class="row_home justify-content-center">
            <div class="col-md-6 col-lg-3 col-xl-3 py-3 mb-3 card-text">
              <div class="text-center">
                <div class="img-fluid mb-4">
                  <img class="img-icon" src={time} alt="" />
                </div>
                <h4 class="card-title">Thời gian</h4>
                <h5 class="card-title-body">Bạn tốn nhiều thời gian cho việc giám sát, quản lý cơ sở, khách thuê, chi phí.</h5>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 col-xl-3 py-3 mb-3 card-text">
              <div class="text-center">
                <div class="img-fluid mb-4">
                  <img class="img-icon" src={bills} alt=""/>
                </div>
                  <h4 class="card-title">Chi phí</h4>
                <h5 class="card-title-body">Bạn đau đầu vì có quá nhiều chi phí phát sinh trong quá trình kinh doanh.</h5>
            
              </div>
            </div>

            <div class="col-md-6 col-lg-3 col-xl-3 py-3 mb-3 card-text">
              <div class="text-center">
                <div class="img-fluid mb-4">
                  <img class="img-icon" src={user} alt=""/>
                </div>
                  <h4 class="card-title">Công tác Quản lý</h4>
                <h5 class="card-title-body">Bạn đau đầu khi suốt ngày phải đi xử lý sự cố, hợp đồng, các thủ tục pháp lý, hóa đơn.</h5>
            
              </div>
            </div>

            <div class="col-md-6 col-lg-3 col-xl-3 py-3 mb-3 card-text">
              <div class="text-center">
                <div class="img-icon" class="img-fluid mb-4">
                  <img class="img-icon" src={deal} alt=""/>
                </div>
                  <h4 class="card-title">Rủi ro Quản lý</h4>
                <h5 class="card-title-body">Tình trạng khó khăn trong việc quản lý các khoản hóa đơn, có thể thất thoát tiền bạc trong việc tính toán.</h5>
            
              </div>
            </div>

            <div class="col-md-6 col-lg-3 col-xl-3 py-3 mb-3 card-text">
              <div class="text-center">
                <div class="img-fluid mb-4">
                  <img class="img-icon" src={customer}  alt=""/>
                </div>
                  <h4 class="card-title">Khách thuê</h4>
                <h5 class="card-title-body">Bạn cần có một quy trình quản lý khách thuê chuyên nghiệp, hiệu quả để tạo mối quan hệ lâu dài với họ.</h5>
            
              </div>
            </div>

            <div class="col-md-6 col-lg-3 col-xl-3 py-3 mb-3 card-text">
              <div class="text-center">
                <div class="img-fluid mb-4">
                  <img class="img-icon" src={remove} alt=""/>
                </div>
                  <h4 class="card-title">Hiệu quả kinh doanh</h4>
                <h5 class="card-title-body">Công việc quản lý đảm bảo tính chính xác, hiệu quả để đảm bảo quyền lợi cả hai bên và tối ưu hóa được doanh thu.</h5>
            
              </div>
            </div>

          

          </div>
        </div> 
      </div> 
        {/* ---------2----- */}
        <div class="page-section-1">
        <div class="container">
          <div class="text-center">
            <div class="subhead">Các vấn đề chủ trọ thường hay mắc phải</div>
            <h2 class="title-section">Công việc quản lý nhà trọ, căn hộ chiếm tỷ lệ không hề nhỏ trong hiệu quả của các chuỗi nhà trọ, căn hộ. Nhưng để quản lý hiệu quả không phải chuyện đơn giản.</h2>
          </div>

          <div class="row_home justify-content-center">
            <div class="col-md-8 col-lg-4 col-xl-2 py-3 mb-3 card-text">
              <div class="text-center">
                <div class="img-fluid mb-4">
                  <img class="img-icon-2" src={building} alt=""/>
                </div>
                <h4 class="card-title">Cơ sở vật chất</h4>
                <h5 class="card-title-body">Với quy mô các tòa nhà, số phòng lớn bạn cần quá nhiều thời gian công sức để quản lý lưu trữ cũng như tìm kiếm thông tin dữ liệu.</h5>
              </div>
            </div>
            <div class="col-md-8 col-lg-4 col-xl-2 py-3 mb-3 card-text">
              <div class="text-center">
                <div class="img-fluid mb-4">
                  <img class="img-icon-2" src={contract} alt=""/>
                </div>
                  <h4 class="card-title">Hợp đồng</h4>
                <h5 class="card-title-body">Quy trình làm việc rời rạc với từng khách thuê, đặc biệt khi có thay đổi về thông tin khá phức tạp và mất thời gian trong việc quản lý.</h5>
            
              </div>
            </div>

            <div class="col-md-8 col-lg-4 col-xl-2 py-3 mb-3 card-text">
              <div class="text-center">
                <div class="img-fluid mb-4">
                  <img class="img-icon-2" src={money} alt=""/>
                </div>
                  <h4 class="card-title">Hóa đơn</h4>
                <h5 class="card-title-body">Việc triển tính tiền tạo hóa đơn, thanh toán mất nhiều quỹ thời gian tính toán, xử lý và truy thu, sai sót và thất thoát.</h5>
            
              </div>
            </div>
            <div class="col-md-8 col-lg-4 col-xl-2 py-3 mb-3 card-text">
              <div class="text-center">
                <div class="img-fluid mb-4">
                  <img class="img-icon-2" src={poll} alt=""/>
                </div>
                  <h4 class="card-title">Báo cáo</h4>
                <h5 class="card-title-body">Chưa theo dõi một cách tổng quan về tình hình kinh doanh, lịch sử khách thuê, hợp đồng, hóa đơn.</h5>
            
              </div>
            </div>
            <div class="col-md-8 col-lg-4 col-xl-2 py-3 mb-3 card-text">
              <div class="text-center">
                <div class="img-fluid mb-4">
                  <img class="img-icon-2" src={group} alt=""/>
                </div>
                  <h4 class="card-title">Khách thuê</h4>
                <h5 class="card-title-body">Khách thuê đông, thông tin lưu trữ nhiều dễ thật lạc, khó tìm kiếm.</h5>
            
              </div>
            </div>
          </div>
        </div> 
      </div> 
      {/* --------3--------- */}
        <div class="page-section">
        <div class="container">
          <div class="text-center">
            <div class="subhead">Nhà Trọ Huy được thiết kế tối ưu</div>
            <h2 class="title-section">Chúng tôi nghiên cứu thiết kế phần mềm quản lý nhà trọ tối ưu phù hợp với nhiều mô hình quản lý khác nhau, với nhiều tính năng nổi bật.</h2>
          </div>

          <div class="row_home justify-content-center">
            <div class="col-md-6 col-lg-4 col-xl-3 py-3 mb-3 card-text-2">
              <div class="text-center">
                <div class="img-fluid mb-4">
                  <img class="img-icon" src={customer_1} alt=""/>
                </div>
                <h4 class="card-title">Quản lý khách thuê</h4>
                <h5 class="card-title-body">Chức năng quản lý thông tin khách thuê, gồm các thông tin cá nhân, thông tin liên hệ.</h5>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 col-xl-3 py-3 mb-3 card-text-2">
              <div class="text-center">
                <div class="img-fluid mb-4">
                  <img class="img-icon" src={contract} alt=""/>
                </div>
                  <h4 class="card-title">Quản lý hợp đồng</h4>
                <h5 class="card-title-body">Chức năng quản lý thông tin hợp đồng thuê nhà, gồm phòng, khách thuê, dịch vụ, tiền đặt cọc …</h5>
            
              </div>
            </div>

            <div class="col-md-6 col-lg-3 col-xl-3 py-3 mb-3 card-text-2">
              <div class="text-center">
                <div class="img-fluid mb-4">
                  <img class="img-icon" src={wifi} alt=""/>
                </div>
                  <h4 class="card-title">Quản lý dịch vụ</h4>
                <h5 class="card-title-body">Chức năng quản lý hóa đơn thu tiền hằng tháng, gồm các chi phí như điện, nước, dịch vụ.</h5>
            
              </div>
            </div>

            <div class="col-md-6 col-lg-3 col-xl-3 py-3 mb-3 card-text-2">
              <div class="text-center">
                <div class="img-fluid mb-4">
                  <img class="img-icon" src={money} alt=""/>
                </div>
                  <h4 class="card-title">Quản lý hóa đơn</h4>
                <h5 class="card-title-body">Chức năng quản lý số điện nước của từng phòng theo từng tháng, tự động tính toán tiền phải trả.</h5>
            
              </div>
            </div>

            <div class="col-md-6 col-lg-3 col-xl-3 py-3 mb-3 card-text-2">
              <div class="text-center">
                <div class="img-fluid mb-4">
                  <img class="img-icon" src={plug} alt=""/>
                </div>
                  <h4 class="card-title">Quản lý số điện/nước</h4>
                <h5 class="card-title-body">Bạn cần có một quy trình quản lý khách thuê chuyên nghiệp, hiệu quả để tạo mối quan hệ lâu dài với họ.</h5>
            
              </div>
            </div>

            <div class="col-md-6 col-lg-3 col-xl-3 py-3 mb-3 card-text-2">
              <div class="text-center">
                <div class="img-fluid mb-4">
                  <img class="img-icon" src={verified} alt=""/>
                </div>
                  <h4 class="card-title">Quản lý phòng</h4>
                <h5 class="card-title-body">Chức năng quản lý thông tin phòng theo từng khu, tiền phòng của phần mềm quản lý nhà trọ.</h5>
            
              </div>
            </div>

          

          </div>
        </div> 
      </div> 

        <div class="page-section">
        <div class="container">
          <div class="text-center">
            <div class="subhead">Đồng hành 24/7 cùng công việc quản lý nhà trọ của bạn</div>
            <h2 class="title-section">Chúng tôi luôn cố gắng tạo ra môi trường làm việc chuyên nghiệp, sáng tạo và kỷ luật cao. Đội ngũ kỹ sư trẻ giàu nhiệt huyết luôn sẵn sàng hỗ trợ bạn suốt 24/7, phần mềm quản lý nhà trọ luôn được phát triển hàng ngày.</h2>
          </div>

          <div class="row_home justify-content-center">
            <div class="col-md-6 col-lg-3 col-xl-3 py-3 mb-3 card-text-3">
              <div class="text-center">
                <div class="img-fluid mb-4">
                  <img class="img-icon" src={support} alt=""/>
                </div>
                <h4 class="card-title">Hỗ trợ</h4>
                <h5 class="card-title-body">Đội ngũ hỗ trợ chuyên nghiệp, nhiệt tình, sáng tạo luôn sẵn sàng phục vụ khách hàng 24/7.</h5>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 col-xl-3 py-3 mb-3 card-text-3">
              <div class="text-center">
                <div class="img-fluid mb-4">
                  <img class="img-icon" src={call} alt=""/>
                </div>
                  <h4 class="card-title">09xxxxxxxx</h4>
                <h5 class="card-title-body">Tổng đài tư vấn miễn phí dành cho khách hàng. Hãy gọi cho chúng tôi ngay khi lúc nào bạn cần.</h5>
            
              </div>
            </div>

            <div class="col-md-6 col-lg-3 col-xl-3 py-3 mb-3 card-text-3">
              <div class="text-center">
                <div class="img-fluid mb-4">
                  <img class="img-icon" src={email} alt=""/>
                </div>
                  <h5 class="card-title">nhatro.huy@gmail.com</h5>
                <h5 class="card-title-body">Mọi yêu cầu của khách hàng gửi về email, đều được giải quyết và trả lời một cách nhanh nhất.</h5>
            
              </div>
            </div>
          </div>
        </div> 
      </div> 
   
      {/* footer */}
    <Footer />





    </div>
   

   
  )
  }
}