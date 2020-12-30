import axios from 'axios';

export default class NhaTroService {  
    getHouseByUserId()
    {
        return axios.get(`http://localhost:8080/house/`,{headers:{
            Authorization:'Bearer ' + localStorage.getItem("auth-token")
        }}).then((res) => res.data);
    }
    deleteHouse(id){
        return axios.delete(`http://localhost:8080/house/`+ id).then((res) => res.data);
    }
    updateHouse(id,data){
        return axios.patch(`http://localhost:8080/house/`+id,data).then((res)=> res.data);
    }
    createHouse(data){
        return axios.post(`http://localhost:8080/house/`, data).then((res) => res.data);
    }
}