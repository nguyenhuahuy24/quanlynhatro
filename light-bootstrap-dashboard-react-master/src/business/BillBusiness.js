import BillService from '../service/BillsService';
import { dataStatus,userProfile } from '../utility/config';
class BillBusiness {
    getBillInMonthOfUser = async (data, success, failed) => {
        try {
            const billService = new BillService()
            //const {Month,houseId} = data
                        console.log("business get")

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
    };
    recalculateBill = async (data, success, failed)=>{
        try {
            const bill = new BillService()
            const id = data
            console.log("business")
            const result = await bill.recalculateBill(id)
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
            const {idBill, editdata} = data
            const id=[
                idBill
            ]
            const result = await bill.editBill(id,editdata)
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
            const id = data
            // const id=[
            //     idHouse
            // ]
            const result = await bill.deleteBill(id)
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
