import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from 'primereact/inputnumber';
import UtilityBillService from '../service/utilityBillService';
import NhaTroService from '../service/nhatroService';
import PhongTroService from '../service/phongtroService';
import '../index.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import '../index.css';
import UserContext from "../context/UserContext";
class Dien extends Component {
  static contextType = UserContext
  emptyDien = {
    Time: new Date(),
    ElectricNumber: 0,
    WaterNumber: 0,
    RoomId: ""
  };
  emtyHouse = {
    Name: ""
  }
  constructor(props) {
    super(props);

    this.state = {
      TimeHD: new Date(),
      rooms: null,
      houses: null,
      Diens: null,
      Dien: this.emptyDien,
      //  loginuserID: localStorage.getItem("userIDlogin"),
      submitted: false,
      selectedShowHouse: null,
      selectedHouse: "",
      selectedRoom: "",
      selectedShowRoom: null,
      selectedMonth: null,
      test: [],
    };

    this.utilityService = new UtilityBillService();
    this.nhatroService = new NhaTroService();
    this.phongtroService = new PhongTroService();
    this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    this.saveDien = this.saveDien.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.onHouseChange = this.onHouseChange.bind(this);
    this.onRoomChange = this.onRoomChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.openNew = this.openNew.bind(this);

  }
  componentDidMount() {
    const { userData, setUserData } = this.context;
    this.nhatroService
      .getHouseByUserId(userData.user)
      .then(data => this.setState({ houses: data }));
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedHouse !== this.state.selectedHouse) {
      const { userData, setUserData } = this.context;
      this.utilityService
        .getAllUtilityBillByHouseId(this.state.selectedHouse, userData.user)
        .then(response => {
          this.setState({ Diens: response });
          //test
          const rooms = Object.values(response)[0];
         
          let data = [];
          rooms.forEach(room => {
            if (room.ListUtilityBill.length !== 0) {
              data.push({
                Id: room.ListUtilityBill[0]._id,
                RoomNumber: room.RoomNumber,
                WaterNumber: room.ListUtilityBill[0].WaterNumber,
                ElectricNumber: room.ListUtilityBill[0].ElectricNumber
              })
            }
          })
          console.log(data)
          this.setState({ test: { ...data } })
        }).catch(err => console.log(err));
      this.phongtroService
        .getRoomByHouseId(this.state.selectedHouse)
        .then(data => this.setState({ rooms: data }));
    }
    this.state.Dien.Time = this.state.selectedMonth;
      this.state.Dien.RoomId = this.state.selectedRoom;
  }
  // searchTime(){
  //   this.utilityService
  //     .getAllUtilityBillByHouseId(this.state.selectedHouse,userData.user,this.state.emptyDien.Time)
  //     .then(data => this.setState({ Diens: data }));
  // }
  saveDien() {
    let state = { submitted: true };
    console.log(this.state.Dien)
    let Dien = { ...this.state.Dien };
    this.utilityService.createUtilityBill(Dien).then();
    // Diens[index] = Dien;
    this.toast.show({
      severity: "success",
      summary: "Thành công",
      detail: "Nhập chỉ số điện",
      life: 3000
    });
    //  }
    state = {
      ...state,
      DienDialog: false,
      Dien: this.emptyDien
    };
    this.setState(state);
  }
  onInputNumberChange(e, name) {
    const val = e.value || 0;
    let Dien = { ...this.state.Dien };
    Dien[`${name}`] = val;

    this.setState({ Dien });
  }
  onHouseChange(e) {
    this.setState({ selectedHouse: e.value._id, selectedShowHouse: e.value, });
  }
  onRoomChange(e) {
    this.setState({ selectedRoom: e.value._id, selectedShowRoom: e.value });
  }
  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <h4 className="p-m-0">Chỉ số Điện/Nước</h4>
      </React.Fragment>
    );
  }
  rightToolbarTemplate() {
    return (
      <React.Fragment>
        <Button
          label="Xuất file excel"
          icon="pi pi-file-o"
          className="p-button-warning p-mr-2"
          onClick={""}
        />
      </React.Fragment>
    );
  }
  openNew() {
    this.setState({
      Dien: this.emptyDien,
      submitted: false,
      DienDialog: true
    });
  }
  hideDialog() {
    this.setState({
      submitted: false,
      DienDialog: false
    });
  }
  render() {

    const header = (
      <div className="table-header">
        <span className="p-input-icon-right">
          <Dropdown
            className="p-mr-2"
            value={this.state.selectedShowHouse}
            options={this.state.houses}
            onChange={this.onHouseChange}
            optionLabel="Name"
            placeholder="Chọn nhà trọ"
          />
          <label className="p-mr-2">Tháng/Năm </label>
          <Calendar
            id="monthpicker"
            className="p-mr-2"
            value={this.state.selectedMonth}
            onChange={(e) => this.setState({ selectedMonth: e.value, Time: e.val })}
            view="month" dateFormat="mm/yy"
            showIcon
            yearNavigator
            yearRange="2010:2030" />
          <Button
            label="Xem"
            icon="pi pi-search-plus"
            className="p-button-success p-mr-2"
            onClick={""}
          />
          <Button
            label="Nhập chỉ số mới"
            icon="pi pi-search-plus"
            className="p-button-danger"
            onClick={this.openNew}
          />
        </span>
      </div>
    );
    const DienDialogFooter = (
      <React.Fragment>
        <Button
          label="Cancel"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDialog}
        />
        <Button
          label="Save"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.saveDien}
        />
      </React.Fragment>
    );
    return (

      <div className="datatable-crud-demo">
        <Toast ref={(el) => (this.toast = el)} />

        <div className="card">
          <Toolbar
            className="p-mb-4"
            left={this.leftToolbarTemplate}
            right={this.rightToolbarTemplate}
          ></Toolbar>

          <DataTable
            ref={(el) => (this.dt = el)}
            value={this.state.test ? Object.values(this.state.test) : null}
            dataKey="_id"
            className="p-datatable-gridlines"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            header={header}
          >
            <Column field="RoomNumber" header="Phòng" ></Column>
            <Column field="ElectricNumber" header="CS Điện Mới" ></Column>
            <Column field="WaterNumber" header="CS Nuoc Mới" ></Column>
          </DataTable>
        </div>
        <Dialog
          visible={this.state.DienDialog}
          style={{ width: "450px" }}
          header="Thông tin chỉ số Điện/Nước"
          modal
          className="p-fluid"
          footer={DienDialogFooter}
          onHide={this.hideDialog}
        >
          <div className="p-field">
            <label htmlFor="">Chọn tháng</label>
            <Calendar
              id="monthpicker"
              className="p-mr-2"
              value={this.state.selectedMonth}
              onChange={(e) => this.setState({ selectedMonth: e.value })}
              view="month" dateFormat="mm/yy"
              showIcon
              yearNavigator
              yearRange="2010:2030" />

          </div>
          <div className="p-field">
            <label>Phòng</label>
            <Dropdown
              className="p-mr-2"
              value={this.state.selectedShowRoom}
              options={this.state.rooms}
              onChange={this.onRoomChange}
              optionLabel="RoomNumber"
              placeholder="Chọn phòng trọ"
            />
          </div>
          <div className="p-field">
            <label>Chỉ số điện mới</label>
            <InputNumber
              id="ElectricNumber"
              value={this.state.Dien.ElectricNumber}
              onValueChange={(e) => this.onInputNumberChange(e, "ElectricNumber")}
            />
          </div>
          <div className="p-field">
            <label>Chỉ số Nước mới</label>
            <InputNumber
              id="WaterNumber"
              value={this.state.Dien.WaterNumber}
              onValueChange={(e) => this.onInputNumberChange(e, "WaterNumber")}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default Dien;
