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
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown";
import DichVuService from '../service/dichvuService';
import { RadioButton } from "primereact/radiobutton";
import classNames from 'classnames';

class DichVu extends Component {
  emptyDV = {
    id: null,
    name: "",
    caterogy: "",
    price: 0,
    status: ""
  };

  constructor(props) {
    super(props);

    this.state = {
      DVs: null,
      DVDialog: false,
      deleteDVDialog: false,
      deleteDVsDialog: false,
      DV: this.emptyDV,
      selectedDVs: null,
      submitted: false,
      globalFilter: null,
      selectedCategory: null,
      
    };

    this.DVService = new DichVuService();
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);

    this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.openNew = this.openNew.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.saveDV = this.saveDV.bind(this);
    this.editDV = this.editDV.bind(this);
    this.confirmDeleteDV = this.confirmDeleteDV.bind(this);
    this.deleteDV = this.deleteDV.bind(this);
    this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
    this.deleteSelectedDVs = this.deleteSelectedDVs.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeleteDVDialog = this.hideDeleteDVDialog.bind(this);
    this.hideDeleteDVsDialog = this.hideDeleteDVsDialog.bind(this);
    this.onDichVuChange = this.onDichVuChange.bind(this);
  }
  componentDidMount() {
    this.DVService
      .getDichVus()
      .then(data => this.setState({ DVs: data }));
  }
  formatCurrency(value) {
    return value.toLocaleString("vnd", {
      style: "currency",
      currency: "VND"
    });
  }
  openNew() {
    this.setState({
      DV: this.emptyDV,
      submitted: false,
      DVDialog: true
    });
  }
  onDichVuChange(e) {
     this.setState({ selectedCategory: e.value });
   }
  hideDialog() {
    this.setState({
      submitted: false,
      DVDialog: false
    });
  }
  hideDeleteDVDialog() {
    this.setState({ deleteDVDialog: false });
  }
  hideDeleteDVsDialog() {
    this.setState({ deleteDVsDialog: false });
  }
  saveDV() {
    let state = { submitted: true };

    if (this.state.DV.name.trim()) {
      let DVs = [...this.state.DVs];
      let DV = { ...this.state.DV };
      if (this.state.DV.id) {
        const index = this.findIndexById(this.state.DV.id);

        DVs[index] = DV;
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "Dịch Vụ Updated",
          life: 3000
        });
      } else {
        DVs.push(DV);
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "Dịch Vụ Created",
          life: 3000
        });
      }

      state = {
        ...state,
        DVs,
        DVDialog: false,
        DV: this.emptyDV
      };
    }
    this.setState(state);
  }
  editDV(DV) {
    this.setState({
      DV: { ...DV },
      DVDialog: true
    });
  }
  confirmDeleteDV(DV) {
    this.setState({
      DV,
      deleteDVDialog: true
    });
  }
  deleteDV() {
    let DVs = this.state.DVs.filter(
      (val) => val.id !== this.state.DV.id
    );
    this.setState({
      DVs,
      deleteDVDialog: false,
      DV: this.emptyDV
    });
    this.toast.show({
      severity: "success",
      summary: "Successful",
      detail: "DV Deleted",
      life: 3000
    });
  }
  findIndexById(id) {
    let index = -1;
    for (let i = 0; i < this.state.DVs.length; i++) {
      if (this.state.DVs[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  confirmDeleteSelected() {
    this.setState({ deleteDVsDialog: true });
  }
  deleteSelectedDVs() {
    let DVs = this.state.DVs.filter(
      (val) => !this.state.selectedDVs.includes(val)
    );
    this.setState({
      DVs,
      deleteDVsDialog: false,
      selectedDVs: null
    });
    this.toast.show({
      severity: "success",
      summary: "Successful",
      detail: "DVs Deleted",
      life: 3000
    });
  }
  onStatusChange(e) {
    let DV = { ...this.state.DV };
    DV["status"] = e.value;
    this.setState({ DV });
  }
  onInputChange(e, name) {
    const val = (e.target && e.target.value) || "";
    let DV = { ...this.state.DV };
    DV[`${name}`] = val;
    this.setState({ DV });
  }
  onInputNumberChange(e, name) {
    const val = e.value || 0;
    let DV = { ...this.state.DV };
    DV[`${name}`] = val;

    this.setState({ DV });
  }
  rightToolbarTemplate() {
    return (
      <React.Fragment>
        <Button
          label="Thêm dịch vụ"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={this.openNew}
        />
        <Button
          label="Xóa"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={this.confirmDeleteSelected}
          disabled={
            !this.state.selectedDVs || !this.state.selectedDVs.length
          }
        />
      </React.Fragment>
    );
  }
  priceBodyTemplate(rowData) {
    return this.formatCurrency(rowData.price);
  }
  statusBodyTemplate(rowData) {
    if (rowData.status == "1") {
      return <span className={`product-badge status-1`}>{"Đang Sử dụng"}</span>;
    }
    if (rowData.status == "0") { return <span className={`product-badge status-0`}>{"Hết Sử Dụng"}</span>; }
  }
  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => this.editDV(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => this.confirmDeleteDV(rowData)}
        />
      </React.Fragment>
    );
  }

  render() {
    const header = (
      <div className="table-header">
        <h5 className="p-m-0">Quản lý dịch vụ</h5>
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
    const DVDialogFooter = (
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
          onClick={this.saveDV}
        />
      </React.Fragment>
    );
    const deleteDVDialogFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDeleteDVDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.deleteDV}
        />
      </React.Fragment>
    );
    const deleteDVsDialogFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDeleteDVsDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.deleteSelectedDVs}
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
            value={this.state.DVs}
            selection={this.state.selectedDVs}
            onSelectionChange={(e) =>
              this.setState({ selectedDVs: e.value })
            }
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} DVs"
            globalFilter={this.state.globalFilter}
            header={header}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "5rem" }}
            ></Column>
            <Column field="name" header="Tên Dịch Vụ" sortable></Column>
            <Column
              field="price"
              header="Giá dịch vụ"
              body={this.priceBodyTemplate}
              sortable
            ></Column>
            <Column
              field="status"
              header="Tình Trạng"
              body={this.statusBodyTemplate}
              sortable
            ></Column>
            <Column body={this.actionBodyTemplate}></Column>
          </DataTable>
        </div>

        <Dialog
          visible={this.state.DVDialog}
          style={{ width: "450px" }}
          header="Thông tin khu trọ"
          modal
          className="p-fluid"
          footer={DVDialogFooter}
          onHide={this.hideDialog}
        >
          <div className="p-field">
            <label htmlFor="name">Tên dịch vụ</label>
            <InputText
              id="name"
              value={this.state.DV.name}
              onChange={(e) => this.onInputChange(e, "name")}
              required
              autoFocus
              className={classNames({
                "p-invalid": this.state.submitted && !this.state.DV.name
              })}
            />
            {this.state.submitted && !this.state.DV.name && (
              <small className="p-invalid">Tên không được để trống.</small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="price">Giá cả</label>
            <InputNumber
              id="price"
              value={this.state.DV.price}
              onValueChange={(e) => this.onInputNumberChange(e, "price")}
              mode="currency"
              currency="Vnd"
            />
          </div>
          <div className="p-field">
            <label htmlFor="price">Loại</label>
            <Dropdown
              className="p-mr-2"
              value={this.state.selectedCategory}
              options={this.state.DV.caterogy}
              onChange={this.selectedCategory}
              optionLabel="name"
              placeholder="Chọn loại dịch vụ"
            />
          </div>
          <div className="p-field">
            <label htmlFor="description">Ghi chú</label>
            <InputTextarea
              id="description"
              value={this.state.DV.description}
              onChange={(e) => this.onInputChange(e, "description")}
              required
            />
          </div>
          <div className="p-field">
            <label className="p-mb-3">Tình trang</label>
            <div className="p-formgrid p-grid">
              <div className="p-field-radiobutton p-col-6">
                <RadioButton
                  inputId="status1"
                  name="status"
                  value={1}
                  onChange={this.onStatusChange}
                  checked={this.state.DV.status === 1}
                />
                <label htmlFor="status1">Đang Sử dụng</label>
              </div>
              <div className="p-field-radiobutton p-col-6">
                <RadioButton
                  inputId="status2"
                  name="status"
                  value={0}
                  onChange={this.onStatusChange}
                  checked={this.state.DV.status === 0}
                />
                <label htmlFor="status2">Không sử dụng</label>
              </div>

            </div>
          </div>
        </Dialog>
        <Dialog
          visible={this.state.deleteDVDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteDVDialogFooter}
          onHide={this.hideDeleteDVDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.DV && (
              <span>
                Bạn chắn chắn muốn xóa đã chọn ??? <b>{this.state.DV.name}</b>
                 ?
              </span>
            )}
          </div>
        </Dialog>
        <Dialog
          visible={this.state.deleteDVsDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteDVsDialogFooter}
          onHide={this.hideDeleteDVsDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.DV && (
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

export default DichVu;
