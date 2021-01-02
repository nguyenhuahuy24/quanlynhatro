import axios from 'axios';

export default class UtilityBillService {  
    getAllUtilityBillByHouseId(houseId,Month) {
        return axios
        .get(`http://localhost:8080/utilitybills?HouseId=`+houseId+'&Month='+Month,{headers:{
            Authorization:'Bearer ' + localStorage.getItem("auth-token")
        }})
        .then((res) => res.data[0]);
    }
    deleteUtilityBill(id){
        return axios.delete(`http://localhost:8080/utilitybills/`+ id).then((res) => res.data);
    }
    createUtilityBill(data){
        return axios.post(`http://localhost:8080/utilitybills/`,data).then((res) => res.data);
    }
    updateUtilityBill(id,data){
        return axios.patch(`http://localhost:8080/utilitybills/`+id,data).then((res) => res.data);
    }
}