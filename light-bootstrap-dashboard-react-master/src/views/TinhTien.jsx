import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Calendar } from 'primereact/calendar'
import { RadioButton } from 'primereact/radiobutton'
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
import {getBillInMonthOfUser ,createBill, editBill, deleteBill} from '../redux/action/billAction/BillAction'
import {getHouseByUserId} from '../redux/action/houseAction/HouseAction'
import {getRoomByHouseId} from '../redux/action/roomAction/RoomAction'
import { dataStatus,userProfile } from "../utility/config";

class TinhTien extends Component {
  static contextType = UserContext
  emptyBill = {
    RoomId: null,
    RoomNumber: null,
    ElectricFee: 0,
    WaterFree: 0,
    RoomPrice: 0,
    TotalBill: 0,
    DateCreate: new Date(),
    OtherCrosts: "",
    StartDate: "",
    EndDate: "",
    Status: null
  };
  constructor(props) {
    super(props);

    this.state = {
     // loginuserID: localStorage.getItem("userIDlogin"),
      houses:null,
      room:null,
      bills: null,
      billDialog: false,
      ConfirmBillDialog:false,
      ViewBillDialog:false,
      deleteBillDialog: false,
      deleteBillsDialog: false,
      bill: this.emptyBill,
      selectedBills: null,
      submitted: false,
      globalFilter: null,
      selectedHouse: "",
      selectedShowHouse: null,
      selectedShowRoom:null,
      selectedRoom: null,
      selectedMonth: "",
      
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
    this.hideDialog = this.hideDialog.bind(this);
    this.hideConfirmBillDialog = this.hideConfirmBillDialog.bind(this);
    this.hideViewBillDialog = this.hideViewBillDialog.bind(this);
    this.ThanhToan = this.ThanhToan.bind(this);
    this.TinhBill = this.TinhBill.bind(this);
    this.ThanhToanBill = this.ThanhToanBill.bind(this);
    this.confirmDeleteBill = this.confirmDeleteBill.bind(this);
    this.deleteBill = this.deleteBill.bind(this);
    this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
    this.onRoomsChange = this.onRoomsChange.bind(this);
    this.onHousesChange = this.onHousesChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeleteBillDialog = this.hideDeleteBillDialog.bind(this);
    this.hideDeleteBillsDialog = this.hideDeleteBillsDialog.bind(this);
  }
  componentDidMount() {
    this.props.getHouseByUserId();
  }
  componentDidUpdate(prevProps, prevState){
    if (this.props.listBill !== prevProps.listBill) {
      if (this.props.listBill.status === dataStatus.SUCCESS) {
          const bills = Object.values(this.props.listBill.data.Rooms);
          let data = [];
          bills.forEach(bill => {
            if (bill.ListBill.length !== 0) {
              data.push({
               _id: bill.ListBill[0]._id,
                RoomNumber: bill.RoomNumber,
                TotalBill: bill.ListBill[0].TotalBill,
                Status: bill.ListBill[0].Status,
                OtherCosts: bill.ListBill[0].OtherCosts,
                WaterFee: bill.ListBill[0].WaterFee,
                ElectricFee:bill.ListBill[0].ElectricFee
              })
            }
          })
          console.log(`data: `,data);
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
         this.props.getBillInMonthOfUser(this.state.selectedMonth,this.state.selectedHouse,userProfile.userId);
      }
    }
    if (this.props.editStatus !== prevProps.editStatus) {
      if (this.props.editStatus.status === dataStatus.SUCCESS) {
          this.props.getBillInMonthOfUser(this.state.selectedMonth,this.state.selectedHouse,userProfile.userId);
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
          this.props.getBillInMonthOfUser(this.state.selectedMonth,his.state.selectedHouse,userProfile.userId);
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
  }
  onRoomsChange(e) {
    this.setState({ selectedRoom: e.value._id,selectedShowRoom:e.value });
  }
  onHousesChange(e) {
    this.setState({ selectedHouse: e.value._id,selectedShowHouse:e.value });
    this.props.getBillInMonthOfUser(this.state.selectedMonth,e.value._id,userProfile.userId);
    this.props.getRoomByHouseId(e.value._id);
  }
  openNew() {
    this.setState({
      bill: this.emptyBill,
      submitted: false,
      billDialog: true
    });
  }
  hideDialog() {
    this.setState({
      submitted: false,
      billDialog: false
    });
  }
  hideConfirmBillDialog() {
    this.setState({
      submitted: false,
      ConfirmBillDialog: false
    });
  }
  hideViewBillDialog() {
    this.setState({
      submitted: false,
      ViewBillDialog: false
    });
  }
  hideDeleteBillDialog() {this.setState({ deleteBillDialog: false });}
  hideDeleteBillsDialog() {this.setState({ deleteBillsDialog: false });}
  ThanhToan() {
    let state = { submitted: true }; 
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
        selectedMonth:"",
        ConfirmBillDialog: false,
        bill: this.emptyBill
      };
    this.setState(state);
  }
  TinhBill() {
    let state = { submitted: true }; 
    let a ={RoomId:this.state.selectedRoom}
    this.props.createBill(a);
    //this.billService.createBill(a).then();
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "Bill Created",
          life: 3000
        });
    state = {
        ...state,
        bills:null,
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
      this.props.getBillInMonthOfUser(this.state.selectedMonth,this.state.selectedHouse,userProfile.userId);
    }
    
  }

  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <label className="p-mr-2" htmlFor="datestart">Tháng/Năm </label>
        <Calendar
          id="monthpicker"
          className="p-mr-2"
          value={this.state.bill.DateCreate}
          onChange={this.onMonthChange}
          view="month" dateFormat="mm/yy"
          showIcon
          yearNavigator
          yearRange="2010:2030" />
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
        />
        <Button
          label="SMS"
          icon="pi pi-phone"
          className="p-button-info p-mr-2"
          onClick={"this.confirmDeleteSelected"}

