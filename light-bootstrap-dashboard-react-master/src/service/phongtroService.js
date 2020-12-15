import axios from 'axios';

export default class PhongTroService {  
    getRooms() {
        return axios.get(`https://api.jsonbin.io/b/5fd09850516f9d12702a45c5/6`).then((res) => res.data.nhatro);
    }
}