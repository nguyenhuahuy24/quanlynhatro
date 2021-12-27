import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from 'primereact/inputnumber';


import '../index.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';

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
    Time: "",
    ElectricNumber: 0,
    WaterNumber: 0,
    RoomId: "",
    RoomNumber:""
  };
  constructor(props) {
    super(props);

    this.state = {
      checked:false,
      rooms: null,
      houses: null,
      edit:false,
      Diens: null,
      Dien: this.emptyDien,
      //  loginuserID: localStorage.getItem("userIDlogin"),
      submitted: false,
      deleteUtilityBillDialog: false,
      selectDayDialog:false,
      //
      selectedShowHouse: null,
      selectedHouse: "",
      selectedRoom: "",
      selectedShowRoom: null,
      selectedMonth: new Date(),
      //thông báo
      selectNotificationDate:new Date(),
    };
    this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
    this.saveDien = this.saveDien.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onHouseChange = this.onHouseChange.bind(this);
    this.onRoomChange = this.onRoomChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.openNew = this.openNew.bind(this);
    this.hideDeleteUtilityBillDialog = this.hideDeleteUtilityBillDialog.bind(this);
    this.hideSelectDayDialog = this.hideSelectDayDialog.bind(this);
    
    this.deleteUtilityBill = this.deleteUtilityBill.bind(this);
    this.confirmDeleteUtilityBill = this.confirmDeleteUtilityBill.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.exportExcel = this.exportExcel.bind(this);
    this.ConfirmNotification = this.ConfirmNotification.bind(this);
    ///test
    this.openDay = this.openDay.bind(this);
  }
  componentDidMount() {
    this.props.getHouseByUserId();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.listUtilityBill !== prevProps.listUtilityBill) {
      if (this.props.listUtilityBill.status === dataStatus.SUCCESS) {
          const rooms = this.props.listUtilityBill.data
          let data = [];
          rooms.forEach(room => {
          if (room.ListUtilityBill.length !== 0) {
            data.push({
              _id: room.ListUtilityBill[0]._id,
              RoomNumber: room.RoomNumber,
              WaterNumber: room.ListUtilityBill[0].WaterNumber,
              ElectricNumber: room.ListUtilityBill[0].ElectricNumber,
              RoomId:room.ListUtilityBill[0].RoomId,
              Time: room.ListUtilityBill[0].Time
            })
          }else{
            data.push({
              RoomNumber: room.RoomNumber,
              WaterNumber: "Chưa cập nhật",
              ElectricNumber: "Chưa cập nhật",
              Time: "Chưa cập nhật"
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
        let data=[]
        data.push({
        HouseId: this.state.selectedHouse,
        Month:this.state.selectedMonth,
      })
         this.props.getAllUtilityBillByHouseId(data[0]);
         this.toast.show({
          severity: "success",
          summary: "Thành công",
          detail: "Nhập chỉ số Điện/Nước",
          life: 3000
        });
      }else{
        this.toast.show({
          severity: "error",
          summary: "Thất bại",
          detail: "Nhập chỉ số Điện/Nước",
          life: 3000
        });
      }
    }
    if (this.props.editStatus !== prevProps.editStatus) {
      if (this.props.editStatus.status === dataStatus.SUCCESS) {
         let data=[]
        data.push({
        HouseId: this.state.selectedHouse,
        Month:this.state.selectedMonth,
      })
         this.props.getAllUtilityBillByHouseId(data[0]);
         this.toast.show({
          severity: "success",
          summary: "Thành công",
          detail: "Cập nhật chỉ số Điện/Nước",
          life: 3000
        });
      }else{
        this.toast.show({
          severity: "error",
          summary: "Thất bại",
          detail: "Cập nhật chỉ số Điện/Nước",
          life: 3000
        });
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
            let data=[]
        data.push({
        HouseId: this.state.selectedHouse,
        Month:this.state.selectedMonth,
      })
         this.props.getAllUtilityBillByHouseId(data[0]);
      }
    }
  }
  exportExcel() {
       this.dt.exportCSV();
    }
  saveDien() {
    let state = { submitted: true };
    let Dien = { ...this.state.Dien };
    if(this.state.Dien._id)
    {
      this.props.editUtilityBill(this.state.Dien._id, Dien);
    }
    else{
      Dien.RoomId= this.state.selectedRoom
      Dien.Time= this.state.selectedMonth,
       this.props.createUtilityBill(Dien);    
    }
    state = {
      ...state,  
      DienDialog: false,
      selectedRoom:"",
      selectedShowRoom:"",
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
      let data=[]
      data.push({
        HouseId: this.state.selectedHouse,
        Month:e.value,
      })
      this.props.getAllUtilityBillByHouseId(data[0]);
    }
    
  }
  onHouseChange(e) {
    this.setState({ selectedHouse: e.value._id, selectedShowHouse: e.value, });
    this.props.getRoomByHouseId(e.value._id);
    let data=[]
      data.push({
        HouseId: e.value._id,
        Month:this.state.selectedMonth,
      })
    this.props.getAllUtilityBillByHouseId(data[0]);
  }
  onRoomChange(e) {
    this.setState({ selectedRoom: e.value._id, selectedShowRoom: e.value });
  }
  leftToolbarTemplate() {
    return (
      <React.Fragment>
         <span className="p-input-icon-right">
          
          <h7 className="p-mr-2">Tháng/Năm</h7>
          <Calendar
            id="monthpicker"
            className="p-mr-2"
            value={this.state.selectedMonth}
            onChange={this.onMonthChange}
            view="month"
            dateFormat="mm/yy"
            showIcon
            yearNavigator
            yearRange="2010:2030"
             />

          <Dropdown
            className="p-mr-2"
            value={this.state.selectedShowHouse}
            options={this.props.listHouse.data}
            onChange={this.onHouseChange}
            optionLabel="Name"
            placeholder="Chọn nhà trọ"
          />
          <Button
            label="Nhập chỉ số mới"
            icon="pi pi-search-plus"
            className="p-button-success p-mr-2"
            onClick={this.openNew}
          />
          {/* <Button
          label="Đặt lịch"
          icon="pi pi-clock"
          className="p-button-info p-mr-2"
          tooltip="Thông báo cập nhật chỉ số điện nước hằng tháng" 
          tooltipOptions={{ className: 'blue-tooltip', position: 'top' }}
          onClick={this.openDay}
          
        /> */}
          {/* <Button
          label="Xuất file excel"
          icon="pi pi-file-o"
          className="p-button-warning p-mr-2"
          onClick={this.exportExcel}
          disabled
        /> */}
        
        </span>
      </React.Fragment>
    );
  }
  openNew() {
    this.setState({
      Dien: this.emptyDien,
      submitted: false,
      DienDialog: true,
      edit:true,
    });
  }
  openDay() {
    this.setState({
     
      submitted: false,
      selectDayDialog: true
    });
  }
  editDien(Dien) {
    this.setState({
      edit:false,
      DienDialog: true,
      selectedRoom:Dien.RoomId,
      selectedShowRoom:Dien.RoomNumber,
       Dien: { ...Dien },
    });
    
  }
  ConfirmNotification(){
    this.setState({
      selectDayDialog:false,
      checked:false,
    })
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
  hideSelectDayDialog() {
    this.setState({ selectDayDialog: false });
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
          tooltip="Cập nhật chỉ số điên/nước" 
          tooltipOptions={{ className: 'blue-tooltip', position: 'top' }}
          onClick={() => this.editDien(rowData)}
          disabled={!rowData._id}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          tooltip="Xóa chỉ số điện/nước" 
          tooltipOptions={{ className: 'blue-tooltip', position: 'top' }}
          onClick={() => this.confirmDeleteUtilityBill(rowData)}
          disabled={!rowData._id}

        />
      </React.Fragment>
    );
  }
  render() {

    const header = (
      <div className="table-header">
       
         <h5 className="p-m-0">Quản lý chỉ số Điện/Nước</h5>
      </div>
    );
    const DienDialogFooter = (
      <React.Fragment>
        <Button
          label="Hủy"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={this.hideDialog}
        />
        {this.state.edit !=false && <Button
          label="Lưu"
          icon="pi pi-check"
          className="p-button-success"
          onClick={this.saveDien}
          disabled ={this.state.edit !=true} 
        /> }
        
        {this.state.edit != true && <Button
          label="Chỉnh sửa"
          icon="pi pi-pencil"
          className="p-button-warning"
          onClick={()=>this.setState({edit:true})}
        />}
      </React.Fragment>
    );
    const deleteUtilityBillDialogFooter = (
      <React.Fragment>
        <Button
          label="Không"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={this.hideDeleteUtilityBillDialog}
        />
        <Button
          label="Có"
          icon="pi pi-check"
          className="p-button-success"
          onClick={this.deleteUtilityBill}
        />
      </React.Fragment>
    );
         const NotificationDialogFooter = (
      <React.Fragment>
        <Button
          label="Không"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={this.hideSelectDayDialog}
        />
        <Button
          label="Có"
          icon="pi pi-check"
          className="p-button-success"
          onClick={this.ConfirmNotification}
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
          ></Toolbar>

          <DataTable
            ref={(el) => (this.dt = el)}
            value={this.state.Diens ? Object.values(this.state.Diens) : null}
            dataKey="_id"
            className="p-datatable-gridlines"
            paginator
            rows={5}
            // rowsPerPageOptions={[5, 10, 25]}
            // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            // currentPageReportTemplate="Hiển thị từ {first} đến {last} của tổng {totalRecords} phòng"
            header={header}
          >
            <Column field="RoomNumber" header="Phòng" ></Column>
            <Column field="ElectricNumber" header="Chỉ Số Điện Mới" ></Column>
            <Column field="WaterNumber" header="Chỉ Số Nước Mới" ></Column>
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
              numberOfMonths={3}
              yearNavigator
              yearRange="2010:2030"
                disabled />
              
          </div>
          {this.state.Dien.RoomNumber =="" &&
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
          }
           {this.state.Dien.RoomNumber  !="" &&
            <div className="p-field">
            <label>Phòng</label>
            <InputNumber
              id="RoomNumber"
              value={this.state.Dien.RoomNumber}
              disabled
            />
          </div>
          }
          <div className="p-field">
            <label>Chỉ số điện mới</label>
            <InputNumber
              id="ElectricNumber"
              value={this.state.Dien.ElectricNumber}
              onValueChange={(e) => this.onInputNumberChange(e, "ElectricNumber")}
                disabled ={this.state.edit !=true}

            />
          </div>
          <div className="p-field">
            <label>Chỉ số Nước mới</label>
            <InputNumber
              id="WaterNumber"
              value={this.state.Dien.WaterNumber}
              onValueChange={(e) => this.onInputNumberChange(e, "WaterNumber")}
              disabled ={this.state.edit !=true}

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
       
        <Dialog 
          header="Đặt lịch thông báo" 
          visible={this.state.selectDayDialog} 
          style={{ width: '450px' }} 
          className="p-fluid"
          modal
          footer={NotificationDialogFooter} 
          onHide={this.hideSelectDayDialog}
          >
          <div className="p-field">
            <label htmlFor="">Chọn ngày</label>
            <Calendar 
                id="navigators" 
                value={this.state.selectNotificationDate} 
                onChange={(e) => this.setState({ selectNotificationDate: e.value })} 
                monthNavigator 
                yearNavigator 
                yearRange="2010:2030"
                showIcon
                 />

          </div>
             <div className="p-field-checkbox">
             <a htmlFor="city1">Bạn muốn nhận thông báo hằng tháng: </a>
                <Checkbox 
                    inputId="binary"
                    checked={this.state.checked} 
                    onChange={e => this.setState({ checked: e.checked })}
                     />
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