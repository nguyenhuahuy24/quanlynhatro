import axios from 'axios';

export default class PhongTroService {  
    getPhongTros() {
        return axios.get(`https://api.jsonbin.io/b/5fd095932946d2126f006363`).then((res) => res.data.nhatro);
    }
}