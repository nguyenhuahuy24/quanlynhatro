import axios from 'axios';
import Service from './Service';
import { dataStatus, userProfile } from '../utility/config';
class DichVuService extends Service {  
    constructor() {
        super();
        this.url =`http://localhost:8080/room/`
    }
    callGetAPI = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/room/house/` + id,{headers:{Authorization:'Bearer ' + localStorage.getItem("auth-token")}})  
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
    callAddPersonRoom = async (roomId,customerId)=>
    {
        try {
            const response = await axios.patch(this.url+roomId+`/addCustomer/`+customerId).then((res)=> res.data);
            console.log(`service: `,response);
            if (typeof (response) === 'object' && 'error' in response) {
                
                return {
                    status: dataStatus.FAILED,
                    message: response.error.data.message
                }
            }
            else {
                return {
                    status: dataStatus.SUCCESS,
                    data: response
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
    callRemovePersonRoom = async (roomId,customerId)=>
    {
        try {
            const response = axios.patch(this.url+roomId+`/removeCustomer/`+customerId).then((res)=> res.data);
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
    callEmptyRoom = async()=>{
        try {
            const response = await axios.get(`http://localhost:8080/room/emptyRoom/`,{headers:{Authorization:'Bearer ' + localStorage.getItem("auth-token")}}); 
          
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
    callNoteEmptyRoom = async()=>{
        try {
            const response = await axios.get(`http://localhost:8080/room/notemptyRoom/`,{headers:{Authorization:'Bearer ' + localStorage.getItem("auth-token")}})  
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
    
    ////////////////////////////////////////////////
    getRoomByHouseId = (id) =>{
        return new Promise((resolve, reject)=>{
            this.callGetAPI(id).then(resp =>{   
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    createRoom = (data)=>{
        return new Promise((resolve , reject)=>{
            this.callPostLocalAPI(this.url,data).then(resp =>{          
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    editRoom = (id, editdata)=>{
        return new Promise((resolve , reject)=>{
            this.callPatchAPI(id, editdata).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    deleteRoom = (id)=>{
        return new Promise((resolve , reject)=>{
            this.callDeleteAPI(id).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    addPersonToRoom = (roomId,customerId)=>{
        return new Promise((resolve , reject)=>{
            this.callAddPersonRoom(roomId,customerId).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    removePersonToRoom = (roomId,customerId)=>{
        return new Promise((resolve , reject)=>{
            this.callRemovePersonRoom(roomId,customerId).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    getEmptyRoom = ()=>{
        return new Promise((resolve , reject)=>{
            this.callEmptyRoom().then(resp =>{
                  console.log(`service data: `,resp );
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    getNotEmptyRoom = ()=>{
        return new Promise((resolve , reject)=>{
            this.callNoteEmptyRoom().then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    
}
export default DichVuService;