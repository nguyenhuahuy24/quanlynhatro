import {NAME_ACTIONS} from './ActionName'

//test
export function getAllUtilityBillByHouseId(data){ 
    return {
        type: NAME_ACTIONS.UTILITYBILL_SCREEN.UTILITYBILL_SCREEN,
        typeAction: NAME_ACTIONS.UTILITYBILL_SCREEN.GET_UTILITYBILL,
        data: data
      };
}
export function editUtilityBill(id, editdata){
  return {
    type: NAME_ACTIONS.UTILITYBILL_SCREEN.UTILITYBILL_SCREEN,
    typeAction: NAME_ACTIONS.UTILITYBILL_SCREEN.EDIT_UTILITYBILL,
    data: {
      idUtilityBill:id,
      editdata: editdata
    }
  }
}
export function createUtilityBill(createData) {
  return {
    type: NAME_ACTIONS.UTILITYBILL_SCREEN.UTILITYBILL_SCREEN,
    typeAction: NAME_ACTIONS.UTILITYBILL_SCREEN.CREATE_UTILITYBILL,
    data: createData
  };
}
export function deleteUtilityBill(id) {
  return {
    type: NAME_ACTIONS.UTILITYBILL_SCREEN.UTILITYBILL_SCREEN,
    typeAction: NAME_ACTIONS.UTILITYBILL_SCREEN.DELETE_UTILITYBILL,
    data: id
  };
}