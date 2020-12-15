import axios from 'axios';

export default class NhaTroService {  
    getHouses() {
        return axios.get(`http://localhost:8080/house/`).then((res) => res.data);
    }
    deleteHouse(id){
        return axios.delete(`http://localhost:8080/house/`+ id).then((res) => res.data);
    }

}