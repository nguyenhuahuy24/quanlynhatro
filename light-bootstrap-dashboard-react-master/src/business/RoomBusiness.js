import RoomService from '../service/RoomService'
import { dataStatus,userProfile } from '../utility/config';

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
            console.log(`business Person: `,roomService)
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
    createRoom = async (data, success, failed) =>{
        try {
            const room = new RoomService()
            // const {createData} = data
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
            console.log(`data business: `,data);
            const {idRoom, editdata} = data
            const id=[
                idRoom
            ]
            const result = await room.editRoom(id,editdata)
            console.log(`business: `,result);
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
            console.log(`data business: `,data);
            const id = data
            // const id=[
            //     idHouse
            // ]
            const result = await room.deleteRoom(id)
            console.log(`business: `,result);
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
            console.log(`data business: `,data);
            const {roomId, customerId} = data
            const result = await room.removePersonToRoom(roomId, customerId)
            console.log(`business: `,result);
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
