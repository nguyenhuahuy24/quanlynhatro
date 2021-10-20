import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';

import { NAME_ACTIONS } from '../../action/contractAction/ActionName';
import { NAME_EPICS } from './NameEpic';

import ContractBusiness from '../../../business/ContractBusiness'


let messageError = {};

const resolver = (action) => {
    const contractBusiness = new ContractBusiness();
    return new Promise((resolve, reject) => {
        switch (action.typeAction) {
            case NAME_ACTIONS.CONTRACT_SCREEN.GET_CONTRACT:  
                contractBusiness.getContractOfUser( success => {
   
                    resolve({
                        actionType: NAME_ACTIONS.CONTRACT_SCREEN.GET_CONTRACT,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.CONTRACT_SCREEN.GET_CONTRACT_FAILED));
                })
                break;
            case NAME_ACTIONS.CONTRACT_SCREEN.CREATE_CONTRACT:
                contractBusiness.createContract(action.data, success => {
          
                    resolve({
                        actionType: NAME_ACTIONS.CONTRACT_SCREEN.CREATE_CONTRACT,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.CONTRACT_SCREEN.CREATE_CONTRACT_FAILED));
                })
                break;
            case NAME_ACTIONS.CONTRACT_SCREEN.EDIT_CONTRACT:
                contractBusiness.editContract(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.CONTRACT_SCREEN.EDIT_CONTRACT,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.CONTRACT_SCREEN.EDIT_CONTRACT_FAILED));
                })
                break;
            case NAME_ACTIONS.CONTRACT_SCREEN.DELETE_CONTRACT:
                contractBusiness.deleteContract(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.CONTRACT_SCREEN.DELETE_CONTRACT,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.CONTRACT_SCREEN.DELETE_CONTRACT_FAILED));
                })
                break;
            default:
                console.error('Error when resolver Contract Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.CONTRACT_SCREEN.GET_CONTRACT:
            return {
                type: NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_GET_CONTRACT,
                data: data.data
            };
        case NAME_ACTIONS.CONTRACT_SCREEN.EDIT_CONTRACT:
            return {
                type: NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_EDIT_CONTRACT,
                data: data.data
            };
        case NAME_ACTIONS.CONTRACT_SCREEN.CREATE_CONTRACT:
            return {
                type: NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_CREATE_CONTRACT,
                data: data.data
            };
        case NAME_ACTIONS.CONTRACT_SCREEN.DELETE_CONTRACT:
            return {
                type: NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_DELETE_CONTRACT,
                data: data.data
            };
        default:
            console.error('Error when dispatch Contract Epic.');
            return new Error('Error when dispatch Contract Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.CONTRACT_SCREEN.GET_CONTRACT_FAILED:
            return {
                type: NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_GET_CONTRACT_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.CONTRACT_SCREEN.CREATE_CONTRACT_FAILED:
            return {
                type: NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_CREATE_CONTRACT_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.CONTRACT_SCREEN.EDIT_CONTRACT_FAILED:
            return {
                type: NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_EDIT_CONTRACT_FAILED,
                data: messageError
            }
        default:
            console.error('Error when dispatch error Contract Epic.');
            return new Error('Error when dispatch error Contract Epic.'); F
    }
};

const ContractEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.CONTRACT_SCREEN.CONTRACT_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default ContractEpic;