import axios from 'axios';

export default class KhachThueService {  
    getAllCustomerOfUser() {
        return axios.get(`http://localhost:8080/customer/`,{headers:{
            Authorization:'Bearer ' + localStorage.getItem("auth-token")
        }}).then((res) => res.data);
    }
    getCustomerById(id) {
        return axios.get(`http://localhost:8080/customer/`+id).then((res) => res.data);
    }
    deleteCustomer(id){
        return axios.delete(`http://localhost:8080/customer/`+ id).then((res) => res.data);
    }
    updateCustomer(id,data){
        return axios.patch(`http://localhost:8080/customer/`+id,data).then((res)=> res.data);
    }
    createCustomer(data){
        return axios.post(`http://localhost:8080/customer/`,data,{headers:{
            Authorization:'Bearer ' + localStorage.getItem("auth-token")
        }}).then((res) => res.data);
    }

}