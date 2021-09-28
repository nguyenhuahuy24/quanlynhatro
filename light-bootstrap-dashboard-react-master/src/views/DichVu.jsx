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
import classNames from 'classnames';
import { InputText } from 'primereact/inputtext';
import UserContext from "../context/UserContext";


import { withGlobalContext } from '../GlobalContextProvider';
import { connect } from 'react-redux';
import { getServiceOfUser ,createDichVu, editDichVu, deleteDichVu} from '../redux/action/dichVuAction/DichVuAction'
import { dataStatus } from "../utility/config";



class DichVu extends Component {
  static contextType = UserContext
  emptyDV = {
    ServiceName: "",
    Description: "",
    Price: 0,
    UserId:null
  };

  constructor(props) {
    super(props);

    this.state = {
      DVs: null,
      DVDialog: false,
      deleteDVDialog: false,
      deleteDVsDialog: false,
      DV: this.emptyDV,
     // loginuserID: localStorage.getItem("userIDlogin"),
      selectedDVs: null,
      submitted: false,
      globalFilter: null,
      selectedCategory: null,
      
    };
  
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.openNew = this.openNew.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.saveDV = this.saveDV.bind(this);
    this.editDV = this.editDV.bind(this);
    this.confirmDeleteDV = this.confirmDeleteDV.bind(this);
    this.deleteDV = this.deleteDV.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
    this.hideDeleteDVDialog = this.hideDeleteDVDialog.bind(this);
    this.hideDeleteDVsDialog = this.hideDeleteDVsDialog.bind(this);
    this.onDichVuChange = this.onDichVuChange.bind(this);
  }
  componentWillMount(){
    const{userData,setUserData}= this.context;
    this.emptyDV.UserId = userData.user;
    this.state.house=this.emptyDV;
  }
  componentDidMount() {
    // this.DVService
    //   .getServiceOfUser()
    //   .then(data => this.setState({ DVs: data }));
    this.props.getServiceOfUser();
  }
  componentDidUpdate(prevProps){
    if (this.props.createStatus !== prevProps.createStatus) {
      if (this.props.createStatus.status === dataStatus.SUCCESS) {
         this.props.getServiceOfUser();
      }
    }
    if (this.props.editStatus !== prevProps.editStatus) {
      if (this.props.editStatus.status === dataStatus.SUCCESS) {
         this.props.getServiceOfUser();
         
      }
    }
    if (this.props.deleteStatus !== prevProps.deleteStatus) {
      if (this.props.deleteStatus.status === dataStatus.SUCCESS) {
            if(this.props.deleteStatus.data.deletedCount === 1)
          {
            this.setState({
            //  DVs,
              deleteDVDialog: false,
              DV: this.emptyDV
            });
            this.toast.show({
              severity: "success",
              summary: "Successful",
              detail: "Dịch Vụ Deleted",
              life: 3000
            });
          }else{
            this.toast.show({
              severity: "success",
              summary: "Fail",
              detail: "Dich Vụ Deleted",
              life: 3000
            });
          }
        this.props.getServiceOfUser();
      }
    }
    if (this.props.listDichVu !== prevProps.listDichVu) {
      if (this.props.listDichVu.status === dataStatus.SUCCESS) {
        this.setState({ DVs: this.props.listDichVu.data })
      } 
    }
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
    if (this.state.DV.ServiceName.trim()) {
     // let DVs = [...this.state.DVs];
      let DV = { ...this.state.DV };
      if (this.state.DV._id) {
        //const index = this.findIndexById(this.state.DV._id);
        this.props.editDichVu(this.state.DV._id,DV);
       // DVs[index] = DV;
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "Dịch Vụ Updated",
          life: 3000
        });
      } else {
        this.props.createDichVu(DV);
       // DVs.push(DV);
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "Dịch Vụ Created",
          life: 3000
        });
      }
      state = {
        ...state,
       // DVs,
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
    this.props.deleteDichVu(this.state.DV._id);
  }
  findIndexById(_id) {
    let index = -1;
    for (let i = 0; i < this.state.DVs.length; i++) {
      if (this.state.DVs[i]._id === _id) {
        index = i;
        break;
      }
    }
    return index;
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
    return this.formatCurrency(rowData.Price);
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
            dataKey="_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Dịch vụ"
            globalFilter={this.state.globalFilter}
            header={header}
          >
             <Column
              selectionMode="multiple"
              headerStyle={{ width: "5rem" }}
            ></Column>
            <Column field="ServiceName" header="Tên Dịch Vụ" ></Column>
            <Column
              field="Price"
              header="Giá dịch vụ"
              body={this.priceBodyTemplate}
              sortable
            ></Column>
            <Column field="Description" header="Ghi chú" ></Column>
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
            <label htmlFor="ServiceName">Tên dịch vụ</label>
            <InputText
              id="ServiceName"
              value={this.state.DV.ServiceName}
              onChange={(e) => this.onInputChange(e, "ServiceName")}
              required
              autoFocus
              className={classNames({
                "p-invalid": this.state.submitted && !this.state.DV.ServiceName
              })}
            />
            {this.state.submitted && !this.state.DV.ServiceName && (
              <small className="p-invalid">Tên không được để trống.</small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="Price">Giá cả</label>
            <InputNumber
              id="Price"
              value={this.state.DV.Price}
              onValueChange={(e) => this.onInputNumberChange(e, "Price")}
              mode="currency"
              currency="Vnd"
            />
          </div>
          <div className="p-field">
            <label htmlFor="Description">Ghi chú</label>
            <InputTextarea
              id="Description"
              value={this.state.DV.Description}
              onChange={(e) => this.onInputChange(e, "Description")}
              required
            />
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
                Bạn chắn chắn muốn xóa đã chọn <b>{this.state.DV.ServiceName}</b>
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
    listDichVu: state.DichVuReducer.listDichVu,
    createStatus: state.DichVuReducer.createStatus,
    editStatus: state.DichVuReducer.editStatus,
    deleteStatus: state.DichVuReducer.deleteStatus,
  };
}
export default withGlobalContext(
  connect(mapStateToProps, { getServiceOfUser ,createDichVu, editDichVu, deleteDichVu})(DichVu),
);