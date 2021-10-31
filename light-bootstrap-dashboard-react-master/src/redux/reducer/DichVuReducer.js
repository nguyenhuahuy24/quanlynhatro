import { dataStatus } from '../../utility/config';
import { NAME_EPICS } from '../epics/dichVu/NameEpic'

const dichVuState = {
  listDichVu: {
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
const dichVuReducer = (state = dichVuState, action) => {
  switch (action.type) {
    case NAME_EPICS.EPIC_DICHVU_SCREEN.EPIC_GET_DICHVU:
      state = {
        ...state,
        listDichVu: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_DICHVU_SCREEN.EPIC_GET_DICHVU_FAILED:
      state = {
        ...state,
        listDichVu: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_DICHVU_SCREEN.EPIC_EDIT_DICHVU:
      state = {
        ...state,
        editStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_DICHVU_SCREEN.EPIC_EDIT_DICHVU_FAILED:
      state = {
        ...state,
        editStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_DICHVU_SCREEN.EPIC_CREATE_DICHVU:
      state = {
        ...state,
        createStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_DICHVU_SCREEN.EPIC_CREATE_DICHVU_FAILED:
      state = {
        ...state,
        createStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_DICHVU_SCREEN.EPIC_DELETE_DICHVU:
      state = {
        ...state,
        deleteStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_DICHVU_SCREEN.EPIC_DELETE_DICHVU_FAILED:
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
export default dichVuReducer;
