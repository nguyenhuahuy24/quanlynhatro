import ContractService from '../service/ContractService';
import { dataStatus, userProfile } from '../utility/config';

class ContractBusiness {
    getContractOfUser = async (success, failed) => {
        try {
            const contractService = new ContractService()
            const result = await contractService.getContractOfUser();
            console.log("business")
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
    createContract = async (data, success, failed) => {
        try {
            const contractService = new ContractService()
            // const {createData} = data
            const result = await contractService.createContract(data)
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
    editContract = async (data, success, failed) => {
        try {
            const contractService = new ContractService()
            console.log(`data business: `, data);
            const { idContract, editdata } = data
            const id = [
                idContract
            ]
            const result = await contractService.editContract(id, editdata)
            console.log(`business: `, result);
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
    deleteContract = async (data, success, failed) => {
        try {
            const contractService = new ContractService()

            const id = data
            // const id=[
            //     idHouse
            // ]
            const result = await contractService.deleteContract(id)

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
export default ContractBusiness
