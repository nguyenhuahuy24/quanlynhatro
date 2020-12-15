
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
import NhaTroService from '../service/nhatroService';
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
    RoomNumber: "",
    Length: null,
    Width: null,
    Price: 0,
    Details: "",
    Image: null,
    HouseId: null,
    Status: 0
  };
  emptyHouse = {
    houseId: null,
    name: ""
  }
  constructor(props) {
    super(props);

    this.state = {
      houses: null,
      rooms: null,
      roomDialog: false,
      deleteRoomDialog: false,
      deleteRoomsDialog: false,
      room: this.emptyRoom,
      house: this.emptyHouse,
      selectedRooms: null,
      submitted: false,
      globalFilter: null,
      onKhuTroChange: null
    };
    this.nhatroService = new NhaTroService();
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
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeleteRoomDialog = this.hideDeleteRoomDialog.bind(this);
    this.hideDeleteRoomsDialog = this.hideDeleteRoomsDialog.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.onKhuTroChange = this.onKhuTroChange.bind(this);
  }
  componentDidMount() {
    this.phongtroService
      .getRooms()
      .then(data => this.setState({ rooms: data }));
    this.nhatroService
      .getHouses()
      .then(data => this.setState({ houses: data }));
  }
  formatCurrency(value) {
    return value.toLocaleString("vnd", {
      style: "currency",
      currency: "VND"
    });
  }
  onKhuTroChange(e) {
   /*
    let rooms = this.state.rooms.filter(
      (val) => val.HouseId == this.state.house.houseId
    );
    this.setState({
      rooms,
      deleteRoomDialog: false,
      room: this.emptyRoom
    });
    */
    this.setState({ selectedKhuTro: e.value });
  }
  openNew() {
    this.setState({
      room: this.emptyRoom,
      submitted: false,
      roomDialog: true
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
  statusBodyTemplate(rowData) {
    if (rowData.Status == "1") {
      return <span className={`product-badge status-${rowData.Status}`}>{"Đã thuê"}</span>;
    }
    if (rowData.Status == "0") { return <span className={`product-badge status-${rowData.Status}`}>{"Trống"}</span>; }
  }
  saveRoom() {
    let state = { submitted: true };

    if (this.state.room.id) {
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
    room["Status"] = e.value;
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
          options={this.state.houses}
          onChange={this.onKhuTroChange}
          optionLabel="name"
          placeholder="Chọn khu trọ"

        />
        <Button
          label="Thêm phòng"
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
    return this.formatCurrency(rowData.Price);
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
            <Column field="RoomNumber" header="Phòng số" ></Column>
            <Column
              field="Price"
              header="Giá Phòng"
              body={this.priceBodyTemplate}
              sortable
            ></Column>
            <Column 
              field="HouseId" 
              header="Nhà Trọ"
              ></Column>
            <Column field="Details" header="Ghi chú" ></Column>
            <Column
              field="Status"
              header="Tình Trạng"
              body={this.statusBodyTemplate}
            ></Column>
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
            <label htmlFor="RoomNumber">Phòng số</label>
            <InputText
              id="RoomNumber"
              value={this.state.room.RoomNumber}
              onChange={(e) => this.onInputChange(e, "RoomNumber")}
              required
              autoFocus
              className={classNames({
                "p-invalid": this.state.submitted && !this.state.room.RoomNumber
              })}
            />
            {this.state.submitted && !this.state.room.RoomNumber && (
              <small className="p-invalid">Không bỏ trống.</small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="Price">Giá phòng</label>
            <InputNumber
              id="price"
              value={this.state.room.Price}
              onValueChange={(e) => this.onInputNumberChange(e, "Price")}
              mode="currency"
              currency="Vnd"
            />
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="Length">Chiều dài</label>
              <InputText
                id="Length"
                value={this.state.room.Length}
                onChange={(e) => this.onInputChange(e, "Length")}
                required
              />
            </div>
            <div className="p-field p-col">
              <label htmlFor="Width">Chiều rộng</label>
              <InputText
                id="Width"
                value={this.state.room.Width}
                onChange={(e) => this.onInputChange(e, "Width")}
                required
              /> </div>
          </div>
          <div className="p-field">
            <label htmlFor="Details">Ghi chú</label>
            <InputText
              id="Details"
              value={this.state.room.Details}
              onChange={(e) => this.onInputChange(e, "Details")}
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="inventoryStatus">Tình trạng</label>
            <div className="p-formgrid p-grid">
              <div className="p-field-radiobutton p-col-6">
                <RadioButton
                  inputId="Status1"
                  name="Status"
                  value={1}
                  onChange={this.onStatusChange}
                  checked={this.state.room.Status === 1}
                />
                <label htmlFor="Status1">Đã thuê</label>
              </div>

              <div className="p-field-radiobutton p-col-6">
                <RadioButton
                  inputId="Status2"
                  name="Status"
                  value={0}
                  onChange={this.onStatusChange}
                  checked={this.state.room.Status === 0}
                />
                <label htmlFor="Status2">Trống</label>
              </div>
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
                Bạn chắn chắn muốn xóa đã chọn ????
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
