import { dataStatus } from '../../utility/config';
import { NAME_EPICS } from '../epics/house/NameEpic'

const houseState = {
  listHouse: {
    status: dataStatus.NONE,
    message: '',
    data: [],
  },
  createStatus: {
    status: dataStatus.NONE,
    message: '',
    data: {},
  },
  editStatus: {
    status: dataStatus.NONE,
    message: '',
    data: {},
  },
  deleteStatus: {
    status: dataStatus.NONE,
    message: '',
    data: {},
  }
};
const houseReducer = (state = houseState, action) => {
  switch (action.type) {
    case NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_GET_HOUSE:
      state = {
        ...state,
        listHouse: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_GET_HOUSE_FAILED:
      state = {
        ...state,
        listHouse: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_EDIT_HOUSE:
      state = {
        ...state,
        editStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_EDIT_HOUSE_FAILED:
      state = {
        ...state,
        editStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_CREATE_HOUSE:
      state = {
        ...state,
        createStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_CREATE_HOUSE_FAILED:
      state = {
        ...state,
        createStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_DELETE_HOUSE:
      state = {
        ...state,
        deleteStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_DELETE_HOUSE_FAILED:
      state = {
        ...state,
        deleteStatus: {
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
export default houseReducer;
