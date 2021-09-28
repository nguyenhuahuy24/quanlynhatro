import axios from 'axios';
import Service from './Service';
import { dataStatus, userProfile } from '../utility/config';
class CustomerService extends Service {  
    constructor() {
        super();
        this.url =`http://localhost:8080/customer/`
    }
    getAllCustomerOfUser = () =>{
        return new Promise((resolve, reject)=>{
            this.callGetLocalAPI(this.url).then(resp =>{   
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    createCustomer = (data)=>{
        return new Promise((resolve , reject)=>{
            this.callPostLocalAPI(this.url,data).then(resp =>{ 
                console.log("service")         
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    editCustomer = (id, editdata)=>{
        return new Promise((resolve , reject)=>{
            this.callPatchAPI(id, editdata).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    deleteCustomer = (id)=>{
        return new Promise((resolve , reject)=>{
            this.callDeleteAPI(id).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    
}
export default CustomerService;