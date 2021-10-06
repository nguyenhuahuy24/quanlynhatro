import {NAME_ACTIONS} from './ActionName'
export function getAllCustomerOfUser(){
  
    return {
        type: NAME_ACTIONS.CUSTOMER_SCREEN.CUSTOMER_SCREEN,
        typeAction: NAME_ACTIONS.CUSTOMER_SCREEN.GET_CUSTOMER,
        data: {}
      };
}
export function editCustomer(id, editdata){
  
  return {
    type: NAME_ACTIONS.CUSTOMER_SCREEN.CUSTOMER_SCREEN,
    typeAction: NAME_ACTIONS.CUSTOMER_SCREEN.EDIT_CUSTOMER,
    data: {
      idCustomer:id,
      editdata: editdata
    }
  }
}
export function createCustomer(createData) {
  console.log("Action create")
  return {
    type: NAME_ACTIONS.CUSTOMER_SCREEN.CUSTOMER_SCREEN,
    typeAction: NAME_ACTIONS.CUSTOMER_SCREEN.CREATE_CUSTOMER,
    data: createData
  };
}
export function deleteCustomer(id) {
  
  return {
    type: NAME_ACTIONS.CUSTOMER_SCREEN.CUSTOMER_SCREEN,
    typeAction: NAME_ACTIONS.CUSTOMER_SCREEN.DELETE_CUSTOMER,
    data: id
  };
}