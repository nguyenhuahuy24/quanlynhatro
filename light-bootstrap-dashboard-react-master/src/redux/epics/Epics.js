import { combineEpics } from 'redux-observable';
import HouseEpic from '../epics/house/HouseEpic';
import DichVuEpic from '../epics/dichVu/DichVuEpic';
import ContractEpic from '../epics/contract/ContractEpic';
import RoomEpic from '../epics/room/RoomEpic';
import CustomerEpic from '../epics/customer/CustomerEpic';
import UtilityBillEpic from '../epics/utilityBill/UtilityBillEpic';
import BillEpic from '../epics/bill/BillEpic';
import UserEpic from '../epics/user/UserEpic';
import StatisticalEpic from '../epics/statistical/StatisticalEpic';

export default combineEpics(
    HouseEpic, DichVuEpic, RoomEpic,CustomerEpic, UtilityBillEpic,BillEpic,UserEpic,ContractEpic,StatisticalEpic
)