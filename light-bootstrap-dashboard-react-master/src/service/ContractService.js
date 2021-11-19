import axios from 'axios';
import Service from './Service';
import { dataStatus, userProfile } from '../utility/config';
class ContractService extends Service {  
    constructor() {
        super();
        this.url =`http://localhost:8080/contract/`
        this.url_update =`http://localhost:8080/contract/update/`
    }

    getContractOfUser = () =>{
        return new Promise((resolve, reject)=>{
            this.callGetLocalAPI(this.url).then(resp =>{   
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    createContract = (data)=>{
        return new Promise((resolve , reject)=>{
            this.callPostAPI(this.url,data).then(resp =>{          
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    editContract = (id, editdata)=>{
        return new Promise((resolve , reject)=>{
            this.callPatchAPI(this.url_update,id, editdata).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    deleteContract = (id)=>{
        return new Promise((resolve , reject)=>{
            this.callDeleteAPI(this.url,id).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    
}
export default ContractService;