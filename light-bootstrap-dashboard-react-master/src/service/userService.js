import axios from 'axios';
import Service from './Service';
import { dataStatus, userProfile } from '../utility/config';
class UserService extends Service {  
    constructor() {
        super();
        this.url =`http://localhost:8080/user/changePassWord/`
        this.url2 =`http://localhost:8080/user/`
    }
    getUser = () =>{
        return new Promise((resolve, reject)=>{
            this.callGetLocalAPI(this.url2).then(resp =>{   
               
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    changePassWord = (editdata)=>{
        return new Promise((resolve , reject)=>{
            this.callPatchLocalAPI(this.url,editdata).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    editUser = (editdata)=>{
        return new Promise((resolve , reject)=>{
            this.callPatchLocalAPI(this.url2,editdata).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    } 
}
export default UserService;