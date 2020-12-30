import axios from 'axios';

export default class PhongTroService {  
    getRooms() {
        return axios.get(`http://localhost:8080/room/`).then((res) => res.data);
    }
    getRoomByHouseId(id) {
        return axios.get(`http://localhost:8080/room/house/`+id,{headers:{
            Authorization:'Bearer ' + localStorage.getItem("auth-token")
        }}).then((res) => res.data);
    }
    getRoomById(id)
    {
        return axios.get(`http://localhost:8080/room/`+id).then((res) => res.data);
    }
    deleteRoom(id){
        return axios.delete(`http://localhost:8080/room/`+ id).then((res) => res.data);
    }
    updateRoom(id,data){
        return axios.patch(`http://localhost:8080/room/`+id,data).then((res)=> res.data);
    }
    createRoom(data){
        return axios.post(`http://localhost:8080/room/`,data,{headers:{
            Authorization:'Bearer ' + localStorage.getItem("auth-token")
        }}).then((res) => res.data);
    }
    addPersonToRoom(roomId,customerId)
    {
        return axios.patch(`http://localhost:8080/room/`+roomId+`/addCustomer/`+customerId).then((res)=> res.data);
    }
    removePersonToRoom(roomId,customerId)
    {
        return axios.patch(`http://localhost:8080/room/`+roomId+`/removeCustomer/`+customerId).then((res)=> res.data);
    }
    getemtyRoom()
    {
        return axios.get(`http://localhost:8080/room/emptyRoom/`,{headers:{
            Authorization:'Bearer ' + localStorage.getItem("auth-token")
        }}).then((res) => res.data);
    }
    getNotemtyRoom()
    {
        return axios.get(`http://localhost:8080/room/notemptyRoom/`,{headers:{
            Authorization:'Bearer ' + localStorage.getItem("auth-token")
        }}).then((res) => res.data);
    }
}