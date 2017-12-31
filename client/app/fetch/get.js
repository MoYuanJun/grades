/* fetch 之 通过get方法进行数据的获取 */
/* 导入 封装的fetch依赖包 */
import 'whatwg-fetch';
/* 导入promise的实现方法：为了兼容那些不支持promise的浏览器 */
import Promise from 'promise-polyfill';

/* 兼容性写法：判断浏览器是否支持promise */
if ( !window.Promise ){
  /* 浏览器不支持Promise则手动设置 全局变量promise */
  window.Promise = Promise;
}

/* 导出封装的方法 ： 参数 url*/
export function get ( url ){
  /* 调用 fetch方法  */
  var result = fetch( url, {
    /* 设置头响应信息 */
    headers : {'Accept': 'application/json,text/plain,*/*' }
  });
  return result;
}


