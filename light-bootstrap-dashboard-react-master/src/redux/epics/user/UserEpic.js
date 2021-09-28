import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';
import { NAME_ACTIONS } from '../../action/userAction/ActionName';
import { NAME_EPICS } from './NameEpic';
import UserBusiness from '../../../business/UserBusiness'
let messageError = {};
const resolver = (action) => {
    const userBusiness = new UserBusiness();
    return new Promise((resolve, reject) => {
        switch (action.typeAction) {
            case NAME_ACTIONS.USER_SCREEN.GET_USER:  
                userBusiness.getUser( success => {
                         
                    resolve({
                        actionType: NAME_ACTIONS.USER_SCREEN.GET_USER,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.USER_SCREEN.GET_USER_FAILED));
                })
                break;
            case NAME_ACTIONS.USER_SCREEN.CHANGE_PASSWORD:
                userBusiness.changePassWord(action.data, success => {
                    console.log("epic user change");
                    resolve({
                        actionType: NAME_ACTIONS.USER_SCREEN.CHANGE_PASSWORD,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.USER_SCREEN.CHANGE_PASSWORD_FAILED));
                })
                break;
            case NAME_ACTIONS.USER_SCREEN.EDIT_USER:
                userBusiness.editUser(action.data, success => {
                     console.log("epic user edit");
                    resolve({
                        actionType: NAME_ACTIONS.USER_SCREEN.EDIT_USER,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.USER_SCREEN.EDIT_USER_FAILED));
                })
                break;
            default:
                console.error('Error when resolver User Epic.');
                break;
        }
    });
};
const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.USER_SCREEN.GET_USER:
            return {
                type: NAME_EPICS.EPIC_USER_SCREEN.EPIC_GET_USER,
                data: data.data
            };
        case NAME_ACTIONS.USER_SCREEN.EDIT_USER:
            return {
                type: NAME_EPICS.EPIC_USER_SCREEN.EPIC_EDIT_USER,
                data: data.data
            };
        case NAME_ACTIONS.USER_SCREEN.CHANGE_PASSWORD:
            return {
                type: NAME_EPICS.EPIC_USER_SCREEN.EPIC_CHANGE_PASSWORD,
                data: data.data
            };

        default:
            console.error('Error when dispatch Epic Epic.');
            return new Error('Error when dispatch Epic Epic.');
    }
};
const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.USER_SCREEN.GET_USER_FAILED:
            return {
                type: NAME_EPICS.EPIC_USER_SCREEN.EPIC_GET_USER_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.USER_SCREEN.CHANGE_PASSWORD_FAILED:
            return {
                type: NAME_EPICS.EPIC_USER_SCREEN.EPIC_CHANGE_PASSWORD_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.USER_SCREEN.EDIT_USER_FAILED:
            return {
                type: NAME_EPICS.EPIC_USER_SCREEN.EPIC_EDIT_USER_FAILED,
                data: messageError
            }
        default:
            console.error('Error when dispatch error User Epic.');
            return new Error('Error when dispatch error User Epic.'); F
    }
};
const UserEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.USER_SCREEN.USER_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default UserEpic;