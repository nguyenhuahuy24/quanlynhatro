import axios from 'axios';
import Service from './Service';
import { dataStatus, userProfile } from '../utility/config';
class BillsService extends Service {  
    constructor() {
        super();
        this.url =`http://localhost:8080/bill/`
    }
    callGetAPI = async (houseId,userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/bill?HouseId=`+houseId+`&UserId=`+userId)
            console.log(`service`,response);
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
    callPostAPI = async (data) => {
        try {
            const response = await axios.post(this.url, data).then((res) => res.data);   
            console.log("service utility create");  
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
    getBillInMonthOfUser = (houseId,userId) =>{
        return new Promise((resolve, reject)=>{
            this.callGetAPI(houseId,userId).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    createBill = (data)=>{
        return new Promise((resolve , reject)=>{
            this.callPostAPI(data).then(resp =>{          
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    editBill = (id, editdata)=>{
        return new Promise((resolve , reject)=>{
            this.callPatchAPI(id, editdata).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    deleteBill = (id)=>{
        return new Promise((resolve , reject)=>{
            this.callDeleteAPI(id).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    
}
export default BillsService;