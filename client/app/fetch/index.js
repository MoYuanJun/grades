/* 多fetch进行二次封装：所有数据的获取操作全部在这里 */
import { get } from './get';
import { post } from './post';
/* 设置通用URL */
const $url = 'http://localhost/grades/server/';

/* 登录信息获取 参数 是通过post方式获取数据时的参数 一般是用户名和密码 */
export function LoginData (obj){
  return post($url+'login/login.php',obj);  
}

/* 注册时：检测当前用户是否存在 */
export function judgeUser(obj){
  return post($url+'login/judgeUser.php',obj); 
}

/* 注册 */
export function register(obj){
  return post($url+'login/insertUser.php',obj);
}
