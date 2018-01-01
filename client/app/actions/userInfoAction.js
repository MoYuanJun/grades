/* 导入userInfo 相关action.type */
import * as actionType from '../constants/userInfo';

/* 用户信息获取action函数 通过传递一部分参数过来，从数据库进行获取数据 然后处理返回数据 然后触发reducer reducer直接返回数据作为一个state.xx*/
/* 但是这里具体功能还没想好 先空着理论中应该在这里通过传递参数和fetch进行获取数据 处理数据 */
export function updataUser (data){
  return {
    type:actionType.USERINFO_GET,
    data
  }
}


