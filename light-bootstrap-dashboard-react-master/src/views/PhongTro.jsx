
import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown";
import PhongTroService from '../service/phongtroService';
import { RadioButton } from "primereact/radiobutton";
import classNames from 'classnames';
import '../index.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import '../index.css';
class PhongTro extends Component {
  emptyRoom = {
    id: null,
    name: "",
    description: "",
    price: 0,
    number: 0,
    inventoryStatus: "",
    datestart: "",
    image:null
  };
  constructor(props) {
    super(props);

    this.state = {
      rooms: null,
      roomDialog: false,
      deleteRoomDialog: false,
      deleteRoomsDialog: false,
      room: this.emptyRoom,
      selectedRooms: null,
      submitted: false,
      globalFilter: null,
      selectedKhuTro: null
    };
    this.phongtroService = new PhongTroService();
    this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
    this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.openNew = this.openNew.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.saveRoom = this.saveRoom.bind(this);
    this.editRoom = this.editRoom.bind(this);
    this.confirmDeleteRoom = this.confirmDeleteRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
    this.deleteSelectedRooms = this.deleteSelectedRooms.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeleteRoomDialog = this.hideDeleteRoomDialog.bind(this);
    this.hideDeleteRoomsDialog = this.hideDeleteRoomsDialog.bind(this);
  }
  componentDidMount() {
    this.phongtroService
      .getPhongTros()
      .then(data => this.setState({ rooms: data }));
  }
  formatCurrency(value) {
    return value.toLocaleString("vnd", {
      style: "currency",
      currency: "VND"
    });
  }
  onCityChange(e) {
    this.setState({ selectedKhuTro: e.value });
  }
  openNew() {
    this.setState({
      room: this.emptyRoom,
      submitted: false,
      RoomDialog: true
    });
  }
  hideDialog() {
    this.setState({
      submitted: false,
      roomDialog: false
    });
  }
  hideDeleteRoomDialog() {
    this.setState({ deleteRoomDialog: false });
  }
  hideDeleteRoomsDialog() {
    this.setState({ deleteRoomsDialog: false });
  }
  saveRoom() {
    let state = { submitted: true };

    if (this.state.room.name.trim()) {
      let rooms = [...this.state.rooms];
      let room = { ...this.state.room };
      if (this.state.room.id) {
        const index = this.findIndexById(this.state.room.id);

        rooms[index] = room;
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "Room Updated",
          life: 3000
        });
      } else {
        room.id = this.createId();
        rooms.push(room);
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "Room Created",
          life: 3000
        });
      }

      state = {
        ...state,
        rooms,
        roomDialog: false,
        room: this.emptyRoom
      };
    }

    this.setState(state);
  }
  editRoom(room) {
    this.setState({
      room: { ...room },
      roomDialog: true
    });
  }
  confirmDeleteRoom(room) {
    this.setState({
      room,
      deleteRoomDialog: true
    });
  }
  deleteRoom() {
    let rooms = this.state.rooms.filter(
      (val) => val.id !== this.state.room.id
    );
    this.setState({
      rooms,
      deleteRoomDialog: false,
      room: this.emptyRoom
    });
    this.toast.show({
      severity: "success",
      summary: "Successful",
      detail: "Room Deleted",
      life: 3000
    });
  }
  findIndexById(id) {
    let index = -1;
    for (let i = 0; i < this.state.rooms.length; i++) {
      if (this.state.rooms[i].id === id) {
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
    this.setState({ deleteRoomsDialog: true });
  }
  deleteSelectedRooms() {
    let rooms = this.state.rooms.filter(
      (val) => !this.state.selectedRooms.includes(val)
    );
    this.setState({
      rooms,
      deleteRoomsDialog: false,
      selectedRooms: null
    });
    this.toast.show({
      severity: "success",
      summary: "Successful",
      detail: "Rooms Deleted",
      life: 3000
    });
  }
  onStatusChange(e) {
    let room = { ...this.state.room };
    room["inventoryStatus"] = e.value;
    this.setState({ room });
  }
  onInputChange(e, name) {
    const val = (e.target && e.target.value) || "";
    let room = { ...this.state.room };
    room[`${name}`] = val;

    this.setState({ room });
  }
  onInputNumberChange(e, name) {
    const val = e.value || 0;
    let room = { ...this.state.room };
    room[`${name}`] = val;

    this.setState({ room });
  }
  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <Dropdown
          className="p-mr-2"
          value={this.state.selectedKhuTro}
          options={this.state.rooms}
          onChange={this.onCityChange}
          optionLabel="name"
          placeholder="Chọn khu trọ"

        />
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={this.openNew}
         // disabled={!this.state.selectedKhuTro}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={this.confirmDeleteSelected}
          disabled={
            !this.state.selectedRooms || !this.state.selectedRooms.length
          }
        />
      </React.Fragment>
    );
  }
  priceBodyTemplate(rowData) {
    return this.formatCurrency(rowData.price);
  }
  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => this.editRoom(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => this.confirmDeleteRoom(rowData)}
        />
      </React.Fragment>
    );
  }
  render() {
    const header = (
      <div className="table-header">
        <h5 className="p-m-0">Quản lý phòng</h5>
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
    const roomDialogFooter = (
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
          onClick={this.saveRoom}
        />
      </React.Fragment>
    );
    const deleteRoomDialogFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDeleteRoomDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.deleteRoom}
        />
      </React.Fragment>
    );
    const deleteRoomsDialogFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDeleteRoomsDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.deleteSelectedRooms}
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
            value={this.state.rooms}
            selection={this.state.selectedRooms}
            onSelectionChange={(e) =>
              this.setState({ selectedRooms: e.value })
            }
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} rooms"
            globalFilter={this.state.globalFilter}
            header={header}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "5rem" }}
            ></Column>
            <Column field="name" header="Tên Phòng" ></Column>
            <Column
              field="price"
              header="Giá Phòng"
              body={this.priceBodyTemplate}
              sortable
            ></Column>

            <Column field="description" header="Ghi chú" ></Column>
            {/* <Column
              field="inventoryStatus"
              header="Tình Trạng"
              body={this.statusBodyTemplate}
              
            ></Column> */}
            <Column body={this.actionBodyTemplate}></Column>
          </DataTable>
        </div>
        <Dialog
          visible={this.state.roomDialog}
          style={{ width: "450px" }}
          header="Thông tin khu trọ"
          modal
          className="p-fluid"
          footer={roomDialogFooter}
          onHide={this.hideDialog}
        >
          <div className="p-field">
            <label htmlFor="name">Tên phòng</label>
            <InputText
              id="name"
              value={this.state.room.name}
              onChange={(e) => this.onInputChange(e, "name")}
              required
              autoFocus
              className={classNames({
                "p-invalid": this.state.submitted && !this.state.room.name
              })}
            />
            {this.state.submitted && !this.state.room.name && (
              <small className="p-invalid">Name is required.</small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="price">Giá phòng</label>
            <InputNumber
              id="price"
              value={this.state.room.price}
              onValueChange={(e) => this.onInputNumberChange(e, "price")}
              mode="currency"
              currency="Vnd"
            />
          </div>
          <div className="p-field">
            <label htmlFor="number">Số lượng người tối đa</label>
            <InputNumber
              id="number"
              value={this.state.room.number}
              onValueChange={(e) => this.onInputNumberChange(e, "number")}
            />
            
          </div>
          <div className="p-field">
            <label htmlFor="description">Ghi chú</label>
            <InputText
              id="description"
              value={this.state.room.description}
              onChange={(e) => this.onInputChange(e, "description")}
              required
              
            />
            
          </div>
          <div className="p-field">
            <label htmlFor="inventoryStatus">Tình trạng</label>
            <div className="p-field-radiobutton p-col-6">
                <RadioButton
                  inputId="inventoryStatus1"
                  name="inventoryStatus"
                  value="LOWSTOCK"
                  onChange={this.onStatusChange}
                  checked={this.state.room.inventoryStatus === "LOWSTOCK"}
                />
                <label htmlFor="inventoryStatus1">Hết Phòng</label>
              </div>
              <div className="p-field-radiobutton p-col-6">
                <RadioButton
                  inputId="inventoryStatus2"
                  name="inventoryStatus"
                  value="OUTOFSTOCK"
                  onChange={this.onStatusChange}
                  checked={this.state.room.inventoryStatus === "OUTOFSTOCK"}
                />
                <label htmlFor="inventoryStatus2">Còn phòng</label>
              </div>
            
          </div>
          <div className="p-field">
            <label htmlFor="image">Hình ảnh</label>
            <InputText
              id="image"
              value={this.state.room.name}
              onChange={(e) => this.onInputChange(e, "image")}
              required
            />          
          </div>
        </Dialog>
        <Dialog
          visible={this.state.deleteRoomDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteRoomDialogFooter}
          onHide={this.hideDeleteRoomDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.room && (
              <span>
                Bạn chắn chắn muốn xóa đã chọn ??? <b>{this.state.room.name}</b>
                ?
              </span>
            )}
          </div>
        </Dialog>
        <Dialog
          visible={this.state.deleteRoomsDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteRoomsDialogFooter}
          onHide={this.hideDeleteRoomsDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.room && (
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

export default PhongTro;
