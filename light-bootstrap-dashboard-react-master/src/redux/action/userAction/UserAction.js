import {NAME_ACTIONS} from './ActionName'
export function getUser(){
    return {
        type: NAME_ACTIONS.USER_SCREEN.USER_SCREEN,
        typeAction: NAME_ACTIONS.USER_SCREEN.GET_USER,
        data: {}
      };
}
export function editUser(editdata){
  return {
    type: NAME_ACTIONS.USER_SCREEN.USER_SCREEN,
    typeAction: NAME_ACTIONS.USER_SCREEN.EDIT_USER,
    data: editdata
  }
}
export function changePassWord(editdata) {
 
  return {
    type: NAME_ACTIONS.USER_SCREEN.USER_SCREEN,
    typeAction: NAME_ACTIONS.USER_SCREEN.CHANGE_PASSWORD,
    data: editdata
  };
}
