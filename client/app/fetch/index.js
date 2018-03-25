/* 多fetch进行二次封装：所有数据的获取操作全部在这里 */
import { get } from './get';
import { post } from './post';
import { upload } from './upload';
/* 设置通用URL */
import { URL } from '../config';

//将对象的二级对象转为json
const objToJson = (obj) => {
  const newObj = {};
  for(let key in obj){
    typeof obj[key] === 'object' ? newObj[key] = JSON.stringify(obj[key]) : 
    newObj[key] = obj[key];
  }
  return newObj;
}

/**通用更新数据的函数
 * 
 * @param {object} obj  //参数:格式如下演示代码：对象request
 * 演示：
 * const request = {
 *   request: {
 *       tableName: '表名',
 *       params: {   //要设置字段的 键值对
 *           name: 'qianyin',
 *           age: 20,
 *           time: '2018-12-02'
 *       },
 *       where:{  //条件：字段 以及字段值
 *           column: 'com_id',
 *           value: '3126'
 *       }
 *   }
 * }
 * updateData(request).then(res=>res.json()).then(json=>{
 *    //操作
 * });
 * 返回格式：json对象
 * {
 *    error : '0' || '1'  //1表示更新成功， 0表示失败
 *    updatedData : {更新后的商品数据对象}
 * }
 */
export function updateData (obj){
  return post(URL + 'currency/updateData.php', objToJson(obj));
}

/************************************************************** */

/* 登录 ==> 信息获取 => 参数 是通过post方式获取数据时的参数 一般是用户名和密码 */
export function LoginData (obj){
  return post(URL+'login/login.php',obj);  
}

/* 注册时：检测当前用户是否存在 */
export function judgeUser(obj){
  return post(URL+'login/judgeUser.php',obj); 
}

/* 注册：参数，表单信息{userName：xx,password:xx} */
export function register(obj){
  return post(URL+'login/insertUser.php',obj);
}

/* 首页商品列表 ==> 获取商品列表: 参数=>路由参数 */
export function getCommodityList(strParams){
  /* 拼接参数 */
  return get( URL + 'commodity/getCommodityList.php' + strParams);
}

/* 根据关键词==>商品搜索 */
export function searchCommodity(obj){
  let strParams = '?';
  if(obj){
    for(let key in obj){
      strParams += key+'='+obj[key]+'&';
    }
    
  }
  return get(URL + 'commodity/searchCommodity.php'+strParams);
}

/* 通过ID获取某商品的信息 */
export function getCommodityInfo(comId){
  return get(URL + 'commodity/getCommodityInfo.php?comId=' + comId);
}

//添加销售记录  ==> 购买时提交订单 或 添加到购物车都能触发  salesrecord/addSalesRecord.php
export function addSalesRecord(obj){
  return post( URL + 'salesrecord/addSalesRecord.php' , obj);
}

/**获取订单信息数据
 * @param { object } obj 参数：{u_id:xxxxx}
 * 参数：可选，默认获取所有订单数据
 */
export function getSalesRecord(obj = {}){
  return post( URL + 'salesrecord/getSalesRecord.php', obj);
}


/** 更新订单信息
 * @param {object} 格式：
 * {
 *  state: xx,   要修改后的状态  可选
 *  orderInfo: {key:value,key:value},  要修改的键值对//可选
 *  sal_id: [sal_id,sal_id,sal_id……]   //必选
 * }
 */
export function updateSalesRecordState(obj){
  //将对象格式化为：", key='value', key='value'"
  let orderInfostr = '';
  for( let key in obj.orderInfo ){
    orderInfostr += `, ${key}='${obj.orderInfo[key]}'`;
  }

  //将数组格式化为："'value','value','value','value'"
  let sal_idStr = '';
  obj.sal_id.map((item, index, arr) => {
    index === 0 ? sal_idStr += `'${item}'` : 
    index !== obj.sal_id.length-1 ? sal_idStr += `,'${item}'` : sal_idStr += `,'${item}'`;
  });
  
  //获取时间戳
  const time = new Date().getTime();

  //重置参数
  obj.orderInfo = orderInfostr;
  obj.sal_id = sal_idStr;
  obj.time = time;
  console.log('%c time', 'color:green', time);
  return post( URL + 'salesrecord/updateSalesRecordState.php', obj );
}

//upload文件上传
export function uploadFile( obj = {} ){
  return upload( URL + 'commodity/uploadFile.php', obj);
}

//后台添加商品
export function insertCommodity(obj){
  return post( URL + 'commodity/insertCommodity.php', obj );
}

/* 后台获取所有商品数据 */
export function getAllCommodityData(){
  return get( URL + 'commodity/getAllCommodityData.php' );
}

/* 获取广告商品数据 */
export function getAdvComData(){
  return get( URL + 'advertising/getAdvComData.php' );
}

//删除商品数据 {com_id: 'xxxxx'}
export function delteCommodityData(obj){
  return post(URL + 'commodity/deleteCommodity.php', obj);
}

/**更新商品数据
 * @param {object} obj
 * {
 *  where: json对象,          ====>  { com_id: xxxx }进行编译来的，存储着查询条件
 *  setKeyValue: json对象,    ====>  { key: value, key: value}进行编译来的，存储着要修改的字段及修改值
 * } 
 */
export function updataCommodity(obj){
  return post( URL + 'commodity/updataCommodity.php', obj);
}
