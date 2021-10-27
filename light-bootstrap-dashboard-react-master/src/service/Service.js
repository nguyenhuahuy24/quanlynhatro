import axios from 'axios';
import { dataStatus, userProfile } from '../utility/config';
class Service {

    callGetAPI = async (url) => {
        try {
            const response = await axios.get(url,{headers:{Authorization:'Bearer ' + localStorage.getItem("auth-token")}});
             console.log(`service`)

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
    callGetLocalAPI = async (url) => {
        try {
            const response = await axios.get(url,{headers:{Authorization:'Bearer ' + localStorage.getItem("auth-token")}})  
            
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
    callPostLocalAPI = async (url,data) => {
        try {
            const response = await axios.post(url,data,{headers:{
            Authorization:'Bearer ' + localStorage.getItem("auth-token")
        }}).then((res) => res.data);
            console.log(`service create:`,response) 
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
    callPostAPI = async (url,data) => {
        try {
            const response = await axios.post(url, data).then((res) => res.data);    
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
    callPatchAPI = async (url,id,data) => {
        try {
           
            const response = await axios.patch(url + id, data).then((res) => res.data);
             console.log("update", response)
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
    callPatchLocalAPI = async (url,id,data) => {
        try {
            const response = await axios.patch(url+id,data,{headers:{Authorization:'Bearer ' + localStorage.getItem("auth-token")}});
             console.log("update", response)
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
    callDeleteAPI = async (url,id) => {
        try {
            console.log("service url",url)
            console.log("service",id)
            const response = await axios.delete(url + id).then((res) => res.data);
            console.log("service delete", response)
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
}

export default Service;