import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Calendar } from 'primereact/calendar'
import { RadioButton } from 'primereact/radiobutton'
import { InputTextarea } from 'primereact/inputtextarea';

import { Dialog } from 'primereact/dialog';
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import UserContext from "../context/UserContext";
import '../index.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
//redux
import { withGlobalContext } from '../GlobalContextProvider';
import { connect } from 'react-redux';
import {getBillInMonthOfUser ,createBill, editBill, deleteBill,recalculateBill} from '../redux/action/billAction/BillAction'
import {getHouseByUserId} from '../redux/action/houseAction/HouseAction'
import {getRoomByHouseId} from '../redux/action/roomAction/RoomAction'
import { dataStatus,userProfile } from "../utility/config";

class TinhTien extends Component {
  static contextType = UserContext
  emptyBill = {
    RoomId: "",
    RoomNumber: "",
    ElectricFee: 0,
    WaterFree: 0,
    RoomPrice: 0,
    TotalBill: 0,
    DateCreate: new Date(),
    OtherCrosts: "",
    StartDate: "",
    EndDate: "",
    Status: ""
  };
  constructor(props) {
    super(props);

    this.state = {
     // loginuserID: localStorage.getItem("userIDlogin"),
      houses:"",
      room:"",
      bills: "",
      billDialog: false,
      ConfirmBillDialog:false,
      ViewBillDialog:false,
      listRoomDialog:false,
      deleteBillDialog: false,
      deleteBillsDialog: false,
      bill: this.emptyBill,
      selectedBills: "",
      globalFilter: null,
      selectedHouse: "",
      selectedShowHouse: "",
      selectedShowRoom:"",
      selectedRoom: "",
      selectedRooms: null,
      selectedMonth: new Date(),
      
    };

    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
    this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.openNew = this.openNew.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.openViewBill = this.openViewBill.bind(this);
    this.ThanhToan = this.ThanhToan.bind(this);
    this.TinhBill = this.TinhBill.bind(this);
    
    this.RecalculateBill = this.RecalculateBill.bind(this);
    this.ThanhToanBill = this.ThanhToanBill.bind(this);
    this.confirmDeleteBill = this.confirmDeleteBill.bind(this);
    this.deleteBill = this.deleteBill.bind(this);
    this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
    this.onRoomsChange = this.onRoomsChange.bind(this);
    this.onHousesChange = this.onHousesChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.onHide =this.onHide.bind(this);

  }
  componentDidMount() {
    this.props.getHouseByUserId();
  }
  componentDidUpdate(prevProps, prevState){
    if (this.props.listBill !== prevProps.listBill) {
      if (this.props.listBill.status === dataStatus.SUCCESS) {
          const bills = this.props.listBill.data;
          let data = [];
          bills.forEach(bill => {
            if (bill.ListBill.length !== 0) {
              data.push({
               _id: bill.ListBill[0]._id,
                RoomNumber: bill.RoomNumber,
                RoomId: bill.ListBill[0].RoomId,
                TotalBill: bill.ListBill[0].TotalBill,
                Status: bill.ListBill[0].Status,
                OtherCosts: bill.ListBill[0].OtherCosts,
                WaterFee: bill.ListBill[0].WaterFee,
                ElectricFee:bill.ListBill[0].ElectricFee,
                AmountOfElectric:bill.ListBill[0].AmountOfElectric,
                AmountOfWater:bill.ListBill[0].AmountOfWater,
              })
            }
            else{
               data.push({
              RoomNumber: bill.RoomNumber,
              TotalBill: 0,
              Status:"Chưa tạo hóa đơn"
            })
            }
          })
          this.setState({ bills: { ...data } })
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
         this.props.getBillInMonthOfUser(data[0]);
         this.toast.show({
          severity: "success",
          summary: "Thành công",
          detail: "Bill Created",
          life: 2500
        });
      }
      else{
        this.toast.show({
          severity: "error",
          summary: "Thất bại",
          detail: this.props.createStatus.message,
          life: 2500
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
          this.props.getBillInMonthOfUser(data[0]);
      } 
    }
    if (this.props.recalculateBillStatus !== prevProps.recalculateBillStatus) {
      if (this.props.recalculateBillStatus.status === dataStatus.SUCCESS) {
          let data=[]
        data.push({
        HouseId: this.state.selectedHouse,
        Month:this.state.selectedMonth,
      })
      this.toast.show({
          severity: "success",
          summary: "Thành công",
          detail: "Tính lại Bill",
          life: 3000
        });
          this.props.getBillInMonthOfUser(data[0]);
      }else{
        this.toast.show({
          severity: "error",
          summary: "Thất bại",
          detail: "Tính lại Bill",
          life: 3000
        });
      }
    }
    if (this.props.deleteStatus !== prevProps.deleteStatus) {
      if (this.props.deleteStatus.status === dataStatus.SUCCESS) {      
            if(this.props.deleteStatus.data.deletedCount === 1){
                this.setState({ 
                    deleteBillDialog: false,
                    bill: this.emptyBill });
                this.toast.show({
                  severity: "success",
                  summary: "Successful",
                  detail: "Xóa Bill",
                  life: 3000
                });
            }else{
              this.setState({
              deleteBillDialog: false
              });
              this.toast.show({
          severity: "success",
          summary: "Fail",
          detail: "Xóa Bill",
          life: 3000
        });
            }
            let data=[]
        data.push({
        HouseId: this.state.selectedHouse,
        Month:this.state.selectedMonth,
      })
          this.props.getBillInMonthOfUser(data[0]);
      }
    }
  }
  formatCurrency(value) {
    return value.toLocaleString("vnd", {
      style: "currency",
      currency: "VND"
    });
  }
  onStatusChange(e) {
    let bill = { ...this.state.bill };
    bill["Status"] = e.value;
    this.setState({ bill });
  }
  statusBodyTemplate(rowData) {
    if (rowData.Status == "1") {
      return <span className={`product-badge status-1`}>{"Đã thanh toán"}</span>;
    }
    if (rowData.Status == "0") { return <span className={`product-badge status-0`}>{"Chưa thanh toán"}</span>; }
    else{ return <span className={`product-badge status`}>{rowData.Status}</span>; }
  }
  onRoomsChange(e) {
    this.setState({ selectedRoom: e.value._id,selectedShowRoom:e.value });
  }
  onHousesChange(e) {
    let data=[]
        data.push({
        HouseId: e.value._id,
        Month:this.state.selectedMonth,
      })
    this.setState({ selectedHouse: e.value._id,selectedShowHouse:e.value });
    this.props.getBillInMonthOfUser(data[0]);
    this.props.getRoomByHouseId(e.value._id);
  }
  openNew() {
    this.setState({
      bill: this.emptyBill,
      billDialog: true,
    });
  }
 
  onHide(name) {
        this.setState({
            [`${name}`]: false,
        });
    }
  ThanhToan() {
    let state = {}; 
    let a ={Status:this.state.bill.Status}
    this.props.editBill(this.state.bill._id,a);
    //this.billService.updateBill(this.state.bill._id,a).then();
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "Bill Update",
          life: 3000
        });
    state = {
        ...state,
        ConfirmBillDialog: false,
        bill: this.emptyBill
      };
    this.setState(state);
  }
  TinhBill() {
    let state = { };
    let a =[]
    a.push({
      RoomId: this.state.selectedRoom,
      Month: this.state.selectedMonth
    })
    this.props.createBill(a[0]);
        
    state = {
        ...state,
        billDialog: false,
        bill: this.emptyBill
      };
    this.setState(state);
  }

