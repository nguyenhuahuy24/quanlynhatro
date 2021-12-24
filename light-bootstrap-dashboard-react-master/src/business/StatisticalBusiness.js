import { dataStatus,userProfile } from '../utility/config';
import axios from 'axios';
class StatisticalBusiness {
    
    getByYear = async (data,success, failed) => {
        const response = await axios.get(`http://localhost:8080/statistical/`+data,{headers:{Authorization:'Bearer ' + localStorage.getItem("auth-token")}})
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
   








}
export default StatisticalBusiness
