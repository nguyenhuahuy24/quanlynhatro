import '../index.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from 'primereact/radiobutton'
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from "primereact/dialog";
import { Calendar } from 'primereact/calendar'
import classNames from 'classnames';
import { InputText } from 'primereact/inputtext';
import UserContext from "../context/UserContext";


import { withGlobalContext } from '../GlobalContextProvider';
import { connect } from 'react-redux';
import { dataStatus,userProfile } from "../utility/config";

import {getHouseByUserId} from '../redux/action/houseAction/HouseAction'
import {getRoomByHouseId} from '../redux/action/roomAction/RoomAction'
import {getAllCustomerOfUser} from '../redux/action/customerAction/CustomerAction'
import{getContractOfUser,createContract,editContract,deleteContract} from '../redux/action/contractAction/ContractAction'


class HopDong extends Component {
  static contextType = UserContext
  emptyHD = {
    CreateDay: new Date(),
    Lessor:userProfile.userId,
    Renter: "",
    HouseId:"",
    RoomId:"",
    RentalPeriod:"",
    Deposit:0,
    ArrivalDate:"",
    ExpirationDate:"",
    Rent:"",
    Status:"",
  };

  constructor(props) {
    super(props);
    this.RentalPeriod = [
            { name: '6 tháng'},
            { name: '1 năm'},
            { name: '2 năm'},
            { name: '3 nam'},
            { name: '4 năm'}
        ];
    this.state = {
      HDs: null,
      HDDialog: false,
      deleteHDDialog: false,
      deleteHDsDialog: false,
      HD: this.emptyHD,
      ConfirmHDDialog:false,
      submitted: false,
      globalFilter: null,

      selectedCustomer: "",
      selectedShowCustomer: "",
      //room
      selectedHouse: "",
      selectedShowHouse:"",
      selectedRoom: "",
      selectedShowRoom:"",
      //
      selectedArrivalDate:"",
      selectedExpirationDate:"",
      //chon thoi gian hop dong
      selectedRentalPeriod:"",
    };
  
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.openNew = this.openNew.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.saveHD = this.saveHD.bind(this);
    this.editHD = this.editHD.bind(this);
    this.confirmDeleteHD = this.confirmDeleteHD.bind(this);
    this.deleteHD = this.deleteHD.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.hideConfirmHDDialog = this.hideConfirmHDDialog.bind(this);
    
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeleteHDDialog = this.hideDeleteHDDialog.bind(this);
    this.onRentalPeriodChange = this.onRentalPeriodChange.bind(this);
    //
    this.onHouseChange = this.onHouseChange.bind(this);
    this.onRoomChange = this.onRoomChange.bind(this);
    this.onCustomerChange = this.onCustomerChange.bind(this);
    //chang status
    this.OpenConfirmStatus = this.OpenConfirmStatus.bind(this);
      this.ConfirmStatus = this.ConfirmStatus.bind(this);
  }
  componentWillMount(){
    const{userData,setUserData}= this.context;

  }
  componentDidMount() {
    // this.HDService
    //   .getServiceOfUser()
    //   .then(data => this.setState({ HDs: data }));
    //this.props.getServiceOfUser();
    this.props.getHouseByUserId();
    this.props.getContractOfUser();
    this.props.getAllCustomerOfUser();
  }
  componentDidUpdate(prevProps){
    if (this.props.createStatus !== prevProps.createStatus) {
      if (this.props.createStatus.status === dataStatus.SUCCESS) {
         this.props.getContractOfUser();
          this.toast.show({
          severity: "success",
          summary: "Thành công",
          detail: "Thêm Hợp Động",
          life: 2500
        });
      }
      else{
           this.toast.show({
          severity: "error",
          summary: "Thất bại",
          detail: "Thêm Hợp Động",
          life: 2500
        });
      }
    }
    if (this.props.editStatus !== prevProps.editStatus) {
      if (this.props.editStatus.status === dataStatus.SUCCESS) {
         this.props.getContractOfUser();
      }
    }
    if (this.props.deleteStatus !== prevProps.deleteStatus) {
      if (this.props.deleteStatus.status === dataStatus.SUCCESS) {
            if(this.props.deleteStatus.data.deletedCount === 1)
          {
            this.setState({
            //  HDs,
              deleteHDDialog: false,
              HD: this.emptyHD
            });
            this.toast.show({
              severity: "success",
              summary: "Thành công",
              detail: "Xóa Hợp Đồng",
              life: 3000
            });
          }else{
            this.toast.show({
              severity: "error",
              summary: "Thất bại",
              detail: "Xóa Hợp Đồng",
              life: 3000
            });
          }
        this.props.getContractOfUser();
      }
    }
    if (this.props.listContract !== prevProps.listContract) {
      if (this.props.listContract.status === dataStatus.SUCCESS) {
        const rents = Object.values(this.props.listContract.data)
        let data = [];
        rents.forEach(rent =>{
            data.push({
              _id: rent._id,
              Renter: rent.Renter.Name,
              Rent: rent.Rent,
              Deposit:rent.Deposit,
              RentalPeriod: rent.RentalPeriod,
              House: rent.House.Name,
              Room: rent.Room.RoomNumber,
              Status:rent.Status
            })
        }) 
        this.setState({ HDs: data })
      } 
    }
  }
  formatCurrency(value) {
    return value.toLocaleString("vnd", {
      style: "currency",
      currency: "VND"
    });
  }
  onRentalPeriodChange(e) {
      if(this.state.selectedArrivalDate!=""){
        this.setState({ selectedRentalPeriod: e.value });
    }else{
      this.toast.show({
      severity: "error",
      summary: "Lỗi",
      detail: "Chưa chọn ngày bắt đầu",
      life: 2500
      });
    }
  }
   onHouseChange(e) {
    this.setState({ selectedHouse: e.value._id, selectedShowHouse: e.value });
    this.props.getRoomByHouseId(e.value._id);
  }
  onRoomChange(e) {
    this.setState({ selectedRoom: e.value._id, selectedShowRoom: e.value });
    
  }
  onCustomerChange(e) {
    this.setState({ selectedCustomer: e.value._id, selectedShowCustomer: e.value });

  }
  openNew() {
    this.setState({
      HD: this.emptyHD,
      HDDialog: true,
      
    });
  }
  hideConfirmHDDialog() {
    this.setState({
      ConfirmHDDialog: false
    });
  }
  hideDialog() {
    this.setState({
      HDDialog: false,
      HD: this.emptyHD,
    });
  }
  hideDeleteHDDialog() {
    this.setState({ deleteHDDialog: false });
  }
  saveHD() {
    let state = { submitted: true };
    let HD = { ...this.state.HD };
    // let data=[];
    // data.push({
    //   DateCreate:this.state.HD.CreateDay,
    //   Lessor: this.state.HD.Lessor,
    //   Renter:this.state.selectedCustomer,
    //   House:this.state.selectedHouse,
    //   Room:this.state.selectedRoom,
    //   ArrivalDate:this.state.selectedArrivalDate,
    //   ExpirationDate:this.state.selectedExpirationDate,
    //   Deposit: this.state.HD.Deposit,
    //   Status:3,
    // })
    console.log(`data test:`,this.state.selectedRentalPeriod.name)
    //this.props.createContract(data[0]);    
    state = {
        ...state,
        HDDialog: false,
        HD: this.emptyHD,
        selectedCustomer:"",
        selectedShowCustomer:""
      };
    
    this.setState(state);
  }
  OpenConfirmStatus(HD) {
    this.setState({
      HD: { ...HD },
     ConfirmHDDialog: true
    
    });
  }
  ConfirmStatus() {
    let state = { submitted: true }; 
    let a ={Status:this.state.HD.Status}
    this.props.editContract(this.state.HD._id,a);
        this.toast.show({
          severity: "success",
          summary: "Thành công",
          detail: "Cập nhật Hợp đồng",
          life: 3000
        });
    state = {
        ...state,
        ConfirmHDDialog: false,
        HD: this.emptyHD
      };
    this.setState(state);
  }
  editHD(HD) {
    this.setState({
      HD: { ...HD },
      HDDialog: true
    });
  }
  confirmDeleteHD(HD) {
    this.setState({
      HD,
      deleteHDDialog: true
    });
  }
  deleteHD() {
    this.props.deleteContract(this.state.HD._id);
  }
 
