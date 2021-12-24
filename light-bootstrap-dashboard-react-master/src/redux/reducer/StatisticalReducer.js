import { dataStatus } from '../../utility/config';
import { NAME_EPICS } from '../epics/statistical/NameEpic'

const statisticalState = {
  listStatistical: {
    status: dataStatus.NONE,
    message: '',
    data: [],
  },
};
const StatisticalReducer = (state = statisticalState, action) => {
  switch (action.type) {
    case NAME_EPICS.EPIC_STATISTICAL_SCREEN.EPIC_GET_STATISTICAL:
      state = {
        ...state,
        listStatistical: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      
      break;
    case NAME_EPICS.EPIC_STATISTICAL_SCREEN.EPIC_GET_STATISTICAL_FAILED:
      state = {
        ...state,
        listStatistical: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    default:
      break;
  }
  return state;
};
export default StatisticalReducer;
