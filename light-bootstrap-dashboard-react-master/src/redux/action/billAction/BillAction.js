import {NAME_ACTIONS} from './ActionName'
export function getBillInMonthOfUser(data){
    return {
        type: NAME_ACTIONS.BILL_SCREEN.BILL_SCREEN,
        typeAction: NAME_ACTIONS.BILL_SCREEN.GET_BILL,
        data: data
      };
}
export function editBill(id){
  return {
    
    type: NAME_ACTIONS.BILL_SCREEN.BILL_SCREEN,
    typeAction: NAME_ACTIONS.BILL_SCREEN.EDIT_BILL,
    data: id
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
  return {
    type: NAME_ACTIONS.BILL_SCREEN.BILL_SCREEN,
    typeAction: NAME_ACTIONS.BILL_SCREEN.DELETE_BILL,
    data: id
  };
}
export function recalculateBill(id) {
  console.log("action")
  return {
    type: NAME_ACTIONS.BILL_SCREEN.BILL_SCREEN,
    typeAction: NAME_ACTIONS.BILL_SCREEN.RECALCULATE_BILL,
    data: id
  };
}