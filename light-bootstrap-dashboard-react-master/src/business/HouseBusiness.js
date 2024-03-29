import HouseService from '../service/HouseService';
import { dataStatus,userProfile } from '../utility/config';
class HouseBusiness {
    getHouseByUserId = async ( success, failed) => {
        try {
            const houseService = new HouseService()
            const result = await houseService.getHouseByUserId();
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
     createHouse = async (data, success, failed) =>{
        try {
            const house = new HouseService()
            // const {createData} = data
            const result = await house.createHouse(data) 
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
    editHouse = async (data, success, failed)=>{
        try {
            const house = new HouseService()
            const {idHouse, editdata} = data
            const id=[
                idHouse
            ]
            const result = await house.editHouse(id,editdata)
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
    deleteHouse = async (data, success, failed)=>{
        try {
            const house = new HouseService()
            const id = data
            // const id=[
            //     idHouse
            // ]
            const result = await house.deleteHouse(id)
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
}
export default HouseBusiness
