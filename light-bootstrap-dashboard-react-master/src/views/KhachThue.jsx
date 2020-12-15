import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { InputMask } from 'primereact/inputmask';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown";
import { Calendar } from 'primereact/calendar'
import KhachThueService from '../service/khachthueService';
import { RadioButton } from "primereact/radiobutton";
import classNames from 'classnames';
import '../index.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import '../index.css';
class KhachThue extends Component {
  emptyUser = {
    id: null,
    name: "",
    gender: "",
    cmnd: null,
    phone: null,
    quequan: "",
    address: "",
    noicapCMND: "",
    bdate: "",
    datestart: "",
    dateCMND: "",
    phone: null,
    idPhong: null,
    idKhuTro: null,
    price:0,
    image:null
  };

  constructor(props) {
    super(props);

    this.state = {
      users: null,
      userDialog: false,
      deleteUserDialog: false,
      deleteUsersDialog: false,
      user: this.emptyUser,
      selectedusers: null,
      submitted: false,
      globalFilter: null,
      selectedKhuTro: null,
      valdt: null,
      bdate: null,
      startdate: null,
      dateCMND: null
    };
    this.userService = new KhachThueService();
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.openNew = this.openNew.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.confirmDeleteUser = this.confirmDeleteUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
    this.deleteSelectedUsers = this.deleteSelectedUsers.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeleteUserDialog = this.hideDeleteUserDialog.bind(this);
    this.hideDeleteUsersDialog = this.hideDeleteUsersDialog.bind(this);
  }

  componentDidMount() {
    this.userService
      .getKhachThue()
      .then(data => this.setState({ users: data }));
  }

