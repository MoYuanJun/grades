
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

/* 封装方法 ： 将obj转为字符串  格式：&key=value&key=value  fetch可以直接传入一个对象 无需如此 */
function objToParams ( obj ){
  var result = '';
  var item;
  for( item in obj ){
    result += '&' + item + '=' + encodeURIComponent(obj[item]);
  }
  if ( result ){ /* 判断是否存在 参数字符串 */
    result = result.slice(1);//将第一个&去除
  }
  return result;
}

/* 导出封装的post方法 */
export function post (url, paramsObj, isFormat=true){
  var result = fetch (url, {
    method: 'post', //设置fetch获取数据的方式，默认是get所以在get的封装中并没有进行设置
    headers: { /* 设置头响应信息 */
      'Accept':'application/json,text/pain,*/*',
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
    },
    /* 设置参数  get可直接在URL中进行设置 */
    /* body:isFormat ? objToParams( paramsObj ) : paramsObj */
    body:objToParams( paramsObj ) 
  });
  return result;
}

