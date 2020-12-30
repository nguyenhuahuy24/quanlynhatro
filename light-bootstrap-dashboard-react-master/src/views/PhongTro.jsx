
import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from "primereact/dropdown";
import PhongTroService from '../service/phongtroService';
import NhaTroService from '../service/nhatroService';
import DichVuService from '../service/dichvuService';
import classNames from 'classnames';
import '../index.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import '../index.css';

import UserContext from "../context/UserContext";

class PhongTro extends Component {
  static contextType = UserContext
  emptyRoom = {
    RoomNumber: "",
    Length: null,
    Width: null,
    Price: 0,
    Details: "",
    Image: null,
    HouseId: null,
    Status: 0,
    ListPerson: "",
    ListService: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      houses: null,
      rooms: null,
      DVs: null,
      roomDialog: false,
      deleteRoomDialog: false,
      deleteRoomsDialog: false,
      //loginuserID: localStorage.getItem("userIDlogin"),
      room: this.emptyRoom,
      submitted: false,
      selectedServices: null,
      globalFilter: null,
      selectedKhuTro: "",
      selectedShow:"",
      selectedFile: null,
      profileImg: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    };
    this.nhatroService = new NhaTroService();
    this.phongtroService = new PhongTroService();
    this.DVService = new DichVuService();
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
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  componentDidMount() {
    const { userData, setUserData } = this.context;
    this.nhatroService
      .getHouseByUserId(userData.user)
      .then(data => this.setState({ houses: data }));
  }
  componentDidUpdate() {
    this.phongtroService
      .getRoomByHouseId(this.state.selectedKhuTro)
      .then(data => this.setState({ rooms: data }));
  }
  handleImageChange(e) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ profileImg: reader.result })
      }
    }
    reader.readAsDataURL(e.target.files[0])
    this.setState({ selectedFile: e.target.files[0] })
  }
  formatCurrency(value) {
    return value.toLocaleString("vnd", {
      style: "currency",
      currency: "VND"
    });
  }
  onKhuTroChange(e) {
    this.setState({ selectedKhuTro: e.value._id,selectedShow:e.value });
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
      return <span className={`product-badge status-1`}>{"Đã thuê"}</span>;
    }
    if (rowData.Status == "0") { return <span className={`product-badge status-0`}>{"Trống"}</span>; }
  }
  saveRoom() {
    let state = { submitted: true };
      const fd = new FormData();
      fd.append("RoomNumber", this.state.room.RoomNumber);
      fd.append("Length", this.state.room.Length);
      fd.append("Width", this.state.room.Width);
      fd.append("Price", this.state.room.Price);
      fd.append("Details", this.state.room.Details);
      fd.append("Image", this.state.selectedFile);
      fd.append("HouseId", this.state.selectedKhuTro);
    //  fd.append("Status", this.state.room.Status);
      if (this.state.room._id) {
       //   this.state.room= this.phongtroService.getRoomById(this.state.room._id)
       this.phongtroService.updateRoom(this.state.room._id, fd).then();
    
       // rooms[index] = room;
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "Room Updated",
          life: 3000
        });
      } else {
        this.phongtroService.createRoom(fd).then();
       // rooms.push(room);
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "Room Created",
          life: 3000
        });
      }
      state = {
        
        ...state,
       // rooms,
       profileImg:null,
       selectedFile:null,
        roomDialog: false,
        room: this.emptyRoom
      };
    

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
    this.phongtroService.deleteRoom(this.state.room._id).then(data => {
      if (data["deletedCount"] === 1) {
        this.setState({ 
          deleteRoomDialog: false,
           room: this.emptyRoom });
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "Phòng Deleted",
          life: 3000
        });
      }
      else {
        this.toast.show({
          severity: "success",
          summary: "Fail",
          detail: "Phòng Deleted",
          life: 3000
        });
      }
    })

  }
  findIndexById(_id) {
    let index = -1;
    for (let i = 0; i < this.state.rooms.length; i++) {
      if (this.state.rooms[i]._id === _id) {
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
        <h7  className="p-mr-2">Chọn nhà: </h7>
        <Dropdown
          className="p-mr-2"
          value={this.state.selectedShow}
          options={this.state.houses}
          onChange={this.onKhuTroChange}
          optionLabel="Name"
          placeholder="Chọn khu trọ"
        />
        <Button
          label="Thêm phòng"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={this.openNew}
          disabled={!this.state.selectedKhuTro}
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
    
    const { profileImg } = this.state
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
            <Column field="Details" header="Ghi chú" ></Column>
            <Column
              field="Status"
              header="Tình Trạng"
              body={this.statusBodyTemplate}
              sortable
            ></Column>
            <Column body={this.actionBodyTemplate}></Column>
          </DataTable>
        </div>
        <Dialog
          visible={this.state.roomDialog}
          style={{ width: "450px" }}
          header="Thông tin phòng"
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
            <label htmlFor="Image">Hình ảnh</label>
            <input
              id="Image"
              className="fileInput"
              type="file"
              onChange={(e) => this.handleImageChange(e, "Image")}
            />
            <div className="img-holder">
              <img src={profileImg} alt="" id="img" className="img" />
              {/* `http://localhost:8080/`+ this.state.room.Image */}
            </div>
          </div>
        </Dialog>
        <Dialog
          visible={this.state.deleteRoomDialog}
          style={{ width: "450px" }}
          header="Xóa thông tin phòng"
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
      </div>
    );
  }
}

export default PhongTro;
