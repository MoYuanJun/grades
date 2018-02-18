
/* fetch 封装方法 之通过post方式获取数据 */
/* 导入封装的fetch依赖包 */
import 'whatwg-fetch';
/* 导入实现Promise的依赖包，为兼容那些并不支持Promise的浏览器 */
import Promise from 'promise-polyfill';

/* 兼容性写法:判断浏览器是否支持Promise */
if( !window.Promise ){
    /* 不支持则手动设置全局变量 */
    window.Promise = Promise;
  }

export function upload (url, paramsObj){
    var result = fetch (url, {
      method: 'post',
      body: paramsObj
    });
    return result;
  }













