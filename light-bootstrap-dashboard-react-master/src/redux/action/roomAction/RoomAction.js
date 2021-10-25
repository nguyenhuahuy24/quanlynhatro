import {NAME_ACTIONS} from './ActionName'
export function getRoomByHouseId(id){
    return {
        type: NAME_ACTIONS.ROOM_SCREEN.ROOM_SCREEN,
        typeAction: NAME_ACTIONS.ROOM_SCREEN.GET_ROOM,
        data: id
      };
}
export function getPersonInRoom(id){
    
    return {
        type: NAME_ACTIONS.ROOM_SCREEN.ROOM_SCREEN,
        typeAction: NAME_ACTIONS.ROOM_SCREEN.GET_PERSON_IN_ROOM,
        data: id
      };
}
export function getServiceInRoom(id){   
    return {
        type: NAME_ACTIONS.ROOM_SCREEN.ROOM_SCREEN,
        typeAction: NAME_ACTIONS.ROOM_SCREEN.GET_SERVICE_IN_ROOM,
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
  return {
    type: NAME_ACTIONS.ROOM_SCREEN.ROOM_SCREEN,
    typeAction: NAME_ACTIONS.ROOM_SCREEN.DELETE_ROOM,
    data: id
  };
}
//
export function addPersonToRoom(roomId,customerId) {
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
  return {
    type: NAME_ACTIONS.ROOM_SCREEN.ROOM_SCREEN,
    typeAction: NAME_ACTIONS.ROOM_SCREEN.REMOVE_PERSON_TO_ROOM,
    data: {
      roomId: roomId,
      customerId: customerId
    }
  };
}
export function addServiceToRoom(roomId,serviceId) {
  return {
    type: NAME_ACTIONS.ROOM_SCREEN.ROOM_SCREEN,
    typeAction: NAME_ACTIONS.ROOM_SCREEN.ADD_SERVICE_TO_ROOM,
    data: {
      roomId:roomId,
      serviceId: serviceId
    }
  };
}
export function removeServiceToRoom(roomId,serviceId) {
  return {
    type: NAME_ACTIONS.ROOM_SCREEN.ROOM_SCREEN,
    typeAction: NAME_ACTIONS.ROOM_SCREEN.REMOVE_SERVICE_TO_ROOM,
    data: {
      roomId: roomId,
      serviceId: serviceId
    }
  };
}
export function getEmptyRoom() {
  return {
    type: NAME_ACTIONS.ROOM_SCREEN.ROOM_SCREEN,
    typeAction: NAME_ACTIONS.ROOM_SCREEN.GET_EMPTY_ROOM,
    data: {}
  };
}
export function getNotEmptyRoom() {
  return {
    type: NAME_ACTIONS.ROOM_SCREEN.ROOM_SCREEN,
    typeAction: NAME_ACTIONS.ROOM_SCREEN.GET_NOT_EMPTY_ROOM,
    data: {}
  };
}