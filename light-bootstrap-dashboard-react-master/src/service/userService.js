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
            this.callPatchLocalAPI2(this.url,editdata).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    editUser = (editdata)=>{
        return new Promise((resolve , reject)=>{
            this.callPatchLocalAPI2(this.url2,editdata).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    callPatchLocalAPI2 = async (url,data) => {
        try {
            const response = await axios.patch(url,data,{headers:{Authorization:'Bearer ' + localStorage.getItem("auth-token")
        }});
            if (typeof (response) === 'object' && 'error' in response) {        
                return {
                    status: dataStatus.FAILED,
                    message: response.error.data.message
                }
            }
            else {
                return {
                    status: dataStatus.SUCCESS,
                    data: response.data
                }
            }
        } catch (error) {
            console.log(`Error when call API: `, error)
            return {
                status: dataStatus.FAILED,
                message: 'Call API error'
            }
        }
    }
}
export default UserService;