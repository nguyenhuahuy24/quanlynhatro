import axios from 'axios';

export default class UserService {  
    getUser() {
        return axios.get(`http://localhost:8080/user/`,{headers:{
            Authorization:'Bearer ' + localStorage.getItem("auth-token")
        }}).then((res) => res.data);
    }
    changePassWord(data) {
        return axios.patch(`http://localhost:8080/user/changePassWord`,data,{headers:{
            Authorization:'Bearer ' + localStorage.getItem("auth-token")
        }}).then((res) => res.data);
    }



}