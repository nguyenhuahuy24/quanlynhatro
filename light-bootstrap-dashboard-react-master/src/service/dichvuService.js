import axios from 'axios';

export default class DichVuService {  
    getDichVus() {
        return axios.get(`https://api.jsonbin.io/b/5fd09850516f9d12702a45c5/4`).then((res) => res.data.khutro);
    }
    getDiens() {
        return axios.get(`https://api.jsonbin.io/b/5fd09850516f9d12702a45c5/4`).then((res) => res.data.khutro);
    }
    getNuocs() {
        return axios.get(`https://api.jsonbin.io/b/5fd09850516f9d12702a45c5/4`).then((res) => res.data.khutro);
    }
}