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


import '../index.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import '../index.css';
import UserContext from "../context/UserContext";
//redux
import { withGlobalContext } from '../GlobalContextProvider';
import { connect } from 'react-redux';
import {getAllUtilityBillByHouseId ,createUtilityBill, editUtilityBill, deleteUtilityBill} from '../redux/action/utilityBillAction/UtilityBillAction'
import {getHouseByUserId} from '../redux/action/houseAction/HouseAction'
import {getRoomByHouseId} from '../redux/action/roomAction/RoomAction'

import { dataStatus } from "../utility/config";
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
      deleteUtilityBillDialog: false,
      selectedShowHouse: null,
      selectedHouse: "",
      selectedRoom: "",
      selectedShowRoom: null,
      selectedMonth: new Date(),
    };
    this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    this.saveDien = this.saveDien.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onHouseChange = this.onHouseChange.bind(this);
    this.onRoomChange = this.onRoomChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.openNew = this.openNew.bind(this);
    this.hideDeleteUtilityBillDialog = this.hideDeleteUtilityBillDialog.bind(this);
    this.deleteUtilityBill = this.deleteUtilityBill.bind(this);
    this.confirmDeleteUtilityBill = this.confirmDeleteUtilityBill.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
  }
  componentDidMount() {
    this.props.getHouseByUserId();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.listUtilityBill !== prevProps.listUtilityBill) {
      if (this.props.listUtilityBill.status === dataStatus.SUCCESS) {
          const rooms = Object.values(this.props.listUtilityBill.data)[0];
          let data = [];
          rooms.forEach(room => {
          if (room.ListUtilityBill.length !== 0) {
            data.push({
              _id: room.ListUtilityBill[0]._id,
              RoomNumber: room.RoomNumber,
              WaterNumber: room.ListUtilityBill[0].WaterNumber,
              ElectricNumber: room.ListUtilityBill[0].ElectricNumber
            })
          }
        })  
        this.setState({ Diens: { ...data } })
      } 
    }
    if (this.props.listHouse !== prevProps.listHouse) {
      if (this.props.listHouse.status === dataStatus.SUCCESS) {
          this.props.getRoomByHouseId(this.state.selectedHouse);
      } 
    }
    if (this.props.createStatus !== prevProps.createStatus) {
      if (this.props.createStatus.status === dataStatus.SUCCESS) {
         this.props.getAllUtilityBillByHouseId(this.state.selectedHouse,this.state.selectedMonth);
      }
    }
    if (this.props.deleteStatus !== prevProps.deleteStatus) {
      if (this.props.deleteStatus.status === dataStatus.SUCCESS) {      
            if(this.props.deleteStatus.data.deletedCount === 1){
                this.setState({ 
                    deleteUtilityBillDialog: false,
                    Dien: this.emptyDien });
                this.toast.show({
                  severity: "success",
                  summary: "Successful",
                  detail: "Xóa chỉ số điện nước",
                  life: 3000
                });
            }else{
              this.setState({
              deleteUtilityBillDialog: false
              });
              this.toast.show({
                  severity: "error",
                  summary: "Fail",
                  detail: "House Deleted",
                  life: 3000
                });
            }
            this.props.getAllUtilityBillByHouseId(this.state.selectedHouse,this.state.selectedMonth);
      }
    }
    this.state.Dien.Time = this.state.selectedMonth;
    this.state.Dien.RoomId = this.state.selectedRoom;
  }
  saveDien() {
    let state = { submitted: true };
    let Dien = { ...this.state.Dien };
    if(this.state.Dien._id)
    {
       this.props.editUtilityBill(this.state.Dien._id, Dien);
        // houses[index] = house;
        this.toast.show({
          severity: "success",
          summary: "Thành công",
          detail: "Cập nhật chỉ số điện/Nước ",
          life: 3000
        });
    }
    else{
        this.props.createUtilityBill(Dien);
        this.toast.show({
          severity: "success",
          summary: "Thành công",
          detail: "Nhập chỉ số Điện/Nước",
          life: 3000
        });
    }
    
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
  onMonthChange(e) {
    this.setState({ selectedMonth: e.value});
    if(this.state.selectedHouse == "")
    {
      this.toast.show({
      severity: "error",
      summary: "Lỗi",
      detail: "Chưa chọn nhà trọ",
      life: 2500
      });
    }
    else{
      this.props.getAllUtilityBillByHouseId(this.state.selectedHouse,e.value);
    }
    
  }
  onHouseChange(e) {
    this.setState({ selectedHouse: e.value._id, selectedShowHouse: e.value, });
    this.props.getRoomByHouseId(e.value._id);
    this.props.getAllUtilityBillByHouseId(e.value._id,this.state.selectedMonth);
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
  editDien(Dien) {
    this.setState({
      Dien: { ...Dien },
      DienDialog: true
    });
  }
  confirmDeleteUtilityBill(Dien) {
    this.setState({
      Dien,
      deleteUtilityBillDialog: true
    });
  }
  hideDeleteUtilityBillDialog() {
    this.setState({ deleteUtilityBillDialog: false });
  }
  deleteUtilityBill(){
    this.props.deleteUtilityBill(this.state.Dien._id);
  }
  hideDialog() {
    this.setState({
      submitted: false,
      DienDialog: false
    });
  }
  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
      <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => this.editDien(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => this.confirmDeleteUtilityBill(rowData)}
        />
      </React.Fragment>
    );
  }
  render() {

    const header = (
      <div className="table-header">
        <span className="p-input-icon-right">
          <Dropdown
            className="p-mr-2"
            value={this.state.selectedShowHouse}
            options={this.props.listHouse.data}
            onChange={this.onHouseChange}
            optionLabel="Name"
            placeholder="Chọn nhà trọ"
          />
          <label className="p-mr-2">Tháng/Năm </label>
          <Calendar
            id="monthpicker"
            className="p-mr-2"
            value={this.state.selectedMonth}
            onChange={this.onMonthChange}
            view="month" dateFormat="mm/yy"
            showIcon
            yearNavigator
            yearRange="2010:2030" />
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
    const deleteUtilityBillDialogFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDeleteUtilityBillDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.deleteUtilityBill}
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
            value={this.state.Diens ? Object.values(this.state.Diens) : null}
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
            <Column body={this.actionBodyTemplate}></Column>
         
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
              options={this.props.listRoom.data}
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
        <Dialog
          visible={this.state.deleteUtilityBillDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteUtilityBillDialogFooter}
          onHide={this.hideDeleteUtilityBillDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.Dien && (
              <span>
                Bạn chắn chắn muốn xóa đã chọn ???
              </span>
            )}
          </div>
        </Dialog>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    //room
    listRoom: state.RoomReducer.listRoom,
    //utilityBill
    listUtilityBill: state.UtilityBillReducer.listUtilityBill,
    createStatus: state.UtilityBillReducer.createStatus,
    editStatus: state.UtilityBillReducer.editStatus,
    deleteStatus: state.UtilityBillReducer.deleteStatus,
    //house
    listHouse: state.HouseReducer.listHouse,
  };
}
export default withGlobalContext(
  connect(mapStateToProps, {getRoomByHouseId,getHouseByUserId, getAllUtilityBillByHouseId ,createUtilityBill, editUtilityBill, deleteUtilityBill})(Dien),
);