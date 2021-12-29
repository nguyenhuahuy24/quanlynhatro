import axios from 'axios';
import Service from './Service';
import { dataStatus, userProfile,URL } from '../utility/config';
class BillsService extends Service {  
    constructor() {
        super();
        this.url =`${URL}/bill/`
        this.url_recalculateBill=`${URL}/bill/recalculate/`
    }
    callGetAPIBill = async (data) => {
        try {
            const response = await axios.patch(this.url,data)
            if (typeof (response) === 'object' && 'error' in response) {
                return {
                    status: dataStatus.FAILED,
                    message: response
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
    callPatchBillAPI = async (url,id) => {
        try {
            const response = await axios.patch(url + id).then((res) => res.data);
            console.log("service: ",response)
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
    callPostAPI = async (data) => {
        try {
            const response = await axios.post(this.url, data).then((res) => res.data);   
            if (typeof (response) === 'object' && 'error' in response) {
                return {
                    status: dataStatus.FAILED,
                    message: response.error
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
    getBillInMonthOfUser = (data) =>{
        return new Promise((resolve, reject)=>{
            this.callGetAPIBill(data).then(resp =>{
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
    recalculateBill = (id)=>{
        return new Promise((resolve , reject)=>{
            this.callPatchBillAPI(this.url_recalculateBill,id).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    deleteBill = (id)=>{
        return new Promise((resolve , reject)=>{
            this.callDeleteAPI(this.url,id).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    
}
export default BillsService;