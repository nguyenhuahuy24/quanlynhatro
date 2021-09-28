import {NAME_ACTIONS} from './ActionName'
export function getServiceOfUser(){
  console.log("Action dich vu:")
    return {
        type: NAME_ACTIONS.DICHVU_SCREEN.DICHVU_SCREEN,
        typeAction: NAME_ACTIONS.DICHVU_SCREEN.GET_DICHVU,
        data: {}
      };
}
export function editDichVu(id, editdata){
  console.log("Action")
  return {
    type: NAME_ACTIONS.DICHVU_SCREEN.DICHVU_SCREEN,
    typeAction: NAME_ACTIONS.DICHVU_SCREEN.EDIT_DICHVU,
    data: {
      idDichVu: id,
      editdata: editdata
    }
  }
}
export function createDichVu(createData) {
  
  return {
    type: NAME_ACTIONS.DICHVU_SCREEN.DICHVU_SCREEN,
    typeAction: NAME_ACTIONS.DICHVU_SCREEN.CREATE_DICHVU,
    data: createData
  };
}
export function deleteDichVu(id) {
  console.log("Action")
  return {
    type: NAME_ACTIONS.DICHVU_SCREEN.DICHVU_SCREEN,
    typeAction: NAME_ACTIONS.DICHVU_SCREEN.DELETE_DICHVU,
    data: id
  };
}