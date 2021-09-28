import {NAME_ACTIONS} from './ActionName'
export function getBillInMonthOfUser(houseId,userId){
     console.log("Action Bill")
    return {
        type: NAME_ACTIONS.BILL_SCREEN.BILL_SCREEN,
        typeAction: NAME_ACTIONS.BILL_SCREEN.GET_BILL,
        data: {
            houseId:houseId,
            userId: userId
            }
      };
}
export function editBill(id, editdata){
  return {
    
    type: NAME_ACTIONS.BILL_SCREEN.BILL_SCREEN,
    typeAction: NAME_ACTIONS.BILL_SCREEN.EDIT_BILL,
    data: {
      idBill:id,
      editdata: editdata
    }
  }
}
export function createBill(createData) {
 
  return {
    type: NAME_ACTIONS.BILL_SCREEN.BILL_SCREEN,
    typeAction: NAME_ACTIONS.BILL_SCREEN.CREATE_BILL,
    data: createData
  };
}
export function deleteBill(id) {
  console.log("Action")
  return {
    type: NAME_ACTIONS.BILL_SCREEN.BILL_SCREEN,
    typeAction: NAME_ACTIONS.BILL_SCREEN.DELETE_BILL,
    data: id
  };
}