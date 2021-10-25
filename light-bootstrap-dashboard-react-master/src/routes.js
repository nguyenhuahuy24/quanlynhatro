
import Dashboard from "views/Dashboard.jsx";
import PhongTro from "views/PhongTro.jsx";
import Nha from "views/Nha.jsx";
import KhachThue from "views/KhachThue.jsx";
import Changpass from "views/Upgrade.jsx";
import Dien from "views/Dien.jsx";
import DichVu from "views/DichVu.jsx";
import HopDong from "views/HopDong.jsx";
import TinhTien from "views/TinhTien.jsx";
import InformationOfUser from "views/InformationOfUser.jsx"

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Thống kê",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/house",
    name: "Nhà",
    icon: "pe-7s-home",
    component: Nha,
    layout: "/admin"
  },
  {
    path: "/room",
    name: "Phòng Trọ",
    icon: "pe-7s-culture",
    component: PhongTro,
    layout: "/admin"
  },
  {
    path: "/dichvu",
    name: "Dịch Vụ",
    icon: "pe-7s-box2",
    component: DichVu,
    layout: "/admin"
  },
  {
    path: "/dien",
    name: "Chỉ số Điện/Nước",
    icon: "pe-7s-gleam",
    component: Dien,
    layout: "/admin"
  },
  {
    path: "/tinhtien",
    name: "Tính tiền",
    icon: "pe-7s-cash",
    component: TinhTien,
    layout: "/admin"
  },
  {
    path: "/khachthue",
    name: "Khách Thuê",
    icon: "pe-7s-users",
    component: KhachThue,
    layout: "/admin"
  },
  {
    path: "/hopdong",
    name: "Hợp Đồng",
    icon: "pi pi-book",
    component: HopDong,
    layout: "/admin"
  },
  {
    path: "/changpass",
    name: "Đổi mật khẩu",
    icon: "pe-7s-config",
    component: Changpass,
    layout: "/admin"
  },
  {
    path: "/info",
    name: "Thông tin cá nhân",
    icon: "pe-7s-user",
    component: InformationOfUser,
    layout: "/admin"
  }

];
export default dashboardRoutes;
