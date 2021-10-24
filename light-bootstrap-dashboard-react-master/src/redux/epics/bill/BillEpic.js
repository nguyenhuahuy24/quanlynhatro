import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';

import { NAME_ACTIONS } from '../../action/billAction/ActionName';
import { NAME_EPICS } from './NameEpic';

import BillBusiness from '../../../business/BillBusiness'


let messageError = {};

const resolver = (action) => {
    const billBusiness = new BillBusiness();
    return new Promise((resolve, reject) => {
        switch (action.typeAction) {
            case NAME_ACTIONS.BILL_SCREEN.GET_BILL:  
                billBusiness.getBillInMonthOfUser(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.BILL_SCREEN.GET_BILL,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.BILL_SCREEN.GET_BILL_FAILED));
                })
                break;
            case NAME_ACTIONS.BILL_SCREEN.CREATE_BILL:
                billBusiness.createBill(action.data, success => {
                    console.log("`epic bill create`");
                    resolve({
                        actionType: NAME_ACTIONS.BILL_SCREEN.CREATE_BILL,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.BILL_SCREEN.CREATE_BILL_FAILED));
                })
                break;
            case NAME_ACTIONS.BILL_SCREEN.EDIT_BILL:
                billBusiness.editBill(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.BILL_SCREEN.EDIT_BILL,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.BILL_SCREEN.EDIT_BILL_FAILED));
                })
                break;
            case NAME_ACTIONS.BILL_SCREEN.DELETE_BILL:
                billBusiness.deleteBill(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.BILL_SCREEN.DELETE_BILL,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.BILL_SCREEN.DELETE_BILL_FAILED));
                })
                break;
            default:
                console.error('Error when resolver Bill Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.BILL_SCREEN.GET_BILL:
            return {
                type: NAME_EPICS.EPIC_BILL_SCREEN.EPIC_GET_BILL,
                data: data.data
            };
        case NAME_ACTIONS.BILL_SCREEN.EDIT_BILL:
            return {
                type: NAME_EPICS.EPIC_BILL_SCREEN.EPIC_EDIT_BILL,
                data: data.data
            };
        case NAME_ACTIONS.BILL_SCREEN.CREATE_BILL:
            return {
                type: NAME_EPICS.EPIC_BILL_SCREEN.EPIC_CREATE_BILL,
                data: data.data
            };
        case NAME_ACTIONS.BILL_SCREEN.DELETE_BILL:
            return {
                type: NAME_EPICS.EPIC_BILL_SCREEN.EPIC_DELETE_BILL,
                data: data.data
            };
        default:
            console.error('Error when dispatch Bill Epic.');
            return new Error('Error when dispatch Bill Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.BILL_SCREEN.GET_BILL_FAILED:
            return {
                type: NAME_EPICS.EPIC_BILL_SCREEN.EPIC_GET_BILL_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.BILL_SCREEN.CREATE_BILL_FAILED:
            return {
                type: NAME_EPICS.EPIC_BILL_SCREEN.EPIC_CREATE_BILL_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.BILL_SCREEN.EDIT_BILL_FAILED:
            return {
                type: NAME_EPICS.EPIC_BILL_SCREEN.EPIC_EDIT_BILL_FAILED,
                data: messageError
            }
        default:
            console.error('Error when dispatch error Bill Epic.');
            return new Error('Error when dispatch error Bill Epic.'); F
    }
};

const BillEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.BILL_SCREEN.BILL_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default BillEpic;