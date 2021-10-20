import { dataStatus } from '../../utility/config';
import { NAME_EPICS } from '../epics/contract/NameEpic'

const contractState = {
  listContract: {
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
const contractReducer = (state = contractState, action) => {
  switch (action.type) {
    case NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_GET_CONTRACT:
      state = {
        ...state,
        listContract: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      console.log(`reducer: `,state)
      break;
    case NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_GET_CONTRACT_FAILED:
      state = {
        ...state,
        listContract: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_EDIT_CONTRACT:
      state = {
        ...state,
        editStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_EDIT_CONTRACT_FAILED:
      state = {
        ...state,
        editStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_CREATE_CONTRACT:
      state = {
        ...state,
        createStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_CREATE_CONTRACT_FAILED:
      state = {
        ...state,
        createStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_DELETE_CONTRACT:
      state = {
        ...state,
        deleteStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_DELETE_CONTRACT_FAILED:
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
export default contractReducer;
