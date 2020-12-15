
import Dashboard from "views/Dashboard.jsx";
import PhongTro from "views/PhongTro.jsx";
import Nha from "views/Nha.jsx";
import KhachThue from "views/KhachThue.jsx";
import Changpass from "views/Upgrade.jsx";
import Dien from "views/Dien.jsx";
import Nuoc from "views/Nuoc.jsx";
import DichVu from "views/DichVu.jsx";
import TinhTien from "views/TinhTien.jsx";
import Icons from "views/Icons.jsx";

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
    name: "Chỉ số Điện",
    icon: "pe-7s-gleam",
    component: Dien,
    layout: "/admin"
  },
  {
    path: "/nuoc",
    name: "Chỉ số Nước",
    icon: "pe-7s-drop",
    component: Nuoc,
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
    icon: "pe-7s-user",
    component: KhachThue,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Hóa đơn",
    icon: "pe-7s-news-paper",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/changpass",
    name: "Đổi mật khẩu",
    icon: "pe-7s-config",
    component: Changpass,
    layout: "/admin"
  }
];
export default dashboardRoutes;
