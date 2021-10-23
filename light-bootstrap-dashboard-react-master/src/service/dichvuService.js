import axios from 'axios';
import Service from './Service';
class DichVuService extends Service {  
    constructor() {
        super();
        this.url =`http://localhost:8080/service/`
        this.url2=`http://localhost:8080/service/user/`
    }

    getServiceOfUser = () =>{
        return new Promise((resolve, reject)=>{
            this.callGetLocalAPI(this.url2).then(resp =>{   
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    createDichVu = (data)=>{
        return new Promise((resolve , reject)=>{
            this.callPostAPI(this.url,data).then(resp =>{          
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    editDichVu = (id, editdata)=>{
        return new Promise((resolve , reject)=>{
            this.callPatchAPI(this.url,id, editdata).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    deleteDichVu = (id)=>{
        return new Promise((resolve , reject)=>{
            this.callDeleteAPI(this.url,id).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    
}
export default DichVuService;