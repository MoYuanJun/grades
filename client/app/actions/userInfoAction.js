/* 导入userInfo 相关action.type */
import * as actionType from '../constants/userInfo';

/* 用户信息获取action函数 通过传递一部分参数过来，从数据库进行获取数据 然后处理返回数据 然后触发reducer reducer直接返回数据作为一个state.xx*/
/* 但是这里具体功能还没想好 先空着理论中应该在这里通过传递参数和fetch进行获取数据 处理数据 */
export function userInfoGet (){
  var data = {
    userName : 'qianyin',
    password : '123456'
  };
  return {
    type:actionType.USERINFO_GET,
    data:data
  }
}
/* 用户信息设置（更新）既要更新数据库、又要更新redux具体后面再看 */
export function userInfoSet (){
  var data = {
    userName : 'linheng',
    password : '123456'
  };
  return {
    type:actionType.USERINFO_SET,
    data:data
  };
}

