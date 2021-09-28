import { dataStatus } from '../../utility/config';
import { NAME_EPICS } from '../epics/room/NameEpic'

const roomState = {
  listRoom: {
    status: dataStatus.NONE,
    message: '',
    data: [],
  },
  listEmptyRoom: {
    status: dataStatus.NONE,
    message: '',
    data: {},
  },
  listNotEmptyRoom: {
    status: dataStatus.NONE,
    message: '',
    data: {},
  },
  addPersonStatus: {
    status: dataStatus.NONE,
    message: '',
    data: {},
  },
  removePersonStatus: {
    status: dataStatus.NONE,
    message: '',
    data: {},
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
const RoomReducer = (state = roomState, action) => {
  switch (action.type) {
    case NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_GET_ROOM:
      state = {
        ...state,
        listRoom: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      
      break;
    case NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_GET_ROOM_FAILED:
      state = {
        ...state,
        listRoom: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_EDIT_ROOM:
      state = {
        ...state,
        editStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_EDIT_ROOM_FAILED:
      state = {
        ...state,
        editStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_CREATE_ROOM:
      state = {
        ...state,
        createStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      
      break;
    case NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_CREATE_ROOM_FAILED:
      state = {
        ...state,
        createStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_DELETE_ROOM:
      state = {
        ...state,
        deleteStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_DELETE_ROOM_FAILED:
      state = {
        ...state,
        deleteStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break; 
    case NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_ADD_PERSON_TO_ROOM:
      state = {
        ...state,
        addPersonStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      console.log(`reducer: `,state)
      break;
    case NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_ADD_PERSON_TO_ROOM_FAILED:
      state = {
        ...state,
        addPersonStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_REMOVE_PERSON_TO_ROOM:
      state = {
        ...state,
        removePersonStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_REMOVE_PERSON_TO_ROOM_FAILED:
      state = {
        ...state,
        removePersonStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_GET_EMPTY_ROOM:
      state = {
        ...state,
        listEmptyRoom: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      console.log(`reducer: `,state)
      break;
    case NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_GET_EMPTY_ROOM_FAILED:
      state = {
        ...state,
        listEmptyRoom: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_GET_NOT_EMPTY_ROOM:
      state = {
        ...state,
        listNotEmptyRoom: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_ROOM_SCREEN.EPIC_GET_NOT_EMPTY_ROOM_FAILED:
      state = {
        ...state,
        listNotEmptyRoom: {
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
export default RoomReducer;