        />
        <Button
          label="Email"
          icon="pi pi-envelope"
          className="p-button-primary p-mr-2"
          onClick={""}

        />
        <Button
          label="In danh sách"
          icon="pi pi-file-o"
          className="p-button-success p-mr-2"
          onClick={"this.confirmDeleteSelected"}

        />
        {/* <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={this.confirmDeleteSelected}
          disabled={
            !this.state.selectedBills || !this.state.selectedBills.length
          }
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
          onClick={()=>this.openViewBill(rowData)}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => this.ThanhToanBill(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => this.confirmDeleteBill(rowData)}
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
          label="Cancel"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDialog}
        />
        <Button
          label="Tính"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.TinhBill}
        />
      </React.Fragment>
    );
    const ConfrimDialogFooter = (
      <React.Fragment>
        <Button
          label="Cancel"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideConfirmBillDialog}
        />
        <Button
          label="Xác nhận"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.ThanhToan}
        />
      </React.Fragment>
    );
    const deleteBillDialogFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDeleteBillDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
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
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            globalFilter={this.state.globalFilter}
            header={header}
          >
            {/* <Column
              selectionMode="multiple"
              headerStyle={{ width: "5rem" }}
            ></Column> */}
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
          onHide={this.hideDialog}
        >        
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
          footer={ConfrimDialogFooter}
          onHide={this.hideConfirmBillDialog}
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
          onHide={this.hideViewBillDialog}
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
              <label htmlFor="ElectricFee">Tiền Điện</label>
              <InputNumber
              id="ElectricFee"
              value={this.state.bill.ElectricFee}
              onValueChange={(e) => this.onInputNumberChange(e, "ElectricFee")}
              mode="currency"
              currency="Vnd"
              disabled
            /> </div>
          </div>
          <div className="p-field">
            <label htmlFor="OtherCosts">Ghi chú</label>
            <InputText
              id="OtherCosts"
              value={this.state.bill.OtherCosts}
              onChange={(e) => this.onInputChange(e, "OtherCosts")}
              required
              disabled
            />
          </div>
        
        </Dialog>
        <Dialog
          visible={this.state.deleteBillDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteBillDialogFooter}
          onHide={this.hideDeleteBillDialog}
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
    //house
    listHouse: state.HouseReducer.listHouse,
  };
}
export default withGlobalContext(
  connect(mapStateToProps, {getRoomByHouseId,getHouseByUserId, getBillInMonthOfUser ,createBill, editBill, deleteBill})(TinhTien),
);