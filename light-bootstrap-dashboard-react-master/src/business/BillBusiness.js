import BillService from '../service/BillsService';
import { dataStatus,userProfile ,URL} from '../utility/config';
import axios from 'axios';

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
        const response = await axios.patch(`${URL}/bill/${data}/status`)
        console.log("res: ",response)
        const resData = { ...response.data }
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
