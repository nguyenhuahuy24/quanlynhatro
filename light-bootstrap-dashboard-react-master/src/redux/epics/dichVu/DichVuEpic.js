import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';

import { NAME_ACTIONS } from '../../action/dichVuAction/ActionName';
import { NAME_EPICS } from './NameEpic';

import DichVuBusiness from '../../../business/DichVuBusiness'


let messageError = {};

const resolver = (action) => {
    const dichVuBusiness = new DichVuBusiness();
    return new Promise((resolve, reject) => {
        switch (action.typeAction) {
            case NAME_ACTIONS.DICHVU_SCREEN.GET_DICHVU:  
                dichVuBusiness.getServiceOfUser( success => {
                    resolve({
                        actionType: NAME_ACTIONS.DICHVU_SCREEN.GET_DICHVU,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.DICHVU_SCREEN.GET_DICHVU_FAILED));
                })
                break;
            case NAME_ACTIONS.DICHVU_SCREEN.CREATE_DICHVU:
                dichVuBusiness.createDichVu(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.DICHVU_SCREEN.CREATE_DICHVU,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.DICHVU_SCREEN.CREATE_DICHVU_FAILED));
                })
                break;
            case NAME_ACTIONS.DICHVU_SCREEN.EDIT_DICHVU:
                dichVuBusiness.editDichVu(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.DICHVU_SCREEN.EDIT_DICHVU,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.DICHVU_SCREEN.EDIT_DICHVU_FAILED));
                })
                break;
            case NAME_ACTIONS.DICHVU_SCREEN.DELETE_DICHVU:
                dichVuBusiness.deleteDichVu(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.DICHVU_SCREEN.DELETE_DICHVU,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.DICHVU_SCREEN.DELETE_DICHVU_FAILED));
                })
                break;
            default:
                console.error('Error when resolver Dịch Vụ Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.DICHVU_SCREEN.GET_DICHVU:
            return {
                type: NAME_EPICS.EPIC_DICHVU_SCREEN.EPIC_GET_DICHVU,
                data: data.data
            };
        case NAME_ACTIONS.DICHVU_SCREEN.EDIT_DICHVU:
            return {
                type: NAME_EPICS.EPIC_DICHVU_SCREEN.EPIC_EDIT_DICHVU,
                data: data.data
            };
        case NAME_ACTIONS.DICHVU_SCREEN.CREATE_DICHVU:
            return {
                type: NAME_EPICS.EPIC_DICHVU_SCREEN.EPIC_CREATE_DICHVU,
                data: data.data
            };
        case NAME_ACTIONS.DICHVU_SCREEN.DELETE_DICHVU:
            return {
                type: NAME_EPICS.EPIC_DICHVU_SCREEN.EPIC_DELETE_DICHVU,
                data: data.data
            };
        default:
            console.error('Error when dispatch Dịch Vụ Epic.');
            return new Error('Error when dispatch Dịch Vụ Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.DICHVU_SCREEN.GET_DICHVU_FAILED:
            return {
                type: NAME_EPICS.EPIC_DICHVU_SCREEN.EPIC_GET_DICHVU_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.DICHVU_SCREEN.CREATE_DICHVU_FAILED:
            return {
                type: NAME_EPICS.EPIC_DICHVU_SCREEN.EPIC_CREATE_DICHVU_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.DICHVU_SCREEN.EDIT_DICHVU_FAILED:
            return {
                type: NAME_EPICS.EPIC_DICHVU_SCREEN.EPIC_EDIT_DICHVU_FAILED,
                data: messageError
            }
        default:
            console.error('Error when dispatch error Dịch Vụ Epic.');
            return new Error('Error when dispatch error Dịch Vụ Epic.'); F
    }
};

const DichVuEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.DICHVU_SCREEN.DICHVU_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default DichVuEpic;