import {NAME_ACTIONS} from './ActionName'

export function getAllUtilityBillByHouseId(houseId,Month){
     
    return {
        type: NAME_ACTIONS.UTILITYBILL_SCREEN.UTILITYBILL_SCREEN,
        typeAction: NAME_ACTIONS.UTILITYBILL_SCREEN.GET_UTILITYBILL,
        data: {
            houseId:houseId,
            Month: Month
            }
      };
}
export function editUtilityBill(id, editdata){
  return {
    type: NAME_ACTIONS.UTILITYBILL_SCREEN.UTILITYBILL_SCREEN,
    typeAction: NAME_ACTIONS.UTILITYBILL_SCREEN.EDIT_UTILITYBILL,
    data: {
      idHouse:id,
      editdata: editdata
    }
  }
}
export function createUtilityBill(createData) {
 console.log("Action Create UtilityBill")
  return {
    type: NAME_ACTIONS.UTILITYBILL_SCREEN.UTILITYBILL_SCREEN,
    typeAction: NAME_ACTIONS.UTILITYBILL_SCREEN.CREATE_UTILITYBILL,
    data: createData
  };
}
export function deleteUtilityBill(id) {
  console.log("Action")
  return {
    type: NAME_ACTIONS.UTILITYBILL_SCREEN.UTILITYBILL_SCREEN,
    typeAction: NAME_ACTIONS.UTILITYBILL_SCREEN.DELETE_UTILITYBILL,
    data: id
  };
}