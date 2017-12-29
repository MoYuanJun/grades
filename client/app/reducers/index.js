/* 合并多个独立reducer */

import {combineReducers} from 'redux';

/* 导入多个独立的reducer */
import userInfo from './userInfo';

/* 合并多个reducer  state中的对象状态主要还是看这个的 */
const Reducers = combineReducers({
  userInfo   
});

export default Reducers;
