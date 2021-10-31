import { dataStatus } from '../../utility/config';
import { NAME_EPICS } from '../epics/bill/NameEpic'

const billState = {
  listBill: {
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
  },
  recalculateBillStatus:{
    status: dataStatus.NONE,
    message: '',
    data: {},
  }
};
const billReducer = (state = billState, action) => {
  switch (action.type) {
    case NAME_EPICS.EPIC_BILL_SCREEN.EPIC_GET_BILL:
      state = {
        ...state,
        listBill: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_BILL_SCREEN.EPIC_GET_BILL_FAILED:
      state = {
        ...state,
        listBill: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_BILL_SCREEN.EPIC_RECALCULATE_BILL:
      state = {
        ...state,
        recalculateBillStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      console.log("reducer: ",state)
      break;
    case NAME_EPICS.EPIC_BILL_SCREEN.EPIC_RECALCULATE_BILL_FAILED:
      state = {
        ...state,
        recalculateBillStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_BILL_SCREEN.EPIC_EDIT_BILL:
      state = {
        ...state,
        editStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }

      break;
    case NAME_EPICS.EPIC_BILL_SCREEN.EPIC_EDIT_BILL_FAILED:
      state = {
        ...state,
        editStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_BILL_SCREEN.EPIC_CREATE_BILL:
      state = {
        ...state,
        createStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_BILL_SCREEN.EPIC_CREATE_BILL_FAILED:
      state = {
        ...state,
        createStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_BILL_SCREEN.EPIC_DELETE_BILL:
      state = {
        ...state,
        deleteStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_BILL_SCREEN.EPIC_DELETE_BILL_FAILED:
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
export default billReducer;