  onInputNumberChange(e, name) {
    const val = e.value || 0;
    let HD = { ...this.state.HD };
    HD[`${name}`] = val;

    this.setState({ HD });
  }
  rightToolbarTemplate() {
    return (
      <React.Fragment>
        <Button
          label="Thêm hợp đồng"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={this.openNew}
        />
      </React.Fragment>
    );
  }
  onStatusChange(e) {
    let HD = { ...this.state.HD };
    HD["Status"] = e.value;
    this.setState({ HD });
  }
  statusBodyTemplate(rowData) {
    console.log(`data status: `,rowData)
    if (rowData.Status == "1") {
      return <span className={`product-badge status-1`}>{"Đã đồng ý"}</span>;
    }
    else if (rowData.Status == "0") { return <span className={`product-badge status-0`}>{"Đã hủy"}</span>; }
    else if (rowData.Status == "-1") { return <span className={`product-badge status`}>{"Đã hết hạn"}</span>; }
    else{return <span className={`product-badge status-2`}>{"Chưa đồng ý"}</span>; }
  }
  priceBodyTemplate(rowData) {
    return this.formatCurrency(rowData.Deposit);
  }
  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => this.editHD(rowData)}
        />
        <Button
          icon="pi pi-plus"
          className="p-button-rounded p-button-warning p-mr-2"
          onClick={()=>this.OpenConfirmStatus(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => this.confirmDeleteHD(rowData)}
        />
      </React.Fragment>
    );
  }
  render() {
    const header = (
      <div className="table-header">
        <h5 className="p-m-0">Quản lý hợp đồng</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => this.setState({ globalFilter: e.target.value })}
            placeholder="Search..."
          />
        </span>
      </div>
    );
    const HDDialogFooter = (
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
          onClick={this.saveHD}
        />
      </React.Fragment>
    );
    const deleteHDDialogFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDeleteHDDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.deleteHD}
        />
      </React.Fragment>
    );
     const ConfrimDialogFooter = (
      <React.Fragment>
        <Button
          label="Cancel"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideConfirmHDDialog}
        />
        <Button
          label="Xác nhận"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.ConfirmStatus}
        />
      </React.Fragment>
    );
    return (
      <div className="datatable-crud-demo">
        <Toast ref={(el) => (this.toast = el)} />
        <div className="card">
          <Toolbar
            className="p-mb-4"
            right={this.rightToolbarTemplate}
          ></Toolbar>
          <DataTable
            ref={(el) => (this.dt = el)}
            value={this.state.HDs}
            dataKey="_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Hợp đồng"
            globalFilter={this.state.globalFilter}
            header={header}
          >
            <Column field="Renter" header="Tên khách thuê" ></Column>
            <Column field="House" header="Tên nhà" ></Column>
            <Column field="Room" header="Tên phòng" ></Column>
            <Column field="RentalPeriod" header="Thời gian hợp đồng" ></Column>
              <Column 
            field="Status" 
            header="Tình trạng"
            body={this.statusBodyTemplate} >
            
            </Column>
            <Column body={this.actionBodyTemplate}></Column>
          </DataTable>
        </div>

        <Dialog
          visible={this.state.HDDialog}
          style={{ width: "450px" }}
          header="Thông tin hợp đồng"
          modal
          blockScroll
          className="p-fluid"
          footer={HDDialogFooter}
          onHide={this.hideDialog}
        >
            <div className="p-field">
            <label htmlFor="ServiceName">Tên khách thuê</label>
            <Dropdown
              className="p-mr-2"
              options={this.props.listCustomer.data}
              value={this.state.selectedShowCustomer}
              onChange={this.onCustomerChange}
              optionLabel="Name"
              placeholder="Chọn khách thuê"
            />
          </div>
      
            <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="">Nhà</label>
            <Dropdown
              className="p-mr-2"
              value={this.state.selectedShowHouse}
              options={this.props.listHouse.data}
              onChange={this.onHouseChange}
              optionLabel="Name"
              placeholder="Chọn nhà trọ"
            />
            </div>
            <div className="p-field p-col">
              <label htmlFor="">Phòng</label>
            <Dropdown
              className="p-mr-2"
              value={this.state.selectedShowRoom}
              options={this.props.listRoom.data}
              onChange={this.onRoomChange}
              optionLabel="RoomNumber"
              placeholder="Chọn phòng trọ"
            /> </div>
          </div>
          
          <div className="p-field">
            <label htmlFor="Price">Tiền đặt cọc</label>
            <InputNumber
              id="Price"
              value={this.state.HD.Deposit}
              onValueChange={(e) => this.onInputNumberChange(e, "Deposit")}
              mode="currency"
              currency="Vnd"
            />
          </div>
          <div className="p-field">
            <label htmlFor="">Hợp đồng có giá trị kể từ</label>
              <Calendar 
              id="basic"
             // value={this.state.HD} 
              onChange={(e) => this.setState({ selectedArrivalDate: e.value })} 
              showIcon 
              
              />
          </div>
          <div className="p-field">
            <label htmlFor="">Thời gian thuê</label>
             <Dropdown 
             value={this.state.selectedRentalPeriod} 
             options={this.RentalPeriod} 
             onChange={this.onRentalPeriodChange} 
             optionLabel="name" 
             />
            
          </div>
          <div className="p-field">
            <label htmlFor="">Hợp đồng kết thúc:</label>
              <Calendar 
              id="navigatorstemplate"
              monthNavigator 
              yearNavigator 
              yearRange="2010:2030"
              //value={this.state.selectedDateCMND} 
              onChange={(e) => this.setState({ selectedExpirationDate : e.value })} 
              showIcon 
              />
          </div>
        </Dialog>
        <Dialog
          visible={this.state.deleteHDDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteHDDialogFooter}
          onHide={this.hideDeleteHDDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.HD && (
              <span>
                Bạn chắn chắn muốn xóa đã chọn <b>{this.state.HD.Renter}</b>
                 ?
              </span>
            )}
          </div>
        </Dialog>
        <Dialog
          visible={this.state.ConfirmHDDialog}
          style={{ width: "450px" }}
          header="Xác định thanh toán"
          modal
          className="p-fluid"
         footer={ConfrimDialogFooter}
        onHide={this.hideConfirmHDDialog}
        >
          <div className="p-field">
            <div className="p-formgrid p-grid">
              <div className="p-field-radiobutton p-col-6">
                <RadioButton
                  inputId="Status1"
                  name="Status"
                  value={-1}
                  onChange={this.onStatusChange}
                  checked={this.state.HD.Status === -1}
                />
                <label htmlFor="Status1">Đã hết hạn</label>
              </div>
              <div className="p-field-radiobutton p-col-6">
                <RadioButton
                  inputId="Status2"
                  name="Status"
                  value={0}
                  onChange={this.onStatusChange}
                  checked={this.state.HD.Status === 0}
                />
                <label htmlFor="Status2">Đã hủy</label>
              </div>
            </div>
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
    //customer
    listCustomer: state.CustomerReducer.listCustomer,
    //house
    listHouse: state.HouseReducer.listHouse,
    //contract
    listContract: state.ContractReducer.listContract,
    createStatus:state.ContractReducer.createStatus,
    editStatus:state.ContractReducer.editStatus,
    deleteStatus:state.ContractReducer.deleteStatus,
  };
}
export default withGlobalContext(
  connect(mapStateToProps, {getAllCustomerOfUser,getRoomByHouseId,getHouseByUserId,getContractOfUser,createContract,editContract,deleteContract})(HopDong),
);