import axios from 'axios';
import Service from './Service';
import { dataStatus, userProfile,URL } from '../utility/config';
class UtilityBillsService extends Service {  
    constructor() {
        super();
        this.url =`${URL}/utilitybills/`
    }
    callGetAPI = async (data) => {
        try {
    const response = await axios.patch(this.url,data,{headers:{Authorization:'Bearer ' + localStorage.getItem("auth-token")}});
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
     
    getAllUtilityBillByHouseId = (data) =>{
        return new Promise((resolve, reject)=>{
            this.callGetAPI(data).then(resp =>{
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
            this.callPatchLocalAPI(this.url,id, editdata).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    deleteUtilityBill = (id)=>{
        return new Promise((resolve , reject)=>{
            this.callDeleteAPI(this.url,id).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    
}
export default UtilityBillsService;