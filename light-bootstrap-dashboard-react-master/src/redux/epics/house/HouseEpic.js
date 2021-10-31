import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';

import { NAME_ACTIONS } from '../../action/houseAction/ActionName';
import { NAME_EPICS } from './NameEpic';

import HouseBusiness from '../../../business/HouseBusiness'


let messageError = {};

const resolver = (action) => {
    const houseBusiness = new HouseBusiness();
    return new Promise((resolve, reject) => {
        switch (action.typeAction) {
            case NAME_ACTIONS.HOUSE_SCREEN.GET_HOUSE:  
                houseBusiness.getHouseByUserId( success => {
                    
                    resolve({
                        actionType: NAME_ACTIONS.HOUSE_SCREEN.GET_HOUSE,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.HOUSE_SCREEN.GET_HOUSE_FAILED));
                })
                break;
            case NAME_ACTIONS.HOUSE_SCREEN.CREATE_HOUSE:
                houseBusiness.createHouse(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.HOUSE_SCREEN.CREATE_HOUSE,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.HOUSE_SCREEN.CREATE_HOUSE_FAILED));
                })
                break;
            case NAME_ACTIONS.HOUSE_SCREEN.EDIT_HOUSE:
                houseBusiness.editHouse(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.HOUSE_SCREEN.EDIT_HOUSE,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.HOUSE_SCREEN.EDIT_HOUSE_FAILED));
                })
                break;
            case NAME_ACTIONS.HOUSE_SCREEN.DELETE_HOUSE:
                houseBusiness.deleteHouse(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.HOUSE_SCREEN.DELETE_HOUSE,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.HOUSE_SCREEN.DELETE_HOUSE_FAILED));
                })
                break;
            default:
                console.error('Error when resolver House Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.HOUSE_SCREEN.GET_HOUSE:
            return {
                type: NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_GET_HOUSE,
                data: data.data
            };
        case NAME_ACTIONS.HOUSE_SCREEN.EDIT_HOUSE:
            return {
                type: NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_EDIT_HOUSE,
                data: data.data
            };
        case NAME_ACTIONS.HOUSE_SCREEN.CREATE_HOUSE:
            return {
                type: NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_CREATE_HOUSE,
                data: data.data
            };
        case NAME_ACTIONS.HOUSE_SCREEN.DELETE_HOUSE:
            return {
                type: NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_DELETE_HOUSE,
                data: data.data
            };
        default:
            console.error('Error when dispatch House Epic.');
            return new Error('Error when dispatch House Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.HOUSE_SCREEN.GET_HOUSE_FAILED:
            return {
                type: NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_GET_HOUSE_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.HOUSE_SCREEN.CREATE_HOUSE_FAILED:
            return {
                type: NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_CREATE_HOUSE_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.HOUSE_SCREEN.EDIT_HOUSE_FAILED:
            return {
                type: NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_EDIT_HOUSE_FAILED,
                data: messageError
            }
        default:
            console.error('Error when dispatch error House Epic.');
            return new Error('Error when dispatch error House Epic.'); F
    }
};

const RoomEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.HOUSE_SCREEN.HOUSE_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default RoomEpic;