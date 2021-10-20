import {NAME_ACTIONS} from './ActionName'
export function getContractOfUser(){
  console.log("Action hop dong:")
    return {
        type: NAME_ACTIONS.CONTRACT_SCREEN.CONTRACT_SCREEN,
        typeAction: NAME_ACTIONS.CONTRACT_SCREEN.GET_CONTRACT,
        data: {}
      };
}
export function editContract(id, editdata){
  console.log("Action")
  return {
    type: NAME_ACTIONS.CONTRACT_SCREEN.CONTRACT_SCREEN,
    typeAction: NAME_ACTIONS.CONTRACT_SCREEN.EDIT_CONTRACT,
    data: {
      idContract: id,
      editdata: editdata
    }
  }
}
export function createContract(createData) {
  
  return {
    type: NAME_ACTIONS.CONTRACT_SCREEN.CONTRACT_SCREEN,
    typeAction: NAME_ACTIONS.CONTRACT_SCREEN.CREATE_CONTRACT,
    data: createData
  };
}
export function deleteContract(id) {
  console.log("Action")
  return {
    type: NAME_ACTIONS.CONTRACT_SCREEN.CONTRACT_SCREEN,
    typeAction: NAME_ACTIONS.CONTRACT_SCREEN.DELETE_CONTRACT,
    data: id
  };
}