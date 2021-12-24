import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';

import { NAME_ACTIONS } from '../../action/statisticalAction/ActionName';
import { NAME_EPICS } from './NameEpic';

import StatisticalBusiness from '../../../business/StatisticalBusiness'


let messageError = {};

const resolver = (action) => {
    const statisticalBusiness = new StatisticalBusiness();
    return new Promise((resolve, reject) => {
        switch (action.typeAction) {
            case NAME_ACTIONS.STATISTICAL_SCREEN.GET_STATISTICAL:  
                statisticalBusiness.getByYear(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.STATISTICAL_SCREEN.GET_STATISTICAL,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.STATISTICAL_SCREEN.GET_STATISTICAL_FAILED));
                })
                break;
            default:
                console.error('Error when resolver Statistical Epic.');
                break;
        }
    });
};
const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.STATISTICAL_SCREEN.GET_STATISTICAL:
            return {
                type: NAME_EPICS.EPIC_STATISTICAL_SCREEN.EPIC_GET_STATISTICAL,
                data: data.data
            };
        default:
            console.error('Error when dispatch Statistical Epic.');
            return new Error('Error when dispatch Statistical Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.STATISTICAL_SCREEN.GET_STATISTICAL_FAILED:
            return {
                type: NAME_EPICS.EPIC_STATISTICAL_SCREEN.EPIC_GET_STATISTICAL_FAILED,
                data: messageError
            }
        default:
            console.error('Error when dispatch error Statistical Epic.');
            return new Error('Error when dispatch error Statistical Epic.'); F
    }
};

const StatisticalEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.STATISTICAL_SCREEN.STATISTICAL_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default StatisticalEpic;