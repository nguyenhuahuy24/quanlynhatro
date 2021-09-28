import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';

import { NAME_ACTIONS } from '../../action/utilityBillAction/ActionName';
import { NAME_EPICS } from './NameEpic';

import UtilityBillBusiness from '../../../business/UtilityBillBusiness'


let messageError = {};

const resolver = (action) => {
    const utilityBillBusiness = new UtilityBillBusiness();
    return new Promise((resolve, reject) => {
        switch (action.typeAction) {
            case NAME_ACTIONS.UTILITYBILL_SCREEN.GET_UTILITYBILL:  
                utilityBillBusiness.getAllUtilityBillByHouseId(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.UTILITYBILL_SCREEN.GET_UTILITYBILL,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.UTILITYBILL_SCREEN.GET_UTILITYBILL_FAILED));
                })
                break;
            case NAME_ACTIONS.UTILITYBILL_SCREEN.CREATE_UTILITYBILL:
                utilityBillBusiness.createUtilityBill(action.data, success => {
                    console.log("epic house create");
                    resolve({
                        actionType: NAME_ACTIONS.UTILITYBILL_SCREEN.CREATE_UTILITYBILL,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.UTILITYBILL_SCREEN.CREATE_UTILITYBILL_FAILED));
                })
                break;
            case NAME_ACTIONS.UTILITYBILL_SCREEN.EDIT_UTILITYBILL:
                utilityBillBusiness.editUtilityBill(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.UTILITYBILL_SCREEN.EDIT_UTILITYBILL,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.UTILITYBILL_SCREEN.EDIT_UTILITYBILL_FAILED));
                })
                break;
            case NAME_ACTIONS.UTILITYBILL_SCREEN.DELETE_UTILITYBILL:
                utilityBillBusiness.deleteUtilityBill(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.UTILITYBILL_SCREEN.DELETE_UTILITYBILL,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.UTILITYBILL_SCREEN.DELETE_UTILITYBILL_FAILED));
                })
                break;
            default:
                console.error('Error when resolver UtilityBill Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.UTILITYBILL_SCREEN.GET_UTILITYBILL:
            return {
                type: NAME_EPICS.EPIC_UTILITYBILL_SCREEN.EPIC_GET_UTILITYBILL,
                data: data.data
            };
        case NAME_ACTIONS.UTILITYBILL_SCREEN.EDIT_UTILITYBILL:
            return {
                type: NAME_EPICS.EPIC_UTILITYBILL_SCREEN.EPIC_EDIT_UTILITYBILL,
                data: data.data
            };
        case NAME_ACTIONS.UTILITYBILL_SCREEN.CREATE_UTILITYBILL:
            return {
                type: NAME_EPICS.EPIC_UTILITYBILL_SCREEN.EPIC_CREATE_UTILITYBILL,
                data: data.data
            };
        case NAME_ACTIONS.UTILITYBILL_SCREEN.DELETE_UTILITYBILL:
            return {
                type: NAME_EPICS.EPIC_UTILITYBILL_SCREEN.EPIC_DELETE_UTILITYBILL,
                data: data.data
            };
        default:
            console.error('Error when dispatch UtilityBill Epic.');
            return new Error('Error when dispatch UtilityBill Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.UTILITYBILL_SCREEN.GET_UTILITYBILL_FAILED:
            return {
                type: NAME_EPICS.EPIC_UTILITYBILL_SCREEN.EPIC_GET_UTILITYBILL_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.UTILITYBILL_SCREEN.CREATE_UTILITYBILL_FAILED:
            return {
                type: NAME_EPICS.EPIC_UTILITYBILL_SCREEN.EPIC_CREATE_UTILITYBILL_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.UTILITYBILL_SCREEN.EDIT_UTILITYBILL_FAILED:
            return {
                type: NAME_EPICS.EPIC_UTILITYBILL_SCREEN.EPIC_EDIT_UTILITYBILL_FAILED,
                data: messageError
            }
        default:
            console.error('Error when dispatch error UtilityBill Epic.');
            return new Error('Error when dispatch error UtilityBill Epic.'); F
    }
};

const UtilityBillEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.UTILITYBILL_SCREEN.UTILITYBILL_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default UtilityBillEpic;