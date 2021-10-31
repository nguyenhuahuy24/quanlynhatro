import {NAME_ACTIONS} from './ActionName'
export function getHouseByUserId(){
    return {
        type: NAME_ACTIONS.HOUSE_SCREEN.HOUSE_SCREEN,
        typeAction: NAME_ACTIONS.HOUSE_SCREEN.GET_HOUSE,
        data: {}
      };
}
export function editHouse(id, editdata){
  return {
    type: NAME_ACTIONS.HOUSE_SCREEN.HOUSE_SCREEN,
    typeAction: NAME_ACTIONS.HOUSE_SCREEN.EDIT_HOUSE,
    data: {
      idHouse:id,
      editdata: editdata
    }
  }
}
export function createHouse(createData) {
 
  return {
    type: NAME_ACTIONS.HOUSE_SCREEN.HOUSE_SCREEN,
    typeAction: NAME_ACTIONS.HOUSE_SCREEN.CREATE_HOUSE,
    data: createData
  };
}
export function deleteHouse(id) {
  return {
    type: NAME_ACTIONS.HOUSE_SCREEN.HOUSE_SCREEN,
    typeAction: NAME_ACTIONS.HOUSE_SCREEN.DELETE_HOUSE,
    data: id
  };
}