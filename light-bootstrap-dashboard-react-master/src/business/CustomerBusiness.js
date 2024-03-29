import CustomerService from '../service/CustomerService';
import { dataStatus,userProfile } from '../utility/config';
class CustomerBusiness {
    getAllCustomerOfUser = async ( success, failed) => {
        try {
            const customerService = new CustomerService()
            const result = await customerService.getAllCustomerOfUser();
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
    createCustomer = async (data, success, failed) =>{
        try {
            const customer = new CustomerService()
            // const {createData} = data
            const result = await customer.createCustomer(data)
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
    editCustomer = async (data, success, failed)=>{
        try {
            const customer = new CustomerService()
            const {idCustomer, editdata} = data
            const id=[
                idCustomer
            ]
            const result = await customer.editCustomer(id,editdata)
            
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
    deleteCustomer = async (data, success, failed)=>{
        try {
            const customer = new CustomerService()
            const id = data
            // const id=[
            //     idHouse
            // ]
            const result = await customer.deleteCustomer(id)
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
export default CustomerBusiness
