import axios from 'axios';
import Service from './Service';
import { dataStatus, userProfile } from '../utility/config';
class HouseService extends Service {  
    constructor() {
        super();
        this.url =`http://localhost:8080/house/`
    }    
    getHouseByUserId = () =>{
        return new Promise((resolve, reject)=>{
            this.callGetAPI(this.url).then(resp =>{              
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    createHouse = (data)=>{
        return new Promise((resolve , reject)=>{
            this.callPostAPI(this.url,data).then(resp =>{          
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    editHouse = (id, editdata)=>{
        return new Promise((resolve , reject)=>{
            this.callPatchAPI(id, editdata).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    deleteHouse = (id)=>{
        return new Promise((resolve , reject)=>{
            this.callDeleteAPI(id).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
}
export default HouseService;