import {combineReducers} from 'redux';
import HouseReducer from './HouseReduce';
import DichVuReducer from './DichVuReducer';
import ContractReducer from './ContractReducer';
import RoomReducer from './RoomReducer';
import CustomerReducer from './CustomerReducer';
import UtilityBillReducer from './UtilityBillReducer';
import BillReducer from './BillReducer';
import UserReducer from './UserReducer';
import StatisticalReducer from './StatisticalReducer';

const RootReducer = combineReducers({
  HouseReducer, DichVuReducer,RoomReducer,CustomerReducer,UtilityBillReducer,BillReducer,UserReducer,ContractReducer,StatisticalReducer
});

export default RootReducer;
