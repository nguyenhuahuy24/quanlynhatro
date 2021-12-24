import {NAME_ACTIONS} from './ActionName'
export function getByYear(data){
    return {
        type: NAME_ACTIONS.STATISTICAL_SCREEN.STATISTICAL_SCREEN,
        typeAction: NAME_ACTIONS.STATISTICAL_SCREEN.GET_STATISTICAL,
        data: data
      };
}