  ThanhToanBill(bill) {
    this.setState({
      bill: { ...bill },
     ConfirmBillDialog: true
    
    });
  }
  openViewBill(bill) {
    this.setState({
      bill: { ...bill },
     ViewBillDialog: true
    });
  }
  RecalculateBill(){
    let state = { }; 
    this.props.recalculateBill(this.state.bill._id);
        
    state = {
        ...state,
        ViewBillDialog: false,
        bill: this.emptyBill
      };
    this.setState(state);
  }
  confirmDeleteBill(bill) {
    this.setState({
      bill,
      deleteBillDialog: true
    });
  }
  deleteBill() {
    this.props.deleteBill(this.state.bill._id);
  }
  confirmDeleteSelected() {
    this.setState({ deleteBillsDialog: true });
  }
 
  onInputChange(e, name) {
    const val = (e.target && e.target.value) || "";
    let bill = { ...this.state.bill };
    bill[`${name}`] = val;

    this.setState({ bill });
  }

  onInputNumberChange(e, name) {
    const val = e.value || 0;
    let bill = { ...this.state.bill };
    bill[`${name}`] = val;

    this.setState({ bill });
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
      this.props.getBillInMonthOfUser(data[0]);
    }
  }

  leftToolbarTemplate() {
    return (
      <React.Fragment>
         <h7 className="p-mr-2">Tháng/Năm</h7>
        <Calendar
          id="monthpicker"
          className="p-mr-2"
          value={this.state.selectedMonth}
          onChange={this.onMonthChange}
          view="month" dateFormat="mm/yy"
          showIcon
          yearNavigator
          yearRange="2010:2030"
           />
        <Dropdown
              className="p-mr-2"
              value={this.state.selectedShowHouse}
              options={this.props.listHouse.data}
              onChange={this.onHousesChange}
              optionLabel="Name"
              placeholder="Chọn nhà trọ"
            />
        <Button
          label="Tính tiền"
          icon="pi pi-dollar"
          className="p-button-success p-mr-2"
          onClick={this.openNew}
          tooltip="Tạo hóa đơn" 
          tooltipOptions={{ className: 'blue-tooltip', position: 'top' }}
          
        />
        <Button
          label="Thông báo"
          icon="pi pi-bell"
          className="p-button-warning p-mr-2"
          tooltip="Thông báo hóa đơn cho khách thuê" 
          tooltipOptions={{ className: 'blue-tooltip', position: 'top' }}
          onClick={()=>this.setState({listRoomDialog:true})}
          disabled={this.state.selectedHouse===""}
        />
        {/* <Button
          label="Email"
          icon="pi pi-envelope"
          className="p-button-primary p-mr-2"
          disabled
        /> */}
        {/* <Button
          label="In danh sách"
          icon="pi pi-file-o"
          className="p-button-success p-mr-2"
          disabled
        /> */}
      </React.Fragment>
    );
  }
  priceBodyTemplate(rowData) {
    return this.formatCurrency(rowData.TotalBill);
  }
  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-plus"
          className="p-button-rounded p-button-warning p-mr-2"
          tooltip="Chi tiết hóa đơn" 
          tooltipOptions={{ className: 'blue-tooltip', position: 'top' }}
          onClick={()=>this.openViewBill(rowData)}
          disabled={!rowData._id}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          tooltip="Xác nhận thanh toán" 
          tooltipOptions={{ className: 'blue-tooltip', position: 'top' }}
          onClick={() => this.ThanhToanBill(rowData)}
          disabled={!rowData._id}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          tooltip="Xóa bill" 
          tooltipOptions={{ className: 'blue-tooltip', position: 'top' }}
          onClick={() => this.confirmDeleteBill(rowData)}
          disabled={!rowData._id}
        />
      </React.Fragment>
    );
  }

  render() {
    const header = (
      <div className="table-header">
        <h5 className="p-m-0">Quản lý hóa đơn</h5>
      </div>
    );
    const BillDialogFooter = (
      <React.Fragment>
        <Button
          label="Hủy"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={()=>this.onHide("billDialog")}
        />
        <Button
          label="Tính"
          icon="pi pi-check"
          className="p-button-success"
          onClick={this.TinhBill}
        />
      </React.Fragment>
    );
       const RecalculateBillDialogFooter = (
      <React.Fragment>
        <Button
          label="Hủy"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={()=>this.onHide("ViewBillDialog")}
        />
        <Button
          label="Tính lại bill"
          icon="pi pi-check"
          className="p-button-success"
          onClick={this.RecalculateBill}
        />
      </React.Fragment>
    );
    const ConfirmDialogFooter = (
      <React.Fragment>
        <Button
          label="Hủy"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={()=>this.onHide("ConfirmBillDialog")}
        />
        <Button
          label="Xác nhận"
          icon="pi pi-check"
          className="p-button-success"
          onClick={this.ThanhToan}
        />
      </React.Fragment>
    );
    const deleteBillDialogFooter = (
      <React.Fragment>
        <Button
          label="Không"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={()=> this.onHide("deleteBillDialog")}
        />
        <Button
          label="Có"
          icon="pi pi-check"
          className="p-button-success"
          onClick={this.deleteBill}
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
            value={this.state.bills ? Object.values(this.state.bills) : null}
           
            // onSelectionChange={(e) =>
            //   this.setState({ selectedBills: e.value })
            // }
            dataKey="id"
            paginator
            rows={5}
          //  rowsPerPageOptions={[5, 10, 25]}
          //   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          //  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
           globalFilter={this.state.globalFilter}
            header={header}
          >
       
            <Column field="RoomNumber" header="Phòng" ></Column>
            <Column
              field="TotalBill"
              header="Tổng tiền"
              body={this.priceBodyTemplate}
              sortable
            ></Column>
            <Column 
            field="Status" 
            header="Tình trạng"
            body={this.statusBodyTemplate} >
            
            </Column>
          
            <Column body={this.actionBodyTemplate}></Column>
          </DataTable>
        </div>
        <Dialog
          visible={this.state.billDialog}
          style={{ width: "450px" }}
          header="Tính tiền phòng"
          modal
          className="p-fluid"
          footer={BillDialogFooter}
          onHide={()=>this.onHide("billDialog")}
        >   
        <div className="p-field">
            <label htmlFor="">Chọn tháng tính tiền:</label>
            <Calendar
              id="monthpicker"
              className="p-mr-2"
              value={this.state.selectedMonth}
              onChange={this.onMonthChange}
              view="month" dateFormat="mm/yy"
              showIcon
              yearNavigator
              yearRange="2010:2030"
              />
          </div>    
          <div className="p-field">
            <label htmlFor="">Nhà</label>
            <Dropdown
              className="p-mr-2"
              value={this.state.selectedShowHouse}
              options={this.props.listHouse.data}
              onChange={this.onHousesChange}
              optionLabel="Name"
              placeholder="Chọn nhà trọ"
            />
          </div>
          <div className="p-field">
            <label htmlFor="RoomNumber">Phòng</label>
            <Dropdown
              className="p-mr-2"
              value={this.state.selectedShowRoom}
              options={this.props.listRoom.data}
              onChange={this.onRoomsChange}
              optionLabel="RoomNumber"
              placeholder="Chọn phòng trọ"
            />
          </div>
        </Dialog>
        <Dialog
          visible={this.state.ConfirmBillDialog}
          style={{ width: "450px" }}
          header="Xác định thanh toán"
          modal
          className="p-fluid"
          footer={ConfirmDialogFooter}
          onHide={()=>this.onHide("ConfirmBillDialog")}
        >
          <div className="p-field">
            <div className="p-formgrid p-grid">
              <div className="p-field-radiobutton p-col-6">
                <RadioButton
                  inputId="Status1"
                  name="Status"
                  value={1}
                  onChange={this.onStatusChange}
                  checked={this.state.bill.Status === 1}
                />
                <label htmlFor="Status1">Đã thanh toán</label>
              </div>
              <div className="p-field-radiobutton p-col-6">
                <RadioButton
                  inputId="Status2"
                  name="Status"
                  value={0}
                  onChange={this.onStatusChange}
                  checked={this.state.bill.Status === 0}
                />
                <label htmlFor="Status2">Chưa thanh toán</label>
              </div>
            </div>
          </div>
        </Dialog>
        <Dialog
          visible={this.state.ViewBillDialog}
          style={{ width: "450px" }}
          header="Chi tiết hóa đơn"
          modal
          className="p-fluid"
          footer={RecalculateBillDialogFooter}
          onHide={()=>this.onHide("ViewBillDialog")}
        >
           <div className="p-field">
            <label htmlFor="RoomNumber">Phòng số</label>
            <InputText
              id="RoomNumber"
              value={this.state.bill.RoomNumber}
              onChange={(e) => this.onInputChange(e, "TotalBill")}
              disabled
            />
          </div>
          <div className="p-field">
            <label htmlFor="TotalBill">Tổng tiền</label>
            <InputNumber
              id="TotalBill"
              value={this.state.bill.TotalBill}
              onValueChange={(e) => this.onInputNumberChange(e, "TotalBill")}
              mode="currency"
              currency="Vnd"
              disabled
            />
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="WaterFee">Tiền Nước</label>
              <InputNumber
              id="WaterFee"
              value={this.state.bill.WaterFee}
              onValueChange={(e) => this.onInputNumberChange(e, "WaterFee")}
              mode="currency"
              currency="Vnd"
              disabled
            />
            </div>
            <div className="p-field p-col">
              <label htmlFor="AmountOfWater">Chỉ số nước sử dụng</label>
              <InputNumber
              id="AmountOfWater"
              value={this.state.bill.AmountOfWater}
              onValueChange={(e) => this.onInputNumberChange(e, "ElectricFee")}
              disabled
            /> </div>
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="WaterFee">Tiền Điện</label>
              <InputNumber
              id="WaterFee"
              value={this.state.bill.ElectricFee}
              //onValueChange={(e) => this.onInputNumberChange(e, "WaterFee")}
              mode="currency"
              currency="Vnd"
              disabled
            />
            </div>
            <div className="p-field p-col">
              <label htmlFor="AmountOfElectric">Chỉ số Điện sử dụng</label>
              <InputNumber
              id="AmountOfElectric"
              value={this.state.bill.AmountOfElectric}
              onValueChange={(e) => this.onInputNumberChange(e, "AmountOfElectric")}
              disabled
            /> </div>
          </div>
          <div className="p-field">
            <label htmlFor="OtherCosts">Ghi chú</label>
            <InputTextarea
              id="OtherCosts"
              value={this.state.bill.OtherCosts}
              onChange={(e) => this.onInputChange(e, "OtherCosts")}
              required
              rows={3}
              cols={10}
              disabled
            />
          </div>
        
        </Dialog>
        {/* Xoa bill */}
        <Dialog
          visible={this.state.deleteBillDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteBillDialogFooter}
          onHide={()=>this.onHide("deleteBillDialog")}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.bill && (
              <span>
                Bạn chắn chắn muốn xóa đã chọn ???
              </span>
            )}
          </div>
        </Dialog>
          {/* Thong bao  */}
        <Dialog
          visible={this.state.listRoomDialog}
          style={{ width: "250px",overflow: "auto" }}
          header="Danh sách phòng"
          modal
          className="p-fluid"
          onHide={()=>this.onHide('listRoomDialog')}
        >
        <div className="card1">
          <DataTable
            ref={(el) => (this.dt = el)}
            value={this.props.listRoom.data}
            dataKey="_id"
            //selectionMode="multiple" 
            selection={this.state.selectedRooms} 
            onSelectionChange={(e) => this.setState({ selectedRooms: e.value })}
            
          >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column field="RoomNumber" header="Tên Phòng" ></Column>
            
           
          </DataTable>    
        </div>
        <Button
          label="Thông báo"
          icon="pi pi-bill"
          className="p-button-success"
          onClick={() => this.confirm('deleteServiceDialog')}
          disabled={!this.state.selectedRooms || !this.state.selectedRooms.length}/>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    //room
    listRoom: state.RoomReducer.listRoom,
    //Bill
    listBill: state.BillReducer.listBill,
    createStatus: state.BillReducer.createStatus,
    editStatus: state.BillReducer.editStatus,
    deleteStatus: state.BillReducer.deleteStatus,
    recalculateBillStatus:state.BillReducer.recalculateBillStatus,
    //house
    listHouse: state.HouseReducer.listHouse,
  };
}
export default withGlobalContext(
  connect(mapStateToProps, {recalculateBill,getRoomByHouseId,getHouseByUserId, getBillInMonthOfUser ,createBill, editBill, deleteBill})(TinhTien),
);