import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown";
import BillService from '../service/billService';
import { RadioButton } from "primereact/radiobutton";
import classNames from 'classnames';
import '../index.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import '../index.css';

class TinhTien extends Component {
  emptyBill = {
    id: null,
    RoomId: null,
    RoomNumber: null,
    ElectricFee: null,
    WaterFree: null,
    RoomPrice: 0,
    TotalBill: 0,
    DateCreate: "",
    OtherCrosts: null,
    StartDate:"",
    EndDate:"",
    Status:null
  };

  constructor(props) {
    super(props);
   
    this.state = {
      bills: null,
      billDialog: false,
      deleteBillDialog: false,
      deleteBillsDialog: false,
      bill: this.emptyBill,
      selectedBills: null,
      submitted: false,
      globalFilter: null,
      selectedHouse: null,
      selectedRoom:null
    };

    this.billService = new BillService();
    this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
   
    this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.openNew = this.openNew.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.saveBill = this.saveBill.bind(this);
    this.editBill = this.editBill.bind(this);
    this.confirmDeleteBill = this.confirmDeleteBill.bind(this);
    this.deleteBill = this.deleteBill.bind(this);
    this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
    this.deleteSelectedBills = this.deleteSelectedBills.bind(this);

    this.onRoomsChange = this.onRoomsChange.bind(this);
    this.onHousesChange = this.onHousesChange.bind(this);

    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeleteBillDialog = this.hideDeleteBillDialog.bind(this);
    this.hideDeleteBillsDialog = this.hideDeleteBillsDialog.bind(this);
  }

  componentDidMount() {
    this.billService
      .getBills()
      .then(data => this.setState({ bills: data }));
  }

  formatCurrency(value) {
    return value.toLocaleString("vnd", {
      style: "currency",
      currency: "VND"
    });
  }
  onRoomsChange(e) {
    this.setState({ selectedRoom: e.value });
  }
  onHousesChange(e) {
    this.setState({ selectedHouse: e.value });
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

  hideDeleteBillDialog() {
    this.setState({ deleteBillDialog: false });
  }

  hideDeleteBillsDialog() {
    this.setState({ deleteBillsDialog: false });
  }

  saveBill() {
    let state = { submitted: true };
    if (this.state.bill.id) {
      let bills = [...this.state.bills];
      let bill = { ...this.state.bill };
      if (this.state.bill.id) {
        const index = this.findIndexById(this.state.bill.id);
        bills[index] = bill;
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "Bill Updated",
          life: 3000
        });
      } else {
        bills.push(bill);
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "Bill Created",
          life: 3000
        });
      }

      state = {
        ...state,
        bills,
        productDialog: false,
        bill: this.emptyBill
      };
    }
    this.setState(state);
  }

  editBill(bill) {
    this.setState({
      bill: { ...bill },
      billDialog: true
    });
  }

  confirmDeleteBill(bill) {
    this.setState({
      bill,
      deleteBillDialog: true
    });
  }

  deleteBill() {
    let bills = this.state.bills.filter(
      (val) => val.id !== this.state.bill.id
    );
    this.setState({
      bills,
      deleteBillDialog: false,
      bill: this.emptyBill
    });
    this.toast.show({
      severity: "success",
      summary: "Successful",
      detail: "Bill Deleted",
      life: 3000
    });
  }

  findIndexById(id) {
    let index = -1;
    for (let i = 0; i < this.state.bills.length; i++) {
      if (this.state.bills[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId() {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  

  confirmDeleteSelected() {
    this.setState({ deleteBillsDialog: true });
  }

  deleteSelectedBills() {
    let bills = this.state.bills.filter(
      (val) => !this.state.selectedBills.includes(val)
    );
    this.setState({
      bills,
      deleteBillsDialog: false,
      selectedBills: null
    });
    this.toast.show({
      severity: "success",
      summary: "Successful",
      detail: "Bills Deleted",
      life: 3000
    });
  }
  onStatusChange(e) {
    let bill = { ...this.state.bill };
    bill["Status"] = e.value;
    this.setState({ bill });
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

  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <Dropdown
          className="p-mr-2"
          value={this.state.selectedCity1}
          options={this.state.products}
          onChange={this.onCityChange}
          optionLabel="name"
          placeholder="Select a City"
          disabled={!this.state.selectedKhuTro}
        />
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={this.openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={this.confirmDeleteSelected}
          disabled={
            !this.state.selectedBills || !this.state.selectedBills.length
          }
        />
      </React.Fragment>
    );
  }
  priceBodyTemplate(rowData) {
    return this.formatCurrency(rowData.price);
  }

  statusBodyTemplate(rowData) {
    return (
      <span
        className={`product-badge status-${rowData.Status.toLowerCase()}`}
      >
        {rowData.Status}
      </span>
    );
  }
  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => this.editBill(rowData)}
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
        <h5 className="p-m-0">Tính tiền</h5>
      </div>
    );
    const productDialogFooter = (
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
          onClick={this.saveBill}
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
    const deleteBillsDialogFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDeleteBillsDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.deleteSelectedBills}
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
            value={this.state.products}
            selection={this.state.selectedBills}
            onSelectionChange={(e) =>
              this.setState({ selectedBills: e.value })
            }
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            globalFilter={this.state.globalFilter}
            header={header}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "5rem" }}
            ></Column>
            <Column field="name" header="Tên Phòng" sortable></Column>
            <Column
              field="price"
              header="Giá Phòng"
              body={this.priceBodyTemplate}
              sortable
            ></Column>
            <Column field="address" header="Địa Chỉ" sortable></Column>
            <Column field="description" header="Ghi chú" sortable></Column>
            <Column
              field="inventoryStatus"
              header="Tình Trạng"
              body={this.statusBodyTemplate}
              sortable
            ></Column>
            <Column body={this.actionBodyTemplate}></Column>
          </DataTable>
        </div>

        <Dialog
          visible={this.state.productDialog}
          style={{ width: "450px" }}
          header="Thông tin khu trọ"
          modal
          className="p-fluid"
          footer={productDialogFooter}
          onHide={this.hideDialog}
        >
          <div className="p-field">
            <label htmlFor="name">Tên Khu Trọ</label>
            <InputText
              id="name"
              value={this.state.product.name}
              onChange={(e) => this.onInputChange(e, "name")}
              required
              autoFocus
              className={classNames({
                "p-invalid": this.state.submitted && !this.state.product.name
              })}
            />
            {this.state.submitted && !this.state.product.name && (
              <small className="p-invalid">Name is required.</small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="address">Địa chỉ</label>
            <InputTextarea
              id="address"
              value={this.state.product.address}
              onChange={(e) => this.onInputChange(e, "address")}
              required
              rows={3}
              cols={10}
            />
          </div>
          <div className="p-field">
            <label htmlFor="description">Ghi chú</label>
            <InputTextarea
              id="description"
              value={this.state.product.description}
              onChange={(e) => this.onInputChange(e, "description")}
              required
            />
          </div>
          <div className="p-field">
            <label className="p-mb-3">Tình trang</label>
            <div className="p-formgrid p-grid">
              <div className="p-field-radiobutton p-col-6">
                <RadioButton
                  inputId="inventoryStatus1"
                  name="inventoryStatus"
                  value="INSTOCK"
                  onChange={this.onStatusChange}
                  checked={this.state.product.inventoryStatus === "INSTOCK"}
                />
                <label htmlFor="inventoryStatus1">Còn phòng</label>
              </div>
              <div className="p-field-radiobutton p-col-6">
                <RadioButton
                  inputId="inventoryStatus2"
                  name="inventoryStatus"
                  value="LOWSTOCK"
                  onChange={this.onStatusChange}
                  checked={this.state.product.inventoryStatus === "LOWSTOCK"}
                />
                <label htmlFor="inventoryStatus2">Hết Phòng</label>
              </div>
              <div className="p-field-radiobutton p-col-6">
                <RadioButton
                  inputId="inventoryStatus3"
                  name="inventoryStatus"
                  value="OUTOFSTOCK"
                  onChange={this.onStatusChange}
                  checked={this.state.product.inventoryStatus === "OUTOFSTOCK"}
                />
                <label htmlFor="inventoryStatus4">Đang sửa chữa</label>
              </div>
            </div>
          </div>

          <div className="p-field">
            <label htmlFor="price">Giá cả</label>
            <InputNumber
              id="price"
              value={this.state.product.price}
              onValueChange={(e) => this.onInputNumberChange(e, "price")}
              mode="currency"
              currency="Vnd"
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
            {this.state.product && (
              <span>
                Bạn chắn chắn muốn xóa đã chọn ??? <b>{this.state.product.name}</b>
                ?
              </span>
            )}
          </div>
        </Dialog>

        <Dialog
          visible={this.state.deleteBillsDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteBillsDialogFooter}
          onHide={this.hideDeleteBillsDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.product && (
              <span>
                Bạn chắc chắn muốn xóa tất cả đã chọn ??
              </span>
            )}
          </div>
        </Dialog>
      </div>
    );
  }
  }

export default TinhTien;
