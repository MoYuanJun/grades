/* 设置redux中userInfo的reducer */
import * as actionType from '../constants/userInfo';

/* 参数2个  一个默认state(必须给一个初始值) 一个action */
export default function userInfo(state={},action){
  switch (action.type) { 
    case actionType.USERINFO_GET : return action.data;
    case actionType.USERINFO_SET : return action.data;
    case actionType.USERINFO_CLEAR : return action.data;
    default : return state
  }
}



