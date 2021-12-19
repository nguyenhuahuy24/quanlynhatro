import RoomService from '../service/RoomService'
import { dataStatus,userProfile } from '../utility/config';
import axios from 'axios';
class RoomBusiness {
    getRoomByHouseId = async (data, success, failed) => {
        try {
            const roomService = new RoomService()
            const id = data
            const result = await roomService.getRoomByHouseId(id);
            if (result.status === dataStatus.SUCCESS) {
                success(result)
            }
            else {
                failed(result)
            }
        } catch (error) {
            failed(error)
        }
    };
    getPersonInRoom = async (data, success, failed) => {
        try {
            const roomService = new RoomService()
            const id = data
            const result = await roomService.getPersonInRoom(id);
            if (result.status === dataStatus.SUCCESS) {
                success(result)
            }
            else {
                failed(result)
            }
        } catch (error) {
            failed(error)
        }
    };
    getServiceInRoom = async (data, success, failed) => {
        try {
            const roomService = new RoomService()
            const id = data
            const result = await roomService.getServiceInRoom(id);
            if (result.status === dataStatus.SUCCESS) {
                success(result)
            }
            else {
                failed(result)
            }
        } catch (error) {
            failed(error)
        }
    };
    createRoom = async (data, success, failed) =>{
        try {
            const room = new RoomService()
            // const {createData} = data
    //          const room = await axios.post(
    //             `http://localhost:8080/room/`,
    //             data,
    //             {headers:{Authorization:'Bearer ' + localStorage.getItem("auth-token")}},
    //             {headers: {"Content-Type": "multipart/form-data"}
    //   },
    //         )
            const result = await room.createRoom(data) 
            if (result.status === dataStatus.SUCCESS) {
                success(result);
            }
            else {
                failed(result);
            }
        } catch (error) {
            failed(error)
        }
    }
    editRoom = async (data, success, failed)=>{
        try {
            const room = new RoomService()
           
            const {idRoom, editdata} = data
            const id=[
                idRoom
            ]
            const result = await room.editRoom(id,editdata)
         
            if (result.status === dataStatus.SUCCESS) {
                success(result);
            }
            else {
                failed(result);
            }
        } catch (error) {
            failed(error)
        }
    }
    deleteRoom = async (data, success, failed)=>{
        try {
            const room = new RoomService()
           
            const id = data
            // const id=[
            //     idHouse
            // ]
            const result = await room.deleteRoom(id)
     
            if (result.status === dataStatus.SUCCESS) {
                success(result);
            }
            else {
                failed(result);
            }
        } catch (error) {
            failed(error)
        }
    }
    addPersonToRoom = async (data, success, failed)=>{
        try {
            const room = new RoomService()
          
            const {roomId, customerId} = data
            const result = await room.addPersonToRoom(roomId, customerId)
           
            if (result.status === dataStatus.SUCCESS) {
                success(result);
            }
            else {
                failed(result);
            }
        } catch (error) {
            failed(error)
        }
    }
    removePersonToRoom = async (data, success, failed)=>{
        try {
            const room = new RoomService()
         
            const {roomId, customerId} = data
            const result = await room.removePersonToRoom(roomId, customerId)
            if (result.status === dataStatus.SUCCESS) {
                success(result);
            }
            else {
                failed(result);
            }
        } catch (error) {
            failed(error)
        }
    }
    addServiceToRoom = async (data, success, failed)=>{
        try {
            const room = new RoomService()
          
            const {roomId, serviceId} = data
            const result = await room.addServiceToRoom(roomId, serviceId)
           
            if (result.status === dataStatus.SUCCESS) {
                success(result);
            }
            else {
                failed(result);
            }
        } catch (error) {
            failed(error)
        }
    }
    removeServiceToRoom = async (data, success, failed)=>{
        try {
            const room = new RoomService()
            const {roomId, serviceId} = data
            const result = await room.removeServiceToRoom(roomId, serviceId)
            if (result.status === dataStatus.SUCCESS) {
                success(result);
            }
            else {
                failed(result);
            }
        } catch (error) {
            failed(error)
        }
    }
    
    postRoom = async (data,success, failed) => {
        console.log("business data: ", data)
        const response = await axios.patch(`http://localhost:8080/room/${data}/post`)
        const resData = { ...response.data }
        console.log("business post: ", resData)
        if (!("error" in response.data)) {
            success({
                status: dataStatus.SUCCESS,
                message: 'Get data success',
                data: resData
            })
        }
        else (
            failed({
                status: dataStatus.FAILED,
                message: response.data["error"],
                data: resData
            })
        )
    }
    unpostRoom = async (data,success, failed) => {
        const response = await axios.patch(`http://localhost:8080/room/${data}/unpost`)
        const resData = { ...response.data }
        console.log("business uppost: ", resData)

        if (!("error" in response.data)) {
            success({
                status: dataStatus.SUCCESS,
                message: 'Get data success',
                data: resData
            })
        }
        else (
            failed({
                status: dataStatus.FAILED,
                message: response.data["error"],
                data: resData
            })
        )
    }



















    getEmptyRoom = async ( success, failed) => {
        try {
            const roomService = new RoomService()
            const result = await roomService.getEmptyRoom();
            
            if (result.status === dataStatus.SUCCESS) {
                success(result)
            }
            else {
                failed(result)
            }
        } catch (error) {
            failed(error)
        }
    };
    getNotEmptyRoom = async ( success, failed) => {
        try {
            const roomService = new RoomService()
            const result = await roomService.getNotEmptyRoom();
            
            if (result.status === dataStatus.SUCCESS) {
                success(result)
            }
            else {
                failed(result)
            }
        } catch (error) {
            failed(error)
        }
    };
}
export default RoomBusiness
