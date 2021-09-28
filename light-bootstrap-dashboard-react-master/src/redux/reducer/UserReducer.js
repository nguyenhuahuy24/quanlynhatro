import { dataStatus } from '../../utility/config';
import { NAME_EPICS } from '../epics/user/NameEpic'

const userState = {
  user: {
    status: dataStatus.NONE,
    message: '',
    data: {},
  },
  changPasswordStatus: {
    status: dataStatus.NONE,
    message: '',
    data: {},
  },
  editStatus: {
    status: dataStatus.NONE,
    message: '',
    data: {},
  }
};
const UserReducer = (state = userState, action) => {
  switch (action.type) {
    case NAME_EPICS.EPIC_USER_SCREEN.EPIC_GET_USER:
      state = {
        ...state,
        user: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      
      break;
    case NAME_EPICS.EPIC_USER_SCREEN.EPIC_GET_USER_FAILED:
      state = {
        ...state,
        user: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_USER_SCREEN.EPIC_EDIT_USER:
      state = {
        ...state,
        editStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      console.log(`Reducer user: `,state);
      break;
    case NAME_EPICS.EPIC_USER_SCREEN.EPIC_EDIT_USER_FAILED:
      state = {
        ...state,
        editStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_USER_SCREEN.EPIC_CHANGE_PASSWORD:
      state = {
        ...state,
        changPasswordStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      console.log(`Reducer user: `,state);
      break;
    case NAME_EPICS.EPIC_USER_SCREEN.EPIC_CHANGE_PASSWORD_FAILED:
      state = {
        ...state,
        changPasswordStatus: {
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
export default UserReducer;
