import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar'
import { Dropdown } from "primereact/dropdown";
import { InputText } from 'primereact/inputtext';
import NhaTroService from '../service/nhatroService';
import UtilityBillService from '../service/utilityBillService';
import PhongTroService from '../service/phongtroService';
import '../index.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import UserContext from "../context/UserContext";
class Nuoc extends Component {
  emptyNuoc = {
    Time: new Date(),
    WaterNumber: 0,
    RoomId: ""
  };

  constructor(props) {
    super(props);

    this.state = {
      rooms:null,
      houses: null,
      Nuocs: null,
      //loginuserID: localStorage.getItem("userIDlogin"),
      Nuoc: this.emptyNuoc,
      submitted: false,
      NuocDialog: false,
      selectedShowHouse: null,
      selectedHouse: null,
      selectedRoom: null,
      selectedShowRoom: null,
      selectedMonth: null
    };

    this.utilityService = new UtilityBillService();
    this.nhatroService = new NhaTroService();
    this.phongtroService = new PhongTroService();
    this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    this.saveNuoc = this.saveNuoc.bind(this);
    this.editNuoc = this.editNuoc.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.onNhaChange = this.onNhaChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
  }

  componentDidMount() {
    this.houseService
      .getHouseByUserId(this.state.loginuserID)
      .then(data => this.setState({ houses: data }));
  }
  componentDidUpdate() {
    this.utilityBillService
      .getAllUtilityBillByHouseId(this.state.selectedNha)
      .then(data => this.setState({ Nuocs: data }));
  }
  /* onCityChange(e) {
     this.setState({ selectedCity1: e.value });
   }
   */
  editNuoc(Nuoc) {
    this.setState({
      Nuoc: { ...Nuoc },
      NuocDialog: true
    });
  }
  hideDialog() {
    this.setState({
      submitted: false,
      NuocDialog: false
    });
  }
  saveNuoc() {
    let state = { submitted: true };
    //  let Nuocs = [...this.state.Nuocs];
    let Nuoc = { ...this.state.Nuoc };
    // if (this.state.Nuoc._id) {
    //   const index = this.findIndexById(this.state.Nuoc.id);
    this.utilityBillService.updateUtilityBill(this.state.Nuoc._id, Nuoc).then();
    // Nuocs[index] = Nuoc;
    this.toast.show({
      severity: "success",
      summary: "Successful",
      detail: "Cập nhập chỉ số nước thành công",
      life: 3000
    });
    // }
    state = {
      ...state,
      // Nuocs,
      Nuoc: this.emptyNuoc
    };
    this.setState(state);
  }
  onInputNumberChange(e, name) {
    const val = e.value || 0;
    let Nuoc = { ...this.state.Nuoc };
    Nuoc[`${name}`] = val;

    this.setState({ Nuoc });
  }
  onNhaChange(e) {
    this.setState({ selectedNha: e.value._id });
  }
  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <h4 className="p-m-0">Chỉ số Nước</h4>
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
  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => this.editNuoc(rowData)}
        />
      </React.Fragment>
    );
  }
  render() {
    console.log(this.state.selectedMonth)
    const header = (
      <div className="table-header">

        <span className="p-input-icon-right">
          <h7 className="p-mr-2">Tháng/Năm </h7>
          <Calendar
            id="monthpicker"
            className="p-mr-2"
            value={this.state.selectedMonth}
            onChange={(e) => this.setState({ selectedMonth: e.value })}
            view="month" dateFormat="mm/yy"
            showIcon
            yearNavigator
            yearRange="2010:2030" />
          <Dropdown
            className="p-mr-2"
            value={this.state.selectedNha}
            options={this.state.houses}
            onChange={this.onNhaChange}
            optionLabel="Name"
            placeholder="Chọn nhà trọ"

          />
          <Button
            label="Xem"
            icon="pi pi-search-plus"
            className="p-button-success"
            onClick={""}
          />
        </span>
      </div>
    );
    const NuocDialogFooter = (
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
          onClick={this.saveNuoc}
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
            value={this.state.Nuocs}
            dataKey="id"
            className="p-datatable-gridlines"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} "
            header={header}
          >
            <Column field="RoomNumber" header="Phòng" ></Column>
            <Column field="WaterNumber" header="CS Nước Mới" ></Column>
            <Column body={this.actionBodyTemplate}></Column>
          </DataTable>
        </div>
        <Dialog
          visible={this.state.NuocDialog}
          style={{ width: "450px" }}
          header="Thông tin chỉ số nước"
          modal
          className="p-fluid"
          footer={NuocDialogFooter}
          onHide={this.hideDialog}
        >
          <div className="p-field">
            <label htmlFor="">Nhà</label>
            <Calendar
              id="monthpicker"
              className="p-mr-2"
              value={this.state.selectedMonth}
              onChange={(e) => this.setState({ selectedMonth: e.value})}
              view="month" dateFormat="mm/yy"
              showIcon
              yearNavigator
              yearRange="2010:2030" />

          </div>
          <div className="p-field">
            <label htmlFor="RoomId">Phòng</label>
            <InputText
              id="RoomId"
              value={this.state.Nuoc.RoomId}
              disabled
            />
          </div>
          <div className="p-field">
            <label>Chỉ số nước mới</label>
            <InputText
              id="WaterNumber"
              value={this.state.Nuoc.WaterNumber}
              onValueChange={(e) => this.onInputNumberChange(e, "WaterNumber")}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default Nuoc;
