import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Calendar } from 'primereact/calendar'
import { Dropdown } from "primereact/dropdown";
import DichVuService from '../service/dichvuService';
import '../index.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import '../index.css';

class Nuoc extends Component {
  emptyNuoc = {
    id: null,
    Housename: "",
    RoomNumber: null,
    NuocCu: 0,
    NuocMoi: 0,
    total:0,
    date: ""
  };

  constructor(props) {
    super(props);
   
    this.state = {
      Nuocs: null,
      Nuoc: this.emptyNuoc,
      submitted: false,
      selectedNha:null
    };

    this.dichvuService = new DichVuService();
    this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
    this.saveNuoc = this.saveNuoc.bind(this);
    this.onNhaChange = this.onNhaChange.bind(this);
    this.onInputNumberChange = this.onInputNumberChange.bind(this);
  }

  componentDidMount() {
    this.dichvuService
      .getNuocs()
      .then(data => this.setState({ Nuocs: data }));
  }


 /* onCityChange(e) {
    this.setState({ selectedCity1: e.value });
  }
  */
  saveNuoc() {
    let state = { submitted: true };

    if (this.state.Nuoc.Housename.trim()) {
      let Nuocs = [...this.state.Nuocs];
      let Nuoc = { ...this.state.Nuoc };
      if (this.state.Nuoc.id) {
        const index = this.findIndexById(this.state.Nuoc.id);

        Nuocs[index] = Nuoc;
        this.toast.show({
          severity: "success",
          summary: "Successful",
          detail: "Lưu thành công",
          life: 3000
        });
      }
      state = {
        ...state,
        Nuocs,
        Nuoc: this.emptyNuoc
      };
    }

    this.setState(state);
  }
  onInputNumberChange(e, name) {
    const val = e.value || 0;
    let Nuoc = { ...this.state.Nuoc };
    Nuoc[`${name}`] = val;

    this.setState({ Nuoc });
  }
  onNhaChange(e) {
     this.setState({ selectedNha: e.value });
   }
  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <h4 className="p-m-0">Chỉ số Nước</h4>
      </React.Fragment>
    );
  }
  rightToolbarTemplate() {
    return (
      <React.Fragment>
        <Button
          label="Lưu"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={this.saveNuoc}
        />
      </React.Fragment>
    );
  }

  render() {
    const header = (
      <div className="table-header">
  
        <span className="p-input-icon-right">
        <label className="p-mr-2" htmlFor="datestart">Tháng/Năm </label>
        <Calendar className="p-mr-2" value={this.state.date} onChange={(e) => this.setState({ date: e.value })} showIcon />
        <Dropdown
          className="p-mr-2"
          value={this.state.selectedKhuTro}
          options={this.state.houses}
          onChange={this.onNhaChange}
          optionLabel="name"
          placeholder="Chọn nhà trọ"

        />
        </span>
      </div>
    );
    return (
      <div className="datatable-crud-demo">
        <Toast ref={(el) => (this.toast = el)} />

        <div className="card">
          <Toolbar
            className="p-mb-4"
            left={this.leftToolbarTemplate}
            right={this.rightToolbarTemplate}
          ></Toolbar>

          <DataTable
            ref={(el) => (this.dt = el)}
            value={this.state.Nuocs}
            dataKey="id"
            className="p-datatable-gridlines"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} "
            header={header}
          >
            <Column field="" header="Nhà" ></Column>
            <Column field="" header="Phòng" ></Column>
            <Column field="" header="CS Nước Cũ" ></Column>
            <Column field="" header="CS Nước Mới" ></Column>
            <Column field="" header="Sử Dụng" ></Column>
          </DataTable>
        </div>
      </div>
    );
  }
  }

export default Nuoc;
