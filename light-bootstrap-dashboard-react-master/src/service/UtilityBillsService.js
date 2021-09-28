import axios from 'axios';
import Service from './Service';
import { dataStatus, userProfile } from '../utility/config';
class UtilityBillsService extends Service {  
    constructor() {
        super();
        this.url =`http://localhost:8080/utilitybills/`
    }
    callGetAPI = async (houseId,Month) => {
        try {
            const response = await axios.get(`http://localhost:8080/utilitybills?HouseId=`+houseId+'&Month='+Month,{headers:{Authorization:'Bearer ' + localStorage.getItem("auth-token")}})
            
            if (typeof (response) === 'object' && 'error' in response) {
                return {
                    status: dataStatus.FAILED,
                    message: response.error.data.message
                }
            }
            else {
                return {
                    status: dataStatus.SUCCESS,
                    data: response.data[0]
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
     
    getAllUtilityBillByHouseId = (houseId,Month) =>{
        return new Promise((resolve, reject)=>{
            this.callGetAPI(houseId,Month).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    createUtilityBill = (data)=>{
        return new Promise((resolve , reject)=>{
            this.callPostAPI(this.url,data).then(resp =>{          
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    editUtilityBill = (id, editdata)=>{
        return new Promise((resolve , reject)=>{
            this.callPatchAPI(id, editdata).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    deleteUtilityBill = (id)=>{
        return new Promise((resolve , reject)=>{
            this.callDeleteAPI(id).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    
}
export default UtilityBillsService;