import UserService from '../service/userService';
import { dataStatus,userProfile } from '../utility/config';
class UserBusiness {
    getUser = async ( success, failed) => {
        try {
            const userService = new UserService()
            const result = await userService.getUser();

            if (result.status === dataStatus.SUCCESS) {
                localStorage.setItem("username",result.data.Name)
                success(result)
            }
            else {
                failed(result)
            }
        } catch (error) {
            failed(error)
        }
    };
    changePassWord = async (data, success, failed) =>{
        try {
            const user = new UserService()
            // const {createData} = data
            const result = await user.changePassWord(data) 
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
    editUser = async (data, success, failed)=>{
        try {
            const user = new UserService()
            const result = await user.editUser(data)
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
export default UserBusiness
