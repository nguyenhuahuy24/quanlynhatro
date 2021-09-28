import { dataStatus } from '../../utility/config';
import { NAME_EPICS } from '../epics/utilityBill/NameEpic'

const utilityBillState = {
  listUtilityBill: {
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
const utilityReducer = (state = utilityBillState, action) => {
  switch (action.type) {
    case NAME_EPICS.EPIC_UTILITYBILL_SCREEN.EPIC_GET_UTILITYBILL:
      state = {
        ...state,
        listUtilityBill: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
     
      break;
    case NAME_EPICS.EPIC_UTILITYBILL_SCREEN.EPIC_GET_UTILITYBILL_FAILED:
      state = {
        ...state,
        listUtilityBill: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_UTILITYBILL_SCREEN.EPIC_EDIT_UTILITYBILL:
      state = {
        ...state,
        editStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }

      break;
    case NAME_EPICS.EPIC_UTILITYBILL_SCREEN.EPIC_EDIT_UTILITYBILL_FAILED:
      state = {
        ...state,
        editStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_UTILITYBILL_SCREEN.EPIC_CREATE_UTILITYBILL:
      state = {
        ...state,
        createStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      console.log(`reducer UtilityBill create`,state);
      break;
    case NAME_EPICS.EPIC_UTILITYBILL_SCREEN.EPIC_CREATE_UTILITYBILL_FAILED:
      state = {
        ...state,
        createStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_UTILITYBILL_SCREEN.EPIC_DELETE_UTILITYBILL:
      state = {
        ...state,
        deleteStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_UTILITYBILL_SCREEN.EPIC_DELETE_UTILITYBILL_FAILED:
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
export default utilityReducer;