  formatCurrency(value) {
    return value.toLocaleString("vnd", {
      style: "currency",
      currency: "VND"
    });
  }
  onCityChange(e) {
    this.setState({ selectedCity1: e.value });
  }
  openNew() {
    this.setState({
      user: this.emptyUser,
      submitted: false,
      userDialog: true
    });
  }
  hideDialog() {
    this.setState({
      submitted: false,
      userDialog: false
    });
  }
  hideDeleteUserDialog() {
    this.setState({ deleteUserDialog: false });
  }
  hideDeleteUsersDialog() {
    this.setState({ deleteUsersDialog: false });
  }
  saveUser() {
    let state = { submitted: true };

    if (this.state.user.name.trim()) {
      let users = [...this.state.users];
      let user = { ...this.state.user };
      if (this.state.user.id) {
        const index = this.findIndexById(this.state.user.id);

        users[index] = user;
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "User Updated",
          life: 3000
        });
      } else {
        user.id = this.createId();
        users.push(user);
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "User Created",
          life: 3000
        });
      }

      state = {
        ...state,
        users,
        userDialog: false,
        user: this.emptyUser
      };
    }

    this.setState(state);
  }
  editUser(user) {
    this.setState({
      user: { ...user },
      userDialog: true
    });
  }
  confirmDeleteUser(user) {
    this.setState({
      user,
      deleteUserDialog: true
    });
  }
  deleteUser() {
    let users = this.state.users.filter(
      (val) => val.id !== this.state.user.id
    );
    this.setState({
      users,
      deleteUserDialog: false,
      user: this.emptyUser
    });
    this.toast.show({
      severity: "success",
      summary: "Successful",
      detail: "User Deleted",
      life: 3000
    });
  }
  findIndexById(id) {
    let index = -1;
    for (let i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i].id === id) {
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
    this.setState({ deleteUsersDialog: true });
  }

  deleteSelectedUsers() {
    let users = this.state.users.filter(
      (val) => !this.state.selectedUsers.includes(val)
    );
    this.setState({
      users,
      deleteUsersDialog: false,
      selectedUsers: null
    });
    this.toast.show({
      severity: "success",
      summary: "Successful",
      detail: "Users Deleted",
      life: 3000
    });
  }
  onStatusChange(e) {
    let user = { ...this.state.user };
    user["gender"] = e.value;
    this.setState({ user });
  }
  onInputChange(e, name) {
    const val = (e.target && e.target.value) || "";
    let user = { ...this.state.user };
    user[`${name}`] = val;
    this.setState({ user });
  }

  onInputNumberChange(e, name) {
    const val = e.value || 0;
    let user = { ...this.state.user };
    user[`${name}`] = val;

    this.setState({ user });
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
            !this.state.selectedUsers || !this.state.selectedUsers.length
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
        className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}
      >
        {rowData.inventoryStatus}
      </span>
    );
  }
  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => this.editUser(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => this.confirmDeleteUser(rowData)}
        />
      </React.Fragment>
    );
  }

  render() {
    const header = (
      <div className="table-header">
        <h5 className="p-m-0">Quản lý khách thuê</h5>
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
    const userDialogFooter = (
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
          onClick={this.saveUser}
        />
      </React.Fragment>
    );
    const deleteUserDialogFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDeleteUserDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.deleteUser}
        />
      </React.Fragment>
    );
    const deleteUsersDialogFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDeleteUsersDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.deleteSelectedUsers}
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
            value={this.state.users}
            selection={this.state.selectedUsers}
            onSelectionChange={(e) =>
              this.setState({ selectedUsers: e.value })
            }
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
            globalFilter={this.state.globalFilter}
            header={header}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "5rem" }}
            ></Column>
            <Column field="name" header="Tên Khách Hàng" ></Column>
            <Column field="idPhong" header="Thuê Phòng" ></Column>
            <Column field="datestart" header="Ngày bắt đầu " sortable></Column>
            <Column body={this.actionBodyTemplate}></Column>
          </DataTable>
        </div>

        <Dialog
          visible={this.state.userDialog}
          style={{ width: "850px" }}
          header="Thông tin khách thuê"
          modal
          className="p-fluid"
          footer={userDialogFooter}
          onHide={this.hideDialog}
        >
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="name">Tên khách hàng</label>
              <InputText
                id="name"
                value={this.state.user.name}
                onChange={(e) => this.onInputChange(e, "name")}
                required
                autoFocus
                className={classNames({
                  "p-invalid": this.state.submitted && !this.state.user.name
                })}
              />
              {this.state.submitted && !this.state.user.name && (
                <small className="p-invalid">Tên không được để trống.</small>
              )}
            </div>
            <div className="p-field p-col">
              <label htmlFor="cmnd">CMND/CCCD</label>
              <InputText
                id="cmnd"
                value={this.state.user.cmnd}
                onChange={(e) => this.onInputChange(e, "cmnd")}
                required
              /> </div>
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label className="p-mb-3">Giới tính</label>
              <div className="p-field-radiobutton p-col">
                <RadioButton
                  inputId="gender1"
                  name="gender"
                  value="nam"
                  onChange={this.onStatusChange}
                  checked={this.state.user.gender === "nam"}
                />
                <label htmlFor="gender1">Nam</label>
              </div>
              <div className="p-field-radiobutton p-col">
                <RadioButton
                  inputId="gender2"
                  name="gender"
                  value="nu"
                  onChange={this.onStatusChange}
                  checked={this.state.user.gender === "nu"}
                />
                <label htmlFor="gender2">Nữ</label>
              </div>
            </div>
            <div className="p-field p-col">
              <label htmlFor="datestart">Ngày cấp</label>
              <Calendar value={this.state.dateCMND} onChange={(e) => this.setState({ dateCMND: e.value })} showIcon />
            </div>
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">

              <label htmlFor="phone">Điện thoại</label>
              <InputMask id="phone" mask="9999999999" value={this.state.valdt} onChange={(e) => this.setState({ valdt: e.value })}></InputMask>

              {this.state.submitted && !this.state.user.phone && (
                <small className="p-invalid">Không bỏ trống điện thoại.</small>
              )}
            </div>
            <div className="p-field p-col">
              <label htmlFor="address">Nơi cấp</label>
              <InputText
                id="noicapCMND"
                value={this.state.user.noicapCMND}
                onChange={(e) => this.onInputChange(e, "noicapCMND")}
                required

              /> </div>
          </div>
          <div className="p-field">
            <label htmlFor="address">Địa chỉ thường trú</label>
            <InputTextarea
              id="address"
              value={this.state.user.address}
              onChange={(e) => this.onInputChange(e, "address")}
              required
            />
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="bdate">Ngày sinh</label>
              <Calendar value={this.state.bdate} onChange={(e) => this.setState({ bdate: e.value })} showIcon />
            </div>
            <div className="p-field p-col">
              <label htmlFor="quequan">Nơi sinh</label>
              <InputText
                id="quequan"
                value={this.state.user.quequan}
                onChange={(e) => this.onInputChange(e, "quequan")}
                required

              /> </div>
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="idKhuTro">Thuê khu trọ</label>
              <Dropdown
                className="p-mr-2"
                value={this.state.selectedKhuTro}
                options={this.state.user}
                onChange={this.onCityChange}
                optionLabel="name"
                placeholder="Chọn khu trọ"
              />
            </div>
            <div className="p-field p-col">
              <label htmlFor="idPhong">Thuê phòng số</label>
              <Dropdown
                className="p-mr-2"
                value={this.state.selectedKhuTro}
                options={this.state.users}
                onChange={this.onCityChange}
                optionLabel="name"
                placeholder="Chọn phòng trọ"
              /> </div>
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="price">Tiền phòng</label>
              <InputNumber
                id="price"
                value={this.state.user.price}
                onValueChange={(e) => this.onInputNumberChange(e, "price")}
                mode="currency"
                currency="Vnd"
              />
            </div>
            <div className="p-field p-col">
              <label htmlFor="datestart">Ngày bắt đầu</label>
              <Calendar value={this.state.datestart} onChange={(e) => this.setState({ datestart: e.value })} showIcon />

            </div>
          </div>
          <div className="p-field">
            <label htmlFor="image">Hình ảnh</label>
            <InputTextarea
              id="image"
              value={this.state.user.image}
              onChange={(e) => this.onInputChange(e, "image")}
              required
            />
          </div>
        </Dialog>

        <Dialog
          visible={this.state.deleteUserDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteUserDialogFooter}
          onHide={this.hideDeleteUserDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.user && (
              <span>
                Bạn chắn chắn muốn xóa đã chọn ??? <b>{this.state.user.name}</b>
                    ?
              </span>
            )}
          </div>
        </Dialog>

        <Dialog
          visible={this.state.deleteUsersDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteUsersDialogFooter}
          onHide={this.hideDeleteUsersDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.user && (
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

export default KhachThue;
