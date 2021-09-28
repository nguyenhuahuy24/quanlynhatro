import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';

import { NAME_ACTIONS } from '../../action/customerAction/ActionName';
import { NAME_EPICS } from './NameEpic';

import CustomerBusiness from '../../../business/CustomerBusiness'


let messageError = {};

const resolver = (action) => {
    const customerBusiness = new CustomerBusiness();
    return new Promise((resolve, reject) => {
        switch (action.typeAction) {
            case NAME_ACTIONS.CUSTOMER_SCREEN.GET_CUSTOMER:  
                customerBusiness.getAllCustomerOfUser(success => {
                    
                    resolve({
                        actionType: NAME_ACTIONS.CUSTOMER_SCREEN.GET_CUSTOMER,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.CUSTOMER_SCREEN.GET_CUSTOMER_FAILED));
                })
                break;
            case NAME_ACTIONS.CUSTOMER_SCREEN.CREATE_CUSTOMER:
                customerBusiness.createCustomer(action.data, success => {
                    
                    resolve({
                        actionType: NAME_ACTIONS.CUSTOMER_SCREEN.CREATE_CUSTOMER,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.CUSTOMER_SCREEN.CREATE_CUSTOMER_FAILED));
                })
                break;
            case NAME_ACTIONS.CUSTOMER_SCREEN.EDIT_CUSTOMER:
                customerBusiness.editCustomer(action.data, success => {
                    console.log("epic create");
                    resolve({
                        actionType: NAME_ACTIONS.CUSTOMER_SCREEN.EDIT_CUSTOMER,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.CUSTOMER_SCREEN.EDIT_CUSTOMER_FAILED));
                })
                break;
            case NAME_ACTIONS.CUSTOMER_SCREEN.DELETE_CUSTOMER:
                customerBusiness.deleteCustomer(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.CUSTOMER_SCREEN.DELETE_CUSTOMER,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.CUSTOMER_SCREEN.DELETE_CUSTOMER_FAILED));
                })
                break;
            default:
                console.error('Error when resolver customer Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.CUSTOMER_SCREEN.GET_CUSTOMER:
            return {
                type: NAME_EPICS.EPIC_CUSTOMER_SCREEN.EPIC_GET_CUSTOMER,
                data: data.data
            };
        case NAME_ACTIONS.CUSTOMER_SCREEN.EDIT_CUSTOMER:
            return {
                type: NAME_EPICS.EPIC_CUSTOMER_SCREEN.EPIC_EDIT_CUSTOMER,
                data: data.data
            };
        case NAME_ACTIONS.CUSTOMER_SCREEN.CREATE_CUSTOMER:
            return {
                type: NAME_EPICS.EPIC_CUSTOMER_SCREEN.EPIC_CREATE_CUSTOMER,
                data: data.data
            };
        case NAME_ACTIONS.CUSTOMER_SCREEN.DELETE_CUSTOMER:
            return {
                type: NAME_EPICS.EPIC_CUSTOMER_SCREEN.EPIC_DELETE_CUSTOMER,
                data: data.data
            };
        default:
            console.error('Error when dispatch Customer Epic.');
            return new Error('Error when dispatch Customer Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.CUSTOMER_SCREEN.GET_CUSTOMER_FAILED:
            return {
                type: NAME_EPICS.EPIC_CUSTOMER_SCREEN.EPIC_GET_CUSTOMER_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.CUSTOMER_SCREEN.CREATE_CUSTOMER_FAILED:
            return {
                type: NAME_EPICS.EPIC_CUSTOMER_SCREEN.EPIC_CREATE_CUSTOMER_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.CUSTOMER_SCREEN.EDIT_CUSTOMER_FAILED:
            return {
                type: NAME_EPICS.EPIC_CUSTOMER_SCREEN.EPIC_EDIT_CUSTOMER_FAILED,
                data: messageError
            }
        default:
            console.error('Error when dispatch error Customer Epic.');
            return new Error('Error when dispatch error Customer Epic.'); F
    }
};

const CustomerEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.CUSTOMER_SCREEN.CUSTOMER_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default CustomerEpic;