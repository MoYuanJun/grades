/* 多fetch进行二次封装：所有数据的获取操作全部在这里 */
import { get } from './get';
import { post } from './post';
/* 设置通用URL */
import { URL } from '../config';


/* 登录信息获取 参数 是通过post方式获取数据时的参数 一般是用户名和密码 */
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

/* 获取商品列表: 参数路由参数 */
export function getCommodityList(strParams){
  /* 拼接参数 */
  return get( URL + 'commodity/getCommodityList.php' + strParams);
}

/* 商品搜索 */
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
