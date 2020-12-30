import axios from 'axios';

export default class BillService {  
    getBillByHouse(houseId) {
        return axios.get(`http://localhost:8080/bill/`+houseId).then((res) => res.data);
    }
    deleteBill(id){
        return axios.delete(`http://localhost:8080/bill/`+ id).then((res) => res.data);
    }
    updateBill(id,data){
        return axios.patch(`http://localhost:8080/bill/`+id,data).then((res)=> res.data);
    }
    createBill(data){
        return axios.post(`http://localhost:8080/bill/`,data).then((res) => res.data);
    }
    getBillInMonthOfUser(houseId,userId){
        return axios
        .get(`http://localhost:8080/bill?HouseId=`+houseId+`&UserId=`+userId)
        .then((res) => res.data[0]);
    }

}