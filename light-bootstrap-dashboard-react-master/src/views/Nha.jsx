
import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from 'primereact/checkbox';

import axios from "axios";
import '../index.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import UserContext from "../context/UserContext";


import { withGlobalContext } from '../GlobalContextProvider';
import { connect } from 'react-redux';
import { getHouseByUserId ,createHouse, editHouse, deleteHouse} from '../redux/action/houseAction/HouseAction'
import { dataStatus,userProfile } from "../utility/config";


class Nha extends Component {
  static contextType = UserContext
  emptyHouse = {
    Name: '',
    Address: "",
    Province:"",
    District:"",
    Ward:"",
    UserId: userProfile.userId
  };
  constructor(props) {
    super(props);
   
    this.state = {
      houses: null,
      edit: false,
      houseDialog: false,
      deleteHouseDialog: false,
      deleteHousesDialog: false,
      house : this.emptyHouse,
    //  loginuserID: localStorage.getItem("userIDlogin"),
      selectedHouses: null,
      submitted: false,
      globalFilter: null,
      //
      listProvince:"",
      selectProvince:"",
      //
      listDistrict:"",
      selectDistrict:"",
      //
      listWard:"",
      selectWard:"",
      //
      checkBox:false
      
    };
    
    this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.openNew = this.openNew.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.saveHouse = this.saveHouse.bind(this);
    this.editHouse = this.editHouse.bind(this);
    this.confirmDeleteHouse = this.confirmDeleteHouse.bind(this);
    this.deleteHouse = this.deleteHouse.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeleteHouseDialog = this.hideDeleteHouseDialog.bind(this);
    this.hideDeleteHousesDialog = this.hideDeleteHousesDialog.bind(this);

    this.onChangeProvince = this.onChangeProvince.bind(this);
    this.onChangeDistrict = this.onChangeDistrict.bind(this);
    this.onChangeWard = this.onChangeWard.bind(this);

  }
  // componentWillMount(){
  //   const{userData,setUserData}= this.context;
  //   this.emptyHouse.UserId = userData.user;
  //   this.state.house=this.emptyHouse;
  // }
  componentDidMount() {
    
    // this.houseService
    //   .getHouseByUserId()
    //   .then(data =>this.setState({ houses: data }));
    this.props.getHouseByUserId();
    axios.get(`https://provinces.open-api.vn/api/p/`).then(res => this.setState({ listProvince: res.data }))
  }
  componentDidUpdate(prevProps){
    if (this.props.createStatus !== prevProps.createStatus) {
      if (this.props.createStatus.status === dataStatus.SUCCESS) {
         this.props.getHouseByUserId();
      }
    }
    if (this.props.editStatus !== prevProps.editStatus) {
      if (this.props.editStatus.status === dataStatus.SUCCESS) {
         this.props.getHouseByUserId(); 
      }
    }
    if (this.props.deleteStatus !== prevProps.deleteStatus) {
      if (this.props.deleteStatus.status === dataStatus.SUCCESS) {
        if (this.props.deleteStatus.data.deletedCount === 1) {
              this.setState({ 
                deleteHouseDialog: false,
                house: this.emptyHouse});
              this.toast.show({
                  severity: "success",
                  summary: "Successful",
                  detail: "House Deleted",
                  life: 3000
                });
          }else {
                this.toast.show({
                  severity: "warning",
                  summary: "Fail",
                  detail: "House Deleted",
                  life: 3000
                });
          }
        this.props.getHouseByUserId();
      }
    }
    if (this.props.listHouse !== prevProps.listHouse) {
      if (this.props.listHouse.status === dataStatus.SUCCESS) {
        const houses = this.props.listHouse.data
        let data =[];
        houses.forEach(house=>{
          data.push({
            _id: house._id,
            Name:house.Name,
            Address:house.Address,
            Province:house.Province,
            District:house.District,
            Ward:house.Ward,
            UserId:house.UserId,
            Add: house.Address + ", "+ house.Ward+", "+house.District+", "+house.Province,
            Rooms:house.Rooms.length
          })
        })
        this.setState({ houses: data })
      } 
    }
    // this.houseService
    //   .getHouseByUserId()
    //   .then(data => this.setState({ houses: data }));

  }
  openNew() {
    this.setState({
      house: this.emptyHouse,
      submitted: false,
      houseDialog: true,
      edit:true
    });
  }
  hideDialog() {
    this.setState({
      selectProvince:"",
      selectDistrict:"",
      selectWard:"",
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
    if (this.state.house.Name.trim()) {
    //  let houses = [...this.state.houses];
      let house = { ...this.state.house };
      if (this.state.house._id) {
        if(this.state.selectProvince ==="" || this.state.selectDistrict==="" || this.state.selectWard==="")
        {
            this.toast.show({
                severity: "error",
                summary: "Thất bại",
                detail: "Thông tin bị trống",
                life: 2500
              });
        }
        else {
          let data =[];  
          data.push({
            _id: house._id,
            Name:house.Name,
            Province:this.state.selectProvince.name,
            District:this.state.selectDistrict.name,
            Ward:this.state.selectWard.name,
            Address:house.Address,
            UserId:house.UserId,
          })

        //console.log("edit: ",data[0])
       this.props.editHouse(this.state.house._id, data[0]);
  
        this.toast.show({
          severity: "success",
          summary: "Thành công",
          detail: "Cập nhật thông tin nhà ",
          life: 3000
        });
          state = {
        ...state,
      // houses,
        selectProvince:"",
        selectDistrict:"",
        selectWard:"",
        houseDialog: false,
        house: this.emptyHouse
      };
        }
      }
      else {
          if(this.state.selectProvince ==="" || this.state.selectDistrict==="" || this.state.selectWard===""){
              this.toast.show({
                  severity: "error",
                  summary: "Thất bại",
                  detail: "Thông tin bị trống",
                  life: 2500
                });
          }
          else{
             let data =[];  
          data.push({
            Name:house.Name,
            Province:this.state.selectProvince.name,
            District:this.state.selectDistrict.name,
            Ward:this.state.selectWard.name,
            Address:house.Address,
            UserId:house.UserId,
          })
        
      this.props.createHouse(data[0]);
     
        this.toast.show({
          severity: "success",
          summary: "Thành công",
          detail: "Thêm thông tin nhà",
          life: 3000
        });
        state = {
        ...state,
      // houses,
        selectProvince:"",
        selectDistrict:"",
        selectWard:"",
        houseDialog: false,
        house: this.emptyHouse
      };
          }
      }
      
    }
    this.setState(state);
  }
  editHouse(house) {
    this.setState({
      house: { ...house },
      houseDialog: true,
      edit:false
    });
  }
  confirmDeleteHouse(house) {
    this.setState({
      house,
      deleteHouseDialog: true
    });
  }
  deleteHouse() {
    this.props.deleteHouse(this.state.house._id);
  }
  findIndexById(_id) {
    let index = -1;
    for (let i = 0; i < this.state.houses.length; i++) {
      if (this.state.houses[i]._id === _id) {
        index = i;
        break;
      }
    }
    return index;
  }
  onChangeWard(e){
    this.setState({selectWard:e.value})
  }
  onChangeDistrict(e){
    axios.get(`https://provinces.open-api.vn/api/d/${e.value.code}?depth=2`)
        .then(res => { this.setState({ selectDistrict: e.value, listWard: res.data.wards }) })
  }
  onChangeProvince(e){
    axios.get(`https://provinces.open-api.vn/api/p/${e.value.code}?depth=2`)
        .then(res => { this.setState({ selectProvince: e.value, listDistrict: res.data.districts,listWard:"" }) })
      
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
  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <Button
          label="Thêm nhà"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={this.openNew}
        />
        {/* <Button
          label="Xóa"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={this.confirmDeleteSelected}
          disabled={
            !this.state.selectedHouses || !this.state.selectedHouses.length
          }
        /> */}
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
          className="p-button-rounded p-button-danger"
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
          label="Hủy"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={this.hideDialog}
        />
        {this.state.edit !=false && <Button
          label="Lưu"
          icon="pi pi-check"
          className="p-button-success"
          onClick={this.saveHouse}
        /> }
        
         {this.state.edit != true && <Button
          label="Chỉnh sửa"
          icon="pi pi-pencil"
          className="p-button-warning"
          onClick={()=>this.setState({edit:true})}
        />}
      </React.Fragment>
    );
    const deleteHouseDialogFooter = (
      <React.Fragment>
        <Button
          label="Không"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={this.hideDeleteHouseDialog}
        />
        <Button
          label="Có"
          icon="pi pi-check"
          className="p-button-success"
          onClick={this.deleteHouse}
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
            ref={(el) => this.dt = el}
            value={this.state.houses}
            // selection={this.props.listHouse.data}
            // onSelectionChange={(e) =>
            //   this.setState({ selectedHouses: e.value })
            // }
            dataKey="id" 
            paginator rows={5} 
            // rowsPerPageOptions={[5, 10, 25]}
            // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            // currentPageReportTemplate="Showing {first} to {last} of {totalRecords} houses"
            globalFilter={this.state.globalFilter}
            header={header}>
            {/* <Column
              selectionMode="multiple"
              headerStyle={{ width: "5rem" }}
            ></Column> */}
            <Column field="Name" header="Tên nhà trọ" ></Column>
            <Column field="Rooms" header="Tổng phòng" ></Column>
            <Column field="Add" header="Địa chỉ" ></Column>
            <Column body={this.actionBodyTemplate}></Column>
          </DataTable>
        </div>

        <Dialog
          visible={this.state.houseDialog}
          style={{ width: "650px" }}
          header="Thông tin khu trọ"
          modal
          className="p-fluid"
          footer={houseDialogFooter}
          onHide={this.hideDialog}
        >
          <div className="p-field">
            <label htmlFor="Name">Tên Nhà Trọ</label>
            <InputText
              id="Name"
              value={this.state.house.Name}
              onChange={(e) => this.onInputChange(e, "Name")}
              required
              autoFocus

              className={classNames({
                "p-invalid": this.state.submitted && !this.state.house.Name
              })}
              disabled ={this.state.edit !=true}
            />
            {this.state.submitted && !this.state.house.Name && (
              <small className="p-invalid">Tên không được trống.</small>
            )}
          </div>
         
            <label htmlFor="Name">Địa Chỉ Nhà Trọ</label>
          
          {this.state.edit ==false && 
           <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="Province">Tỉnh/Thành:</label>
              <InputText
                id="Province"
                value={this.state.house.Province}
                onChange={(e) => this.onInputChange(e, "Province")}
                 //disabled ={this.state.edit !=true}  
                 disabled
              />
            </div>
            <div className="p-field p-col">
              <label htmlFor="District">Quận/Huyện:</label>
              <InputText
                id="District"
                value={this.state.house.District}
                onChange={(e) => this.onInputChange(e, "District")}
                 //disabled ={this.state.edit !=true}
                 disabled 
              />
            </div>
          </div>}
          {this.state.edit ==true && 
           <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="Province">Tỉnh/Thành:</label>
              <Dropdown
                  className="p-mr-2"
                  value={this.state.selectProvince}
                  options={this.state.listProvince}
                  onChange={this.onChangeProvince}
                  optionLabel="name"
                  placeholder="Chọn tỉnh/thành...."
                />
            </div>
            <div className="p-field p-col">
              <label htmlFor="District">Quận/Huyện:</label>
              <Dropdown
                  className="p-mr-2"
                  value={this.state.selectDistrict}
                  options={this.state.listDistrict}
                  onChange={this.onChangeDistrict}
                  optionLabel="name"
                  placeholder="Chọn quận/huyện...."
                />
            </div>
          </div> 
          }
          
          <div className="p-formgrid p-grid">
            {this.state.edit ===false &&
            <div className="p-field p-col">
              <label htmlFor="Ward">Phường/Xã:</label>
              <InputText
                id="Ward"
                
                value={this.state.house.Ward}
                onChange={(e) => this.onInputChange(e, "Ward")}
                 disabled ={this.state.edit !=true}  
              />
            </div>}
            {this.state.edit ===true &&
            <div className="p-field p-col">
              <label htmlFor="Ward">Phường/Xã:</label>
              <Dropdown
                  className="p-mr-2"
                  value={this.state.selectWard}
                  options={this.state.listWard}
                  onChange={this.onChangeWard}
                  optionLabel="name"
                  placeholder="Chọn phường/xã...."
                />
            </div>}
            <div className="p-field p-col">
              <label htmlFor="Address">Số nhà, đường:</label>
              <InputText
                id="Address"
                value={this.state.house.Address}
                onChange={(e) => this.onInputChange(e, "Address")}
                 disabled ={this.state.edit !=true}  
              />
            </div>
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
                Bạn chắn chắn muốn xóa đã chọn ??? <b>{this.state.house.Name}</b>
                ?
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
    listHouse: state.HouseReducer.listHouse,
    createStatus: state.HouseReducer.createStatus,
    editStatus: state.HouseReducer.editStatus,
    deleteStatus: state.HouseReducer.deleteStatus,
  };
}
export default withGlobalContext(
  connect(mapStateToProps, { getHouseByUserId,createHouse,editHouse, deleteHouse})(Nha),
);
