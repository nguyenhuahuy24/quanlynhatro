import DichVuService from '../service/dichvuService';
import { dataStatus, userProfile } from '../utility/config';

class DichVuBusiness {
    getServiceOfUser = async (success, failed) => {
        try {
            const dichVuService = new DichVuService()
            const result = await dichVuService.getServiceOfUser();
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
    createDichVu = async (data, success, failed) => {
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
    editDichVu = async (data, success, failed) => {
        try {
            const dichVuService = new DichVuService()
            const { idDichVu, editdata } = data
            const id = [
                idDichVu
            ]
            const result = await dichVuService.editDichVu(idDichVu, editdata)
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
    deleteDichVu = async (data, success, failed) => {
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
