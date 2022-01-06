
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
import _ from 'lodash'
//
import classNames from 'classnames';
import '../index.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import UserContext from "../context/UserContext";
//redux
import { withGlobalContext } from '../GlobalContextProvider';
import { connect } from 'react-redux';
import {postRoom,unpostRoom,removePersonToRoom,getServiceInRoom,removeServiceToRoom, getPersonInRoom,getRoomByHouseId ,createRoom, editRoom, deleteRoom} from '../redux/action/roomAction/RoomAction'
import { getHouseByUserId} from '../redux/action/houseAction/HouseAction'

import { dataStatus } from "../utility/config";
class PhongTro extends Component {
  static contextType = UserContext
  emptyRoom = {
    RoomNumber: "",
    Length: null,
    Width: null,
    Price: 0,
    Details: "",
    Image: [],
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
      edit:"",
      customer:"",
      service:"",
      listCustomerDialog:false,
      listServiceDialog:false,
      roomDialog: false,
      deleteRoomDialog: false,
      deleteCustomerDialog: false,
      deleteServiceDialog:false,
      //loginuserID: localStorage.getItem("userIDlogin"),
      room: this.emptyRoom,
      submitted: false,
      selectedServices: "",
      selectedCustomer: "",
      //dang tin
      deletePostDialog:false,
      deleteRemoveDialog:false,
      RemoveHouseForRentDialog:false,
      PostHouseForRentDialog:false,
      //khi khi click vào room sẽ lưu tạm thời roomID
      selectedRoom:"",

      globalFilter: null,
      selectedKhuTro: "",
      selectedShow:"",
      ////////////
      selectedFile: [],
      ///test
      imageArray:[],
      test:''
    };

  
    this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
    this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.openNew = this.openNew.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.hideCustomerDialog = this.hideCustomerDialog.bind(this);
    this.saveRoom = this.saveRoom.bind(this);
    this.editRoom = this.editRoom.bind(this);
    this.confirmDeleteRoom = this.confirmDeleteRoom.bind(this);
    this.confirmPostRemove = this.confirmPostRemove.bind(this);
    this.confirmDeleteCustomer = this.confirmDeleteCustomer.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeleteRoomDialog = this.hideDeleteRoomDialog.bind(this);
    this.hideDeleteCustomerDialog = this.hideDeleteCustomerDialog.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.onKhuTroChange = this.onKhuTroChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.removePerson = this.removePerson.bind(this);
    this.removeService = this.removeService.bind(this);
    this.onHide =this.onHide.bind(this);
    this.confirm =this.confirm.bind(this);
    this.confirmPost =this.confirmPost.bind(this);
    this.confirmRemove =this.confirmRemove.bind(this);
  }
  componentDidMount() {
    this.props.getHouseByUserId();
  }
  componentDidUpdate(prevProps) {
    if (this.props.createStatus !== prevProps.createStatus) {
      if (this.props.createStatus.status === dataStatus.SUCCESS) {
        this.toast.show({
          severity: "success",
          summary: "Thành Công",
          detail: "Tạo phòng",
          life: 3000
        });
         this.props.getRoomByHouseId(this.state.selectedKhuTro);
      }
      else{
        this.toast.show({
          severity: "error",
          summary: "Thất Bại",
          detail: "Tạo phòng",
          life: 3000
        });
      }
    }
    if (this.props.listPerson !== prevProps.listPerson) {
      if (this.props.listPerson.status === dataStatus.SUCCESS) {
         
          this.setState({customer:this.props.listPerson.data})
      }
    }
    //
    if (this.props.listService !== prevProps.listService) {
      if (this.props.listService.status === dataStatus.SUCCESS) {
          this.setState({service:this.props.listService.data})
      }
    }
   
    if (this.props.editStatus !== prevProps.editStatus) {
      if (this.props.editStatus.status === dataStatus.SUCCESS) {
        this.toast.show({
          severity: "success",
          summary: "Thành Công",
          detail: "Cập nhật phòng",
          life: 3000
        });
         this.props.getRoomByHouseId(this.state.selectedKhuTro);
      }
      else{
          this.toast.show({
          severity: "error",
          summary: "Thất bại",
          detail: "Cập nhật phòng",
          life: 3000
        });
      }
    }
    if (this.props.removePersonStatus !== prevProps.removePersonStatus) {
      if (this.props.removePersonStatus.status === dataStatus.SUCCESS) {
                  this.toast.show({
                  severity: "success",
                  summary: "Thành công",
                  detail: "Xóa khách thuê ra khỏi phòng",
                  life: 3000
                });
              this.props.getPersonInRoom(this.state.selectedRoom);
              this.props.getRoomByHouseId(this.state.selectedKhuTro);
              
      }
    }
      if (this.props.removeServiceStatus !== prevProps.removeServiceStatus) {
        if (this.props.removeServiceStatus.status === dataStatus.SUCCESS) {
                  this.toast.show({
                  severity: "success",
                  summary: "Thành công",
                  detail: "Xóa dịch vụ ra khỏi phòng",
                  life: 3000
                });
              this.props.getServiceInRoom(this.state.selectedRoom);
              this.props.getRoomByHouseId(this.state.selectedKhuTro);
              
      }
    }
    if (this.props.deleteStatus !== prevProps.deleteStatus) {
      if (this.props.deleteStatus.status === dataStatus.SUCCESS) {
        if (this.props.deleteStatus.data.deletedCount === 1) {
              this.setState({ 
                  deleteRoomDialog: false,
                  room: this.emptyRoom });
                  this.toast.show({
                      severity: "success",
                      summary: "Thành công",
                      detail: "Xóa phòng",
                      life: 3000
                  });
          }else {
                this.toast.show({
                    severity: "error",
                    summary: "Thất bại",
                    detail: "Xóa phòng",
                    life: 3000
                  });
          }
        this.props.getRoomByHouseId(this.state.selectedKhuTro);
      }
    }
    if (this.props.postRoomStatus !== prevProps.postRoomStatus) {
      if (this.props.postRoomStatus.status === dataStatus.SUCCESS) {
                  this.toast.show({
                      severity: "success",
                      summary: "Thành công",
                      detail: "Đăng tin cho thuê phòng",
                      life: 3000
                  });
        this.props.getRoomByHouseId(this.state.selectedKhuTro);
      }
      else{
                  this.toast.show({
                      severity: "error",
                      summary: "Thất bại",
                      detail: "Đăng tin cho thuê phòng",
                      life: 3000
                  });
      }
    }
    if (this.props.unpostRoomStatus !== prevProps.unpostRoomStatus) {
      if (this.props.unpostRoomStatus.status === dataStatus.SUCCESS) {
                  this.toast.show({
                      severity: "success",
                      summary: "Thành công",
                      detail: "Thu hồi tin cho thuê phòng",
                      life: 3000
                  });
        this.props.getRoomByHouseId(this.state.selectedKhuTro);
      }
      else{
                  this.toast.show({
                      severity: "error",
                      summary: "Thất bại",
                      detail: "Thu hồi tin cho thuê phòng",
                      life: 3000
                  });
      }
    }
    if (this.props.listRoom !== prevProps.listRoom) {
      if (this.props.listRoom.status === dataStatus.SUCCESS) {
        this.setState({ rooms: this.props.listRoom.data })
      } 
    }
  }
    buildImgTag(){
      if(this.state.room.Image.length>0 && this.state.imageArray.length == 0){
        return <div className="img-holder">
      { 
          this.state.room.Image.map(imageURI =>
            (<img className="img" src={`http://localhost:8080/uploads/images/`+imageURI} alt="Photo uploaded"/>)
          ) 
        }
        </div>
      }
      else if(this.state.room.Image.length>0 && this.state.imageArray.length> 0){
        return <div className="img-holder">
          { 
            this.state.imageArray.map(imageURI => 
            (<img className="img" src={imageURI} alt="Photo uploaded"/>)) 
          }
          </div>
      }
      else{
      return <div className="img-holder">
          { 
            this.state.imageArray.map(imageURI => 
            (<img className="img" src={imageURI} alt="Photo uploaded"/>)) 
          }
          </div>
      }
    
}
  readURI(e){
    if (e.target.files) {
        /* Get files in array form */
        const files = Array.from(e.target.files);
        /* Map each file to a promise that resolves to an array of image URI's */ 
        Promise.all(files.map(file => {
            return (new Promise((resolve,reject) => {
                const reader = new FileReader();
                reader.addEventListener('load', (ev) => {
                    resolve(ev.target.result);
                });
                reader.addEventListener('error', reject);
                reader.readAsDataURL(file);
            }));
        }))
        .then(images => {
            this.setState({ imageArray : images })  
        }, error => {        
            console.error(error);
        });
    }
}
  handleImageChange(e) {
    this.readURI(e);
    //this.setState({selectedFile:e.target.files[0]})
    this.setState({selectedFile:[...this.state.selectedFile,...e.target.files],Image:[]})
  }
  //
  formatCurrency(value) {
    return value.toLocaleString("vnd", {
      style: "currency",
      currency: "VND"
    });
  }
  confirmPost(){
    console.log("dang tin")
    this.props.postRoom(this.state.room._id)
    this.setState({PostHouseForRentDialog:false})
  }
  confirmRemove(){
    console.log("xoa tin")
    this.props.unpostRoom(this.state.room._id)
    this.setState({RemoveHouseForRentDialog:false})
  }
  onKhuTroChange(e) {
    this.setState({ selectedKhuTro: e.value._id,selectedShow:e.value });
    this.props.getRoomByHouseId(e.value._id);
  }
  openNew() {
    this.setState({
      room: this.emptyRoom,
      submitted: false,
      roomDialog: true,
       edit:true
    });
  }
  hideDialog() {
    this.setState({
      submitted: false,
      selectedFile:[],
      roomDialog: false,
      imageArray:[],
    });
  }
  hideCustomerDialog() {
    this.setState({
      submitted: false,
      selectedCustomer:"",
      selectedRoom:"",
      listCustomerDialog: false
    });
  }
  hideDeleteRoomDialog() {
    this.setState({ deleteRoomDialog: false });
  }
  hideDeleteCustomerDialog() {
    this.setState({ deleteCustomerDialog: false });
  }
  statusBodyTemplate(rowData) {
    if (rowData.Status == "1") {
      return <span className={`product-badge status-1`}>{"Đã thuê"}</span>;
    }
    if (rowData.Status == "0") { return <span className={`product-badge status-0`}>{"Trống"}</span>; }
    if (rowData.Status == "3") { return <span className={`product-badge status-2`}>{"Đã đăng tin"}</span>; }
  }
  saveRoom() {
    let state = { submitted: true };
      const fd = new FormData();
      fd.append("RoomNumber", this.state.room.RoomNumber);
      fd.append("Length", this.state.room.Length);
      fd.append("Width", this.state.room.Width);
      fd.append("Price", this.state.room.Price);
      fd.append("Details", this.state.room.Details);
      fd.append("HouseId", this.state.selectedKhuTro);  
      _.forEach(this.state.selectedFile, file =>{
          fd.append('Image',file)
        })
      if (this.state.room._id) {
      this.props.editRoom(this.state.room._id, fd);
        state = {
        ...state,
       // rooms,
        imageArray:[],
        selectedFile:[],
        roomDialog: false,
        room: this.emptyRoom
      };
      } else {
        this.props.createRoom(fd);
        
        state = {
        ...state,
       // rooms,
        imageArray:[],
        selectedFile:[],
        roomDialog: false,
        room: this.emptyRoom
      };
      }
    this.setState(state);
  }
  PersonRoom(room) {
    this.props.getPersonInRoom(room._id);
      this.setState({
        selectedRoom:room._id,
        listCustomerDialog: true
      });    
  }
  ServiceRoom(room) {
    this.props.getServiceInRoom(room._id);
      this.setState({
        selectedRoom:room._id,
        listServiceDialog: true
      });    
  }
  editRoom(room) {
      this.setState({
        room: { ...room },
        roomDialog: true,
        edit:false
      });  
  }
  confirmDeleteRoom(room) {
    this.setState({
      room,
      deleteRoomDialog: true
    });
  }
  confirmDeleteCustomer() {
    this.setState({
      deleteCustomerDialog: true
    });
  }
  confirm(name) {
        this.setState({
            [`${name}`]: true
        });
    }
  confirmPostRemove(name,room) {
        this.setState({
            [`${name}`]: true,
            room: { ...room },
        });
    }
  onHide(name) {
        this.setState({
            [`${name}`]: false,
            selectedService:"",
        });
    }
  deleteRoom() {
    if(this.state.room.Status==1){
        this.toast.show({
          severity: "error",
          summary: "Thất bại",
          detail: "Phòng đang cho thuê không xóa được",
          life: 3000
          });
        this.setState({ 
                  deleteRoomDialog: false,
                  room: this.emptyRoom });
        
    }
    else this.props.deleteRoom(this.state.room._id);
  }
  removePerson() {
    let customer =this.state.selectedCustomer
   
    this.props.removePersonToRoom(this.state.selectedRoom,customer._id)
    this.setState({
      deleteCustomerDialog: false,
      selectedCustomer:"",
    })
    
  }
  removeService() {
    let service =this.state.selectedService
    this.props.removeServiceToRoom(this.state.selectedRoom,service._id)
    this.setState({
      deleteServiceDialog: false,
      selectedService:"",
    })
    
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
          options={this.props.listHouse.data}
          onChange={this.onKhuTroChange}
          optionLabel="Name"
          placeholder="Chọn nhà"
        />
        <Button
          label="Thêm phòng"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={this.openNew}
          disabled={!this.state.selectedKhuTro}
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
        {rowData.Status == "0" &&  <Button
          icon="pi pi-send"
          className="p-button-rounded p-button p-mr-1"
          style={{backgroundColor:"#0d29ef"}}
          tooltip="Đăng tin cho thuê phòng" 
          tooltipOptions={{ className: 'blue-tooltip', position: 'top' }}
          onClick={() => this.confirmPostRemove('PostHouseForRentDialog',rowData)}
        /> }
        {rowData.Status == "3" &&  <Button
          icon="pi pi-times"
          className="p-button-rounded p-button p-mr-1"
          style={{backgroundColor:"#827f83"}}
          tooltip="Thu hồi tin cho thuê nhà" 
          tooltipOptions={{ className: 'blue-tooltip', position: 'top' }}
          onClick={() => this.confirmPostRemove('RemoveHouseForRentDialog',rowData)}

        /> }
       
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-1"
          tooltip="Chỉnh sửa thông tin phòng" 
          tooltipOptions={{ className: 'blue-tooltip', position: 'top' }}
          onClick={() => this.editRoom(rowData)}
        />
        <Button
          icon="pi pi-user"
          className="p-button-rounded p-button-warning p-mr-1"
          tooltip="Thành viên trong phòng" 
          tooltipOptions={{ className: 'blue-tooltip', position: 'top' }}
          onClick={() => this.PersonRoom(rowData)}
        />
        <Button
          icon="pe-7s-box2"
          className="p-button-rounded p-button p-mr-1"
          tooltip="Dịch vụ của phòng sử dụng" 
          tooltipOptions={{ className: 'blue-tooltip', position: 'top' }}
          onClick={() => this.ServiceRoom(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          tooltip="Xóa phòng" 
          tooltipOptions={{ className: 'blue-tooltip', position: 'top' }}
          onClick={()=>this.confirmDeleteRoom(rowData)}
        />
      </React.Fragment>
    );
  }
  
  render() {
    const imgTag = this.buildImgTag();
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
          label="Hủy"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={this.hideDialog}
        />
        {this.state.edit !=false &&  <Button
          label="Lưu"
          icon="pi pi-check"
         className="p-button-success"
          onClick={this.saveRoom}
        /> }
        {this.state.edit != true && <Button
          label="Chỉnh sửa"
          icon="pi pi-pencil"
          className="p-button-warning"
          onClick={()=>this.setState({edit:true})}
        /> }
        
      </React.Fragment>
    );
    const deleteRoomDialogFooter = (
      <React.Fragment>
        <Button
          label="Không"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={this.hideDeleteRoomDialog}
        />
        <Button
          label="Có"
          icon="pi pi-check"
          className="p-button-success"
          onClick={this.deleteRoom}
        />
      </React.Fragment>
    );
    const deleteCustomerDialogFooter = (
      <React.Fragment>
        <Button
          label="Không"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={this.hideDeleteCustomerDialog}
        />
        <Button
          label="Có"
          icon="pi pi-check"
          className="p-button-success"
          onClick={this.removePerson}
        />
      </React.Fragment>
    );
    const deleteServiceDialogFooter = (
      <React.Fragment>
        <Button
          label="Không"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={()=>this.onHide('deleteServiceDialog')}
        />
        <Button
          label="Có"
          icon="pi pi-check"
          className="p-button-success"
          onClick={this.removeService}
        />
      </React.Fragment>
    );
    const postDialogFooter = (
      <React.Fragment>
        <Button
          label="Không"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={()=>this.onHide('PostHouseForRentDialog')}
        />
        <Button
          label="Có"
          icon="pi pi-check"
          className="p-button-success"
          onClick={this.confirmPost}
        />
      </React.Fragment>
    );
    const removeDialogFooter = (
      <React.Fragment>
        <Button
          label="Không"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={()=>this.onHide('RemoveHouseForRentDialog')}
        />
        <Button
          label="Có"
          icon="pi pi-check"
          className="p-button-success"
          onClick={this.confirmRemove}
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
            value={this.props.listRoom.data}
            dataKey="_id"
            paginator
            rows={5}
            // rowsPerPageOptions={[5, 10, 25]}
            // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            // currentPageReportTemplate="Showing {first} to {last} of {totalRecords} rooms"
            globalFilter={this.state.globalFilter}
            header={header}
          >
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
        {/* Edit Room dialog */}
        <Dialog
          visible={this.state.roomDialog}
          style={{ width: "450px",overflow: "auto" }}
          header="Thông tin phòng"
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
              disabled ={this.state.edit !=true}
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
              disabled ={this.state.edit !=true}
            />
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="Length">Chiều dài(m)</label>
              <InputText
                id="Length"
                value={this.state.room.Length}
                onChange={(e) => this.onInputChange(e, "Length")}
                required
                disabled ={this.state.edit !=true}
              />
            </div>
            <div className="p-field p-col">
              <label htmlFor="Width">Chiều rộng(m)</label>
              <InputText
                id="Width"
                value={this.state.room.Width}
                onChange={(e) => this.onInputChange(e, "Width")}
                required
                disabled ={this.state.edit !=true}
              /> </div>
          </div>
          <div className="p-field">
            <label htmlFor="Details">Ghi chú</label>
            <InputText
              id="Details"
              value={this.state.room.Details}
              onChange={(e) => this.onInputChange(e, "Details")}
              required
              disabled ={this.state.edit !=true}
            />
          </div>
          <div className="p-field">
            <label htmlFor="Image">Hình ảnh</label>
            <input
              id="Image"
              className="fileInput"
              type="file"
              accept="image/gif,image/jpeg,image/jpg,image/png,video/mp4,video/x-m4v"
              title="Add photos or video"
              //onChange={this.handleChange.bind(this)}
              onChange={(e)=>this.handleImageChange(e)}
              multiple
              disabled ={this.state.edit !=true}
            />
            {imgTag}
          </div>
        </Dialog>
       {/* Delete Room dialog */}
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
               Bạn chắn chắn muốn xóa <b>Phòng {this.state.room.RoomNumber}</b> đã chọn ???
              </span>
            )}
          </div>
        </Dialog>
        {/* delete Person */}
        <Dialog
          visible={this.state.deleteCustomerDialog}
          style={{ width: "450px" }}
          header="Xóa khách thuê khỏi phòng"
          modal
          footer={deleteCustomerDialogFooter}
          onHide={this.hideDeleteCustomerDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.customer && (
              <span>
                Bạn chắn chắn muốn xóa đã chọn ???? {this.state.customer.Name}
              </span>
            )}
          </div>
        </Dialog>
        {/* delete Service */}
        <Dialog
          visible={this.state.deleteServiceDialog}
          style={{ width: "450px" }}
          header="Xóa dịch vụ khỏi phòng"
          modal
          footer={deleteServiceDialogFooter}
          onHide={()=>this.onHide('deleteServiceDialog')}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.service && (
              <span>
                Bạn chắn chắn muốn xóa đã chọn ????
              </span>
            )}
          </div>
        </Dialog>
        {/* list Person dialog */}
        <Dialog
          visible={this.state.listCustomerDialog}
          style={{ width: "500px",overflow: "auto" }}
          header="Danh sách thuê trọ"
          modal
          className="p-fluid"
          onHide={this.hideCustomerDialog}
          //footer={deleteCustomerDialogFooter}
        >
        <div className="card1">
          <DataTable
            ref={(el) => (this.dt = el)}
            value={this.state.customer}
            selectionMode="single" 
            selection={this.state.selectedCustomer} 
            onSelectionChange={e => this.setState({ selectedCustomer: e.value })}
            dataKey="_id"
          >
            <Column field="Name" header="Tên" ></Column>
            <Column field="Phone" header="Số điện thoại" ></Column>
          </DataTable>    
        </div>
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={this.confirmDeleteCustomer}
          disabled={!this.state.selectedCustomer}/>
        </Dialog>
        {/* list service dialog */}
      <Dialog
          visible={this.state.listServiceDialog}
          style={{ width: "500px",overflow: "auto" }}
          header="Danh sách dịch vụ của phòng"
          modal
          className="p-fluid"
          onHide={()=>this.onHide('listServiceDialog')}
          //footer={deleteCustomerDialogFooter}
        >
        <div className="card1">
          <DataTable
            ref={(el) => (this.dt = el)}
            value={this.state.service}
            selectionMode="single" 
            selection={this.state.selectedService} 
            onSelectionChange={e => this.setState({ selectedService: e.value })}
            dataKey="_id"
          >
            <Column field="ServiceName" header="Tên Dịch Vụ" ></Column>
            <Column
              field="Price"
              header="Giá dịch vụ"
              body={this.priceBodyTemplate}
              sortable
            ></Column>
           
          </DataTable>    
        </div>
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => this.confirm('deleteServiceDialog')}
          disabled={!this.state.selectedService}/>
        </Dialog>
              {/* dialog đăng tin */}
        <Dialog
          visible={this.state.PostHouseForRentDialog}
          style={{ width: "450px" }}
          header="Đăng tin cho thuê phòng trọ"
          modal
          footer={postDialogFooter}
         onHide={()=>this.onHide("PostHouseForRentDialog")}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.room && (
              <span>
                Bạn muốn đăng tin cho thuê ???  
              </span>
            )}
          </div>
        </Dialog>
              {/* dialog xoa dang tin */}
              <Dialog
          visible={this.state.RemoveHouseForRentDialog}
          style={{ width: "450px" }}
          header="Thu hồi tin cho thuê phòng trọ"
          modal
          footer={removeDialogFooter}
          onHide={()=>this.onHide("RemoveHouseForRentDialog")}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {this.state.room && (
              <span>
                Bạn muốn thu hồi tin cho thuê ???  
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
    //house
    listHouse: state.HouseReducer.listHouse,
    //room
    listRoom: state.RoomReducer.listRoom,
    listPerson: state.RoomReducer.listPersonInRoom,
    listService: state.RoomReducer.listServiceInRoom,
    removePersonStatus: state.RoomReducer.removePersonStatus,
    removeServiceStatus: state.RoomReducer.removeServiceStatus,

    createStatus: state.RoomReducer.createStatus,
    editStatus: state.RoomReducer.editStatus,
    deleteStatus: state.RoomReducer.deleteStatus,

    postRoomStatus: state.RoomReducer.postRoomStatus,
    unpostRoomStatus: state.RoomReducer.unpostRoomStatus,
    //customer
  };
}
export default withGlobalContext(
  connect(mapStateToProps, {postRoom,unpostRoom,removePersonToRoom,getPersonInRoom,getServiceInRoom,removeServiceToRoom, getHouseByUserId,getRoomByHouseId ,createRoom, editRoom, deleteRoom})(PhongTro),
);