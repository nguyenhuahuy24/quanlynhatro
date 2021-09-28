import {NAME_ACTIONS} from './ActionName'
export function getRoomByHouseId(id){
  
    return {
        type: NAME_ACTIONS.ROOM_SCREEN.ROOM_SCREEN,
        typeAction: NAME_ACTIONS.ROOM_SCREEN.GET_ROOM,
        data: id
      };
}
export function editRoom(id, editdata){
  return {
    type: NAME_ACTIONS.ROOM_SCREEN.ROOM_SCREEN,
    typeAction: NAME_ACTIONS.ROOM_SCREEN.EDIT_ROOM,
    data: {
      idRoom:id,
      editdata: editdata
    }
  }
}
export function createRoom(createData) {
  
  return {
    type: NAME_ACTIONS.ROOM_SCREEN.ROOM_SCREEN,
    typeAction: NAME_ACTIONS.ROOM_SCREEN.CREATE_ROOM,
    data: createData
  };
}
export function deleteRoom(id) {
  console.log("Action")
  return {
    type: NAME_ACTIONS.ROOM_SCREEN.ROOM_SCREEN,
    typeAction: NAME_ACTIONS.ROOM_SCREEN.DELETE_ROOM,
    data: id
  };
}
//
export function addPersonToRoom(roomId,customerId) {
  console.log("Action")
  return {
    type: NAME_ACTIONS.ROOM_SCREEN.ROOM_SCREEN,
    typeAction: NAME_ACTIONS.ROOM_SCREEN.ADD_PERSON_TO_ROOM,
    data: {
      roomId:roomId,
      customerId: customerId
    }
  };
}
export function removePersonToRoom(roomId,customerId) {
  console.log("Action")
  return {
    type: NAME_ACTIONS.ROOM_SCREEN.ROOM_SCREEN,
    typeAction: NAME_ACTIONS.ROOM_SCREEN.REMOVE_PERSON_TO_ROOM,
    data: {
      roomId: roomId,
      customerId: customerId
    }
  };
}
export function getEmptyRoom() {
  console.log("Action")
  return {
    type: NAME_ACTIONS.ROOM_SCREEN.ROOM_SCREEN,
    typeAction: NAME_ACTIONS.ROOM_SCREEN.GET_EMPTY_ROOM,
    data: {}
  };
}
export function getNotEmptyRoom() {
  console.log("Action")
  return {
    type: NAME_ACTIONS.ROOM_SCREEN.ROOM_SCREEN,
    typeAction: NAME_ACTIONS.ROOM_SCREEN.GET_NOT_EMPTY_ROOM,
    data: {}
  };
}