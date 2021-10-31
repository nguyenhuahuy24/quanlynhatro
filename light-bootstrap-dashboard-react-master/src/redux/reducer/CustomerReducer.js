import { dataStatus } from '../../utility/config';
import { NAME_EPICS } from '../epics/customer/NameEpic'

const customerState = {
  listCustomer: {
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
const customerReducer = (state = customerState, action) => {
  switch (action.type) {
    case NAME_EPICS.EPIC_CUSTOMER_SCREEN.EPIC_GET_CUSTOMER:
      state = {
        ...state,
        listCustomer: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_CUSTOMER_SCREEN.EPIC_GET_CUSTOMER_FAILED:
      state = {
        ...state,
        listCustomer: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_CUSTOMER_SCREEN.EPIC_EDIT_CUSTOMER:
      state = {
        ...state,
        editStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_CUSTOMER_SCREEN.EPIC_EDIT_CUSTOMER_FAILED:
      state = {
        ...state,
        editStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_CUSTOMER_SCREEN.EPIC_CREATE_CUSTOMER:
      state = {
        ...state,
        createStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_CUSTOMER_SCREEN.EPIC_CREATE_CUSTOMER_FAILED:
      state = {
        ...state,
        createStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_CUSTOMER_SCREEN.EPIC_DELETE_CUSTOMER:
      state = {
        ...state,
        deleteStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_CUSTOMER_SCREEN.EPIC_DELETE_CUSTOMER_FAILED:
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
export default customerReducer;
