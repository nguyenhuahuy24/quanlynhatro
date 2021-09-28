import UtilityBillService from '../service/UtilityBillsService';
import { dataStatus,userProfile } from '../utility/config';
class UtilityBillBusiness {
    getAllUtilityBillByHouseId = async (data, success, failed) => {
        try {
            const utilityBillService = new UtilityBillService()
            const {houseId, Month} = data
            const result = await utilityBillService.getAllUtilityBillByHouseId(houseId, Month);
            
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
            console.log("business")
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
            console.log(`data business: `,data);
            const {idUtilityBill, editdata} = data
            const id=[
                idUtilityBill
            ]
            const result = await utilityBill.editUtilityBill(id,editdata)
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
    deleteUtilityBill = async (data, success, failed)=>{
        try {
            const utilityBill = new UtilityBillService()
            console.log(`data business: `,data);
            const id = data
            // const id=[
            //     idHouse
            // ]
            const result = await utilityBill.deleteUtilityBill(id)
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
}
export default UtilityBillBusiness
