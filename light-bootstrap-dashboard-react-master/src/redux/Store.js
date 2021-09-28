import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import RootReducer from './reducer/RootReducer';
import RootEpic from './epics/Epics';

const epicMiddleware = createEpicMiddleware();
const enhaner = applyMiddleware(epicMiddleware);
const Store = createStore(RootReducer, enhaner);
epicMiddleware.run(RootEpic);

export default Store;