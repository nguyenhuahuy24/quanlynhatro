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
import UserContext from "../context/UserContext";
import classNames from 'classnames';
import '../index.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import '../index.css';
//redux
import { withGlobalContext } from '../GlobalContextProvider';
import { connect } from 'react-redux';
import {addPersonToRoom,removePersonToRoom} from '../redux/action/roomAction/RoomAction';
import {getAllCustomerOfUser ,createCustomer, editCustomer, deleteCustomer} from '../redux/action/customerAction/CustomerAction'
import {getHouseByUserId} from '../redux/action/houseAction/HouseAction'
import {getRoomByHouseId} from '../redux/action/roomAction/RoomAction'

import { dataStatus } from "../utility/config";

class KhachThue extends Component {
  static contextType = UserContext
  emptyUser = {
    Name: "",
    Age: "",
    Email: "",
    Phone: null,
    PermanentAddress: "",
    Cmnd: null,
    DateCmnd: "",
    PlaceCmnd: "",
    Image: null,
    UserId:null,
  };

  constructor(props) {
    super(props);

    this.state = {
      users: null,
      houses: null,
      rooms: null,
      userDialog: false,
      deleteUserDialog: false,
      AddtoRoomDialog: false,
      user: this.emptyUser,
      selectedusers: null,
      submitted: false,
      AddPhone:null,
      selectedDateCMND:null,
      globalFilter: null,
      selectedHouse: null,
      selectedShowHouse:"",
      selectedRoom: null,
      selectedShowRoom:"",
      selectedFile: null,
      profileImg: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    };
    
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.editUser = this.editUser.bind(this);
    this.openNew = this.openNew.bind(this);
    this.AddtoRoom=this.AddtoRoom.bind(this);
    this.openAddtoRoom = this.openAddtoRoom.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.confirmDeleteUser = this.confirmDeleteUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.onHouseChange = this.onHouseChange.bind(this);
    this.onRoomChange = this.onRoomChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeleteUserDialog = this.hideDeleteUserDialog.bind(this);
    this.hideAddtoRoomUserDialog = this.hideAddtoRoomUserDialog.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);

  }
  componentWillMount(){
    const{userData,setUserData}= this.context;
    this.emptyUser.UserId = userData.user;
    this.state.user=this.emptyUser;
  }
  componentDidMount() {
    this.props.getHouseByUserId();
    this.props.getAllCustomerOfUser();
  }
  componentDidUpdate(prevProps) {

    if (this.props.listHouse !== prevProps.listHouse) {
      if (this.props.listHouse.status === dataStatus.SUCCESS) {
          this.props.getRoomByHouseId(this.state.selectedHouse);
      } 
    }
    if (this.props.listCustomer !== prevProps.listCustomer) {
      if (this.props.listCustomer.status === dataStatus.SUCCESS) {
        this.setState({ users: this.props.listCustomer.data })
      } 
    }
    if (this.props.createStatus !== prevProps.createStatus) {
      if (this.props.createStatus.status === dataStatus.SUCCESS) {
         this.props.getAllCustomerOfUser();
      }
    }
    if (this.props.editStatus !== prevProps.editStatus) {
      if (this.props.editStatus.status === dataStatus.SUCCESS) {
         this.props.getAllCustomerOfUser(); 
      }
    }
    if (this.props.deleteStatus !== prevProps.deleteStatus) {
      if (this.props.deleteStatus.status === dataStatus.SUCCESS) {
        if (this.props.deleteStatus.data.deletedCount === 1) {
                      this.setState({
                  deleteUserDialog: false,
                  user:this.emptyUser
                });
                this.toast.show({
                  severity: "success",
                  summary: "Successful",
                  detail: "Xóa Bill",
                  life: 3000
                });
          }else {
                      this.toast.show({
                severity: "error",
                summary: "Fail",
                detail: "Xóa Bill",
                life: 3000
              });
          }
        this.props.getAllCustomerOfUser(); 
      }
    }
    if (this.props.addPersonStatus !== prevProps.addPersonStatus) {
      if (this.props.addPersonStatus.status === dataStatus.SUCCESS) {
            console.log(`test: `,this.props.addPersonStatus.data);
            if(this.props.addPersonStatus.data.err)
              {
                this.setState({
                AddtoRoomDialog: false
                });
                this.toast.show({
                  severity: "error",
                  summary: "Thất bại",
                  detail: this.props.addPersonStatus.data.err,
                  life: 6000
                });
            }else
            {
              this.setState({
              AddtoRoomDialog: false
              });
              this.toast.show({
              severity: "success",
              summary: "Successful",
              detail: "Thêm khách thuê",
              life: 3000
            });
            }
              
        
      }
    }
  }
  onHouseChange(e) {
    this.setState({ selectedHouse: e.value._id, selectedShowHouse: e.value });
    this.props.getRoomByHouseId(e.value._id);
  }
  onRoomChange(e) {
    this.setState({ selectedRoom: e.value._id, selectedShowRoom: e.value });
    
  }
  formatCurrency(value) {
    return value.toLocaleString("vnd", {
      style: "currency",
      currency: "VND"
    });
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
  openNew() {
    this.setState({
      user: this.emptyUser,
      submitted: false,
      userDialog: true
    });
  }
  openAddtoRoom(user) {
    this.setState({
      user,
      AddtoRoomDialog: true
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
  hideAddtoRoomUserDialog() {
    this.setState({ AddtoRoomDialog: false });
  }
  saveUser() {
    let state = { submitted: true };
    
    if (this.state.user.Name.trim()) {
      // let users = [...this.state.users];
      let user = { ...this.state.user };
      const fd = new FormData();
      fd.append("Name", this.state.user.Name);
      fd.append("Age", this.state.user.Age);
      fd.append("Email", this.state.user.Email);
      fd.append("Phone", this.state.user.Phone);
      fd.append("PermanentAddress", this.state.user.PermanentAddress);
      fd.append("Cmnd", this.state.user.Cmnd);
      fd.append("DateCmnd", this.state.selectedDateCMND);
      fd.append("PlaceCmnd", this.state.user.PlaceCmnd);
      fd.append("Image", this.state.selectedFile);
      fd.append("RoomId", this.state.selectedRoom);
      if (this.state.user._id) {
      //  this.state.user = this.userService.getCustomerById(this.state.user._id)
        this.props.editCustomer(this.state.user._id, fd);
        // this.userService.updateCustomer(this.state.user._id, fd).then();
        // users[index] = user;
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "User Updated",
          life: 3000
        });
      } else {
        this.props.createCustomer(fd);
        // this.userService.createCustomer(fd).then();
        //   users.push(user);
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "User Created",
          life: 3000
        });
      }
      state = {
        ...state,
        //  users,
        AddPhone:null,
        selectedDateCMND:null,
        selectedFile:null,
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
    this.props.deleteCustomer(this.state.user._id);
  }
  findIndexById(_id) {
    let index = -1;
    for (let i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i]._id === _id) {
        index = i;
        break;
      }
    }

    return index;
  }
  AddtoRoom() {
    let state = { submitted: true };
    this.props.addPersonToRoom(this.state.selectedRoom,this.state.user._id);
  }
  // onStatusChange(e) {
  //   let user = { ...this.state.user };
  //   user["gender"] = e.value;
  //   this.setState({ user });
  // }
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
          className="p-button-rounded p-button-danger p-mr-2"
          onClick={() => this.confirmDeleteUser(rowData)}
        />
        <Button
          icon="pi pi-plus"
          className="p-button-rounded p-button-warning p-mr-2"
          onClick={()=>this.openAddtoRoom(rowData)}
        />
      </React.Fragment>
    );
  }
  render() {
    const { profileImg } = this.state
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
    const AddtoRoomDialogFooter = (
      <React.Fragment>
        <Button
          label="Cancel"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideAddtoRoomUserDialog}
        />
        <Button
          label="Add"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.AddtoRoom}
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
            value={this.props.listCustomer.data}
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
            <Column field="Name" header="Tên Khách Hàng" ></Column>
            <Column field="Phone" header="Số điện thoại" ></Column>
            <Column field="Age" header="Tuổi" ></Column>
            <Column field="PermanentAddress" header="Địa chỉ thường trú" ></Column>
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
              <label htmlFor="Name">Tên khách hàng</label>
              <InputText
                id="Name"
                value={this.state.user.Name}
                onChange={(e) => this.onInputChange(e, "Name")}
                required
                autoFocus
                className={classNames({
                  "p-invalid": this.state.submitted && !this.state.user.Name
                })}
              />
              {this.state.submitted && !this.state.user.Name && (
                <small className="p-invalid">Tên không được để trống.</small>
              )}
            </div>
            <div className="p-field p-col">
              <label htmlFor="Age">Tuổi</label>
              <InputNumber
                id="Age"
                value={this.state.user.Age}
                onChange={(e) => this.onInputNumberChange(e, "Age")}
                required
              /> </div>
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="Email" >Email</label>
              <InputText
                id="Email"
                value={this.state.user.Email}
                onChange={(e) => this.onInputChange(e, "Email")}
              />
            </div>
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="Phone">Điện thoại</label>
              <InputMask
                id="Phone"
                mask="9999999999"
                value={this.state.user.Phone}
                onChange={(e) => this.onInputNumberChange(e, "Phone")}
              ></InputMask>
            </div>
            <div className="p-field p-col">
              <label htmlFor="Cmnd">CMND/thẻ căn cước</label>
              <InputText
                id="Cmnd"
                value={this.state.user.Cmnd}
                onChange={(e) => this.onInputChange(e, "Cmnd")}
                required

              /> </div>
          </div>
          <div className="p-field">
            <label htmlFor="PermanentAddress">Địa chỉ thường trú</label>
            <InputTextarea
              id="PermanentAddress"
              value={this.state.user.PermanentAddress}
              onChange={(e) => this.onInputChange(e, "PermanentAddress")}
              required
            />
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="DateCmnd">Ngày cấp</label>
              <Calendar 
              value={this.state.selectedDateCMND} 
              onChange={(e) => this.setState({ selectedDateCMND: e.value })} showIcon />
            </div>
            <div className="p-field p-col">
              <label htmlFor="PlaceCmnd">Nơi cấp</label>
              <InputText
                id="PlaceCmnd"
                value={this.state.user.noicapCMND}
                onChange={(e) => this.onInputChange(e, "PlaceCmnd")}
                required
              /> </div>
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
              <img src={profileImg} alt="" id="Image" className="img" />
              {/* `http://localhost:8080/` + this.state.user.Image */}
            </div>
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
            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: "2rem" }}/>
            {this.state.user && (
              <span>
                Bạn chắn chắn muốn xóa đã chọn ??? <b>{this.state.user.Name}</b>
                    ?
              </span>
            )}
          </div>
        </Dialog>
        <Dialog
          visible={this.state.AddtoRoomDialog}
          style={{ width: "450px" }}
          header="Thêm vào phòng"
          modal
          className="p-fluid"
          footer={AddtoRoomDialogFooter}
          onHide={this.hideAddtoRoomUserDialog}
        >
          <div className="p-field">
            <label htmlFor="">Nhà</label>
            <Dropdown
              className="p-mr-2"
              value={this.state.selectedShowHouse}
              options={this.props.listHouse.data}
              onChange={this.onHouseChange}
              optionLabel="Name"
              placeholder="Chọn nhà trọ"
            />
          </div>
          <div className="p-field">
            <label htmlFor="">Phòng</label>
            <Dropdown
              className="p-mr-2"
              value={this.state.selectedShowRoom}
              options={this.props.listRoom.data}
              onChange={this.onRoomChange}
              optionLabel="RoomNumber"
              placeholder="Chọn phòng trọ"
            />
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
    addPersonStatus: state.RoomReducer.addPersonStatus,
    removePersonStatus: state.RoomReducer.removePersonStatus,
    //customer
    listCustomer: state.CustomerReducer.listCustomer,
    createStatus: state.CustomerReducer.createStatus,
    editStatus: state.CustomerReducer.editStatus,
    deleteStatus: state.CustomerReducer.deleteStatus,
    //house
    listHouse: state.HouseReducer.listHouse,
    
  };
}
export default withGlobalContext(
  connect(mapStateToProps, {getRoomByHouseId,getHouseByUserId, addPersonToRoom,removePersonToRoom,getAllCustomerOfUser ,createCustomer, editCustomer, deleteCustomer})(KhachThue),
);