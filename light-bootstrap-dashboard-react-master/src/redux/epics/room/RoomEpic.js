import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';

import { NAME_ACTIONS } from '../../action/roomAction/ActionName';
import { NAME_EPICS } from './NameEpic';

import RoomBusiness from '../../../business/RoomBusiness'


let messageError = {};

const resolver = (action) => {
    const roomBusiness = new RoomBusiness();
    return new Promise((resolve, reject) => {
        switch (action.typeAction) {
            case NAME_ACTIONS.ROOM_SCREEN.GET_ROOM:  
                roomBusiness.getRoomByHouseId(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.ROOM_SCREEN.GET_ROOM,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.ROOM_SCREEN.GET_ROOM_FAILED));
                })
                break;
            case NAME_ACTIONS.ROOM_SCREEN.CREATE_ROOM:
                roomBusiness.createRoom(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.ROOM_SCREEN.CREATE_ROOM,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.ROOM_SCREEN.CREATE_ROOM_FAILED));
                })
                break;
            case NAME_ACTIONS.ROOM_SCREEN.EDIT_ROOM:
                roomBusiness.editRoom(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.ROOM_SCREEN.EDIT_ROOM,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.ROOM_SCREEN.EDIT_ROOM_FAILED));
                })
                break;
            case NAME_ACTIONS.ROOM_SCREEN.DELETE_ROOM:
                roomBusiness.deleteRoom(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.ROOM_SCREEN.DELETE_ROOM,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.ROOM_SCREEN.DELETE_ROOM_FAILED));
                })
                break;
            case NAME_ACTIONS.ROOM_SCREEN.ADD_PERSON_TO_ROOM:
                roomBusiness.addPersonToRoom(action.data, success => {
                    
                    resolve({
                        actionType: NAME_ACTIONS.ROOM_SCREEN.ADD_PERSON_TO_ROOM,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.ROOM_SCREEN.ADD_PERSON_TO_ROOM_FAILED));
                })
                break;
            case NAME_ACTIONS.ROOM_SCREEN.REMOVE_PERSON_TO_ROOM:
                roomBusiness.removePersonToRoom(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.ROOM_SCREEN.REMOVE_PERSON_TO_ROOM,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.ROOM_SCREEN.REMOVE_PERSON_TO_ROOM_FAILED));
                })
                break;
            case NAME_ACTIONS.ROOM_SCREEN.GET_EMPTY_ROOM:
                roomBusiness.getEmptyRoom( success => {
                    console.log(`epic`)
                    resolve({
                        actionType: NAME_ACTIONS.ROOM_SCREEN.GET_EMPTY_ROOM,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.ROOM_SCREEN.GET_EMPTY_ROOM_FAILED));
                })
                break;
            case NAME_ACTIONS.ROOM_SCREEN.GET_NOT_EMPTY_ROOM:
                roomBusiness.getNotEmptyRoom( success => {
                    resolve({
                        actionType: NAME_ACTIONS.ROOM_SCREEN.GET_NOT_EMPTY_ROOM,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.ROOM_SCREEN.GET_NOT_EMPTY_ROOM_FAILED));
                })
                break;
            default:
                console.error('Error when resolver Room Epic.');
                break;
        }
    });
};
const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.ROOM_SCREEN.GET_ROOM:
            return {
                type: NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_GET_ROOM,
                data: data.data
            };
        case NAME_ACTIONS.ROOM_SCREEN.EDIT_ROOM:
            return {
                type: NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_EDIT_ROOM,
                data: data.data
            };
        case NAME_ACTIONS.ROOM_SCREEN.CREATE_ROOM:
            return {
                type: NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_CREATE_ROOM,
                data: data.data
            };
        case NAME_ACTIONS.ROOM_SCREEN.DELETE_ROOM:
            return {
                type: NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_DELETE_ROOM,
                data: data.data
            };
        case NAME_ACTIONS.ROOM_SCREEN.ADD_PERSON_TO_ROOM:
            return {
                type: NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_ADD_PERSON_TO_ROOM,
                data: data.data
            };
        case NAME_ACTIONS.ROOM_SCREEN.REMOVE_PERSON_TO_ROOM:
            return {
                type: NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_REMOVE_PERSON_TO_ROOM,
                data: data.data
            };
        case NAME_ACTIONS.ROOM_SCREEN.GET_EMPTY_ROOM:
            return {
                type: NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_GET_EMPTY_ROOM,
                data: data.data
            };
        case NAME_ACTIONS.ROOM_SCREEN.GET_NOT_EMPTY_ROOM:
            return {
                type: NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_GET_NOT_EMPTY_ROOM,
                data: data.data
            };
        default:
            console.error('Error when dispatch Room Epic.');
            return new Error('Error when dispatch Room Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.ROOM_SCREEN.GET_ROOM_FAILED:
            return {
                type: NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_GET_ROOM_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.ROOM_SCREEN.CREATE_ROOM_FAILED:
            return {
                type: NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_CREATE_ROOM_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.ROOM_SCREEN.EDIT_ROOM_FAILED:
            return {
                type: NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_EDIT_ROOM_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.ROOM_SCREEN.DELETE_ROOM_FAILED:
            return {
                type: NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_DELETE_ROOM_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.ROOM_SCREEN.ADD_PERSON_TO_ROOM_FAILED:
            return {
                type: NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_ADD_PERSON_TO_ROOM_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.ROOM_SCREEN.REMOVE_PERSON_TO_ROOM_FAILED:
            return {
                type: NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_REMOVE_PERSON_TO_ROOM_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.ROOM_SCREEN.GET_EMPTY_ROOM_FAILED:
            return {
                type: NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_GET_EMPTY_ROOM_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.ROOM_SCREEN.GET_NOT_EMPTY_ROOM_FAILED:
            return {
                type: NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_GET_NOT_EMPTY_ROOM_FAILED,
                data: messageError
            }
        default:
            console.error('Error when dispatch error Room Epic.');
            return new Error('Error when dispatch error Room Epic.'); F
    }
};

const RoomEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.ROOM_SCREEN.ROOM_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default RoomEpic;