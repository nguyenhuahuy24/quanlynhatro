import DichVuService from '../service/DichVuService';
import { dataStatus,userProfile } from '../utility/config';

class DichVuBusiness {
    getServiceOfUser = async ( success, failed) => {
        try {
            const dichVuService = new DichVuService()
            const result = await dichVuService.getServiceOfUser();
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
     createDichVu = async (data, success, failed) =>{
        try {
            const dichVuService = new DichVuService()
            // const {createData} = data
            const result = await dichVuService.createDichVu(data) 
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
    editDichVu = async (data, success, failed)=>{
        try {
            const dichVuService = new DichVuService()
            console.log(`data business: `,data);
            const {idDichVu, editdata} = data
            const id=[
                idDichVu
            ]
            const result = await dichVuService.editDichVu(id,editdata)
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
    deleteDichVu = async (data, success, failed)=>{
        try {
            const dichVuService = new DichVuService()
            
            const id = data
            // const id=[
            //     idHouse
            // ]
            const result = await dichVuService.deleteDichVu(id)
           
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
export default DichVuBusiness
