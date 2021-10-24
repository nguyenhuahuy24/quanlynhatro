import BillService from '../service/BillsService';
import { dataStatus,userProfile } from '../utility/config';
class BillBusiness {
    getBillInMonthOfUser = async (data, success, failed) => {
        try {
            const billService = new BillService()
            //const {Month,houseId} = data
            const result = await billService.getBillInMonthOfUser(data);
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
     createBill = async (data, success, failed) =>{
        try {
            const bill = new BillService()
            // const {createData} = data
            console.log("business")
            const result = await bill.createBill(data) 
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
    editBill = async (data, success, failed)=>{
        try {
            const bill = new BillService()
            console.log(`data business: `,data);
            const {idBill, editdata} = data
            const id=[
                idBill
            ]
            const result = await bill.editBill(id,editdata)
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
    deleteBill = async (data, success, failed)=>{
        try {
            const bill = new BillService()
            console.log(`data business: `,data);
            const id = data
            // const id=[
            //     idHouse
            // ]
            const result = await bill.deleteBill(id)
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
export default BillBusiness
