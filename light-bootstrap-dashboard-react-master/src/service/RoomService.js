import axios from 'axios';
import Service from './Service';
import { dataStatus, userProfile,URL } from '../utility/config';
class DichVuService extends Service {  
    constructor() {
        super();
        this.url =`${URL}/room/`
        this.url_person= `${URL}/room/person/`
        this.url_service= `${URL}/room/service/`
        this.url_room=`${URL}/room/house/`
    }
    callGetAPI = async (url,id) => {
        try {
            const response = await axios.get(url + id,{headers:{Authorization:'Bearer ' + localStorage.getItem("auth-token")}})
            
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
    callAddServiceRoom = async (roomId,serviceId)=>
    {
        try {
            const response = await axios.patch(this.url+roomId+`/addService/`+serviceId).then((res)=> res.data);
            if (typeof (response) === 'object' && 'error' in response) {
                console.log("vào error")
                return {
                    status: dataStatus.FAILED,
                    message: response.error
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
    callRemoveServiceRoom = async (roomId,serviceId)=>
    {
        try {
            const response = await axios.patch(this.url+roomId+`/removeService/`+serviceId).then((res)=> res.data);
            if (typeof (response) === 'object' && 'error' in response) {
                return {
                    status: dataStatus.FAILED,
                    message: response.error.data.message
                }
            }
            else {
                return {
                    status: dataStatus.SUCCESS,
                    data: response.ListService
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
            
            const response = await axios.patch(this.url+roomId+`/removeCustomer/`+customerId).then((res)=> res.data);
            if (typeof (response) === 'object' && 'error' in response) {
                return {
                    status: dataStatus.FAILED,
                    message: response.error.data.message
                }
            }
            else {
                return {
                    status: dataStatus.SUCCESS,
                    data: response.ListPerson
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
            this.callGetAPI(this.url_room,id).then(resp =>{   
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    getPersonInRoom =(roomId)=>{
        return new Promise((resolve, reject)=>{
            this.callGetAPI(this.url_person,roomId).then(resp =>{   
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    getServiceInRoom =(roomId)=>{
        return new Promise((resolve, reject)=>{
            this.callGetAPI(this.url_service,roomId).then(resp =>{   
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
            this.callPatchLocalAPI(this.url,id, editdata).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    deleteRoom = (id)=>{
        return new Promise((resolve , reject)=>{
            this.callDeleteAPI(this.url,id).then(resp =>{
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
    addServiceToRoom = (roomId,serviceId)=>{
        return new Promise((resolve , reject)=>{
            this.callAddServiceRoom(roomId,serviceId).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    removeServiceToRoom = (roomId,serviceId)=>{
        return new Promise((resolve , reject)=>{
            this.callRemoveServiceRoom(roomId,serviceId).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    getEmptyRoom = ()=>{
        return new Promise((resolve , reject)=>{
            this.callEmptyRoom().then(resp =>{
              
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