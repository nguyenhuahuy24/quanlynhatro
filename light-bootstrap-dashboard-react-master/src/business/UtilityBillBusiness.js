import UtilityBillService from '../service/UtilityBillsService';
import { dataStatus,userProfile } from '../utility/config';
class UtilityBillBusiness {
    getAllUtilityBillByHouseId = async (data, success, failed) => {
        try {
            const utilityBillService = new UtilityBillService()
            const result = await utilityBillService.getAllUtilityBillByHouseId(data);
            
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
     createUtilityBill = async (data, success, failed) =>{
        try {
            const utilityBill = new UtilityBillService()
            // const {createData} = data
            const result = await utilityBill.createUtilityBill(data) 
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
    editUtilityBill = async (data, success, failed)=>{
        try {
            const utilityBill = new UtilityBillService()
            const {idUtilityBill, editdata} = data
            const result = await utilityBill.editUtilityBill(idUtilityBill,editdata)
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
    deleteUtilityBill = async (data, success, failed)=>{
        try {
            const utilityBill = new UtilityBillService()
            const id = data
            // const id=[
            //     idHouse
            // ]
            const result = await utilityBill.deleteUtilityBill(id)
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
export default UtilityBillBusiness
