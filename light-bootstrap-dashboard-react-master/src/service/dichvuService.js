import axios from 'axios';

export default class DichVuService {  
    getServiceOfUser() {
        return axios.get(`http://localhost:8080/service/user/`,{headers:{
            Authorization:'Bearer ' + localStorage.getItem("auth-token")
        }}).then((res) => res.data);
    }
    deleteDichVu(id){
        return axios.delete(`http://localhost:8080/service/`+ id).then((res) => res.data);
    }
    createDichVu(data){
        return axios.post(`http://localhost:8080/service/`,data).then((res) => res.data);
    }
    updateDichVu(id,data){
        return axios.patch(`http://localhost:8080/service/`+id,data).then((res) => res.data);
    }
}