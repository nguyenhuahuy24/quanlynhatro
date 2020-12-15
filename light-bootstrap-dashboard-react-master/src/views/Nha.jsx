
import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import NhaTroService from '../service/nhatroService';
import { RadioButton } from "primereact/radiobutton";
import classNames from 'classnames';
import '../index.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';

class Nha extends Component {
  emptyHouse = {
    houseId: null,
    name: '',
    address: null,
    UserId: null
  };
  constructor(props) {
    super(props);

    this.state = {
      houses: null,
      houseDialog: false,
      deleteHouseDialog: false,
      deleteHousesDialog: false,
      house: this.emptyHouse,
      selectedHouses: null,
      submitted: false,
      globalFilter: null
    };

    this.houseService = new NhaTroService();
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.openNew = this.openNew.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.saveHouse = this.saveHouse.bind(this);
    this.editHouse = this.editHouse.bind(this);
    this.confirmDeleteHouse = this.confirmDeleteHouse.bind(this);
    this.deleteHouse = this.deleteHouse.bind(this);
    this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
    this.deleteSelectedHouses = this.deleteSelectedHouses.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeleteHouseDialog = this.hideDeleteHouseDialog.bind(this);
    this.hideDeleteHousesDialog = this.hideDeleteHousesDialog.bind(this);
  }
  componentDidMount() {
    this.houseService
      .getHouses()
      .then(data => this.setState({ houses: data }));
  }
  openNew() {
    this.setState({
      house: this.emptyHouse,
      submitted: false,
      houseDialog: true
    });
  }
  hideDialog() {
    this.setState({
      submitted: false,
      houseDialog: false
    });
  }
  hideDeleteHouseDialog() {
    this.setState({ deleteHouseDialog: false });
  }
  hideDeleteHousesDialog() {
    this.setState({ deleteHousesDialog: false });
  }
  saveHouse() {
    let state = { submitted: true };
    if (this.state.house.name.trim()) {
      let houses = [...this.state.houses];
      let house = { ...this.state.house };
      if (this.state.house.id) {
        const index = this.findIndexById(this.state.house.id);
        houses[index] = house;
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "House Updated",
          life: 3000
        });
      } else {
        houses.push(house);
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "House Created",
          life: 3000
        });
      }

      state = {
        ...state,
        houses,
        houseDialog: false,
        house: this.emptyHouse
      };
    }
    this.setState(state);
  }
  editHouse(house) {
    this.setState({
      house: { ...house },
      houseDialog: true
    });
  }
  confirmDeleteHouse(house) {
    this.setState({
      house,
      deleteHouseDialog: true
    });
  }
  deleteHouse() {
    let houses = this.state.houses.filter(
      (val) => val.id !== this.state.house.id
    );
    this.setState({
      houses,
      deleteHouseDialog: false,
      house: this.emptyHouse,
    });
    this.toast.show({
      severity: "success",
      summary: "Successful",
      detail: "House Deleted",
      life: 3000
    });
  }
  findIndexById(id) {
    let index = -1;
    for (let i = 0; i < this.state.houses.length; i++) {
      if (this.state.houses[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
  confirmDeleteSelected() {
    this.setState({ deleteHousesDialog: true });
  }
  deleteSelectedHouses() {
    let houses = this.state.houses.filter(
      (val) => !this.state.selectedHouses.includes(val)
    );
    this.setState({
      houses,
      deleteHousesDialog: false,
      selectedHouses: null
    });
    this.toast.show({
      severity: "success",
      summary: "Successful",
      detail: "Houses Deleted",
      life: 3000
    });

  }
  onStatusChange(e) {
    let house = { ...this.state.house };
    house["inventoryStatus"] = e.value;
    this.setState({ house });
  }
  onInputChange(e, name) {
    const val = (e.target && e.target.value) || "";
    let house = { ...this.state.house };
    house[`${name}`] = val;

    this.setState({ house });
  }
  onInputNumberChange(e, name) {
    const val = e.value || 0;
    let house = { ...this.state.house };
    house[`${name}`] = val;

    this.setState({ house });
  }
  rightToolbarTemplate() {
    return (
      <React.Fragment>
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
            !this.state.selectedHouses || !this.state.selectedHouses.length
          }
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
          onClick={() => this.editHouse(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => this.confirmDeleteHouse(rowData)}
        />
      </React.Fragment>
    );
  }
  render() {
    const header = (
      <div className="table-header">
        <h5 className="p-m-0">Quản lý nhà trọ</h5>
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
    const houseDialogFooter = (
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
          onClick={this.saveHouse}
        />
      </React.Fragment>
    );
    const deleteHouseDialogFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDeleteHouseDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.deleteHouse}
        />
      </React.Fragment>
    );
    const deleteHousesDialogFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDeleteHousesDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.deleteSelectedHouses}
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
          <DataTable ref={(el) => this.dt = el} value={this.state.houses} selection={this.state.selectedHouses} onSelectionChange={(e) => this.setState({ selectedHouses: e.value })}
            dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} houses"
            globalFilter={this.state.globalFilter}
            header={header}>

            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column field="name" header="Tên nhà trọ" ></Column>
            <Column field="address" header="Địa chỉ" ></Column>
            <Column body={this.actionBodyTemplate}></Column>
          </DataTable>
        </div>

        <Dialog
          visible={this.state.houseDialog}
          style={{ width: "450px" }}
          header="Thông tin khu trọ"
          modal
          className="p-fluid"
          footer={houseDialogFooter}
          onHide={this.hideDialog}
        >
          <div className="p-field">
            <label htmlFor="name">Tên Nhà Trọ</label>
            <InputText
              id="name"
              value={this.state.house.name}
              onChange={(e) => this.onInputChange(e, "name")}
              required
              autoFocus
              className={classNames({
                "p-invalid": this.state.submitted && !this.state.house.name
              })}
            />
            {this.state.submitted && !this.state.house.name && (
              <small className="p-invalid">Tên không được trống.</small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="address">Địa chỉ</label>
            <InputTextarea
              id="address"
              value={this.state.house.address}
              onChange={(e) => this.onInputChange(e, "address")}
              required
              rows={3}
              cols={10}
            />
          </div>
        </Dialog>
        <Dialog
          visible={this.state.deleteHouseDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteHouseDialogFooter}
          onHide={this.hideDeleteHouseDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.house && (
              <span>
                Bạn chắn chắn muốn xóa đã chọn ??? <b>{this.state.house.name}</b>
                ?
              </span>
            )}
          </div>
        </Dialog>
        <Dialog
          visible={this.state.deleteHousesDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteHousesDialogFooter}
          onHide={this.hideDeleteHousesDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.house && (
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

export default Nha;
