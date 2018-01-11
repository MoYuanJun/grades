/**
 * IE报错：
 * 解决部分浏览器 不支持startsWith 和 endsWith方法的解决办法
 * 检测：若不支持startsWith 和 endsWith则自定义引入自定义方法
 */
if (typeof String.prototype.startsWith != 'function') {  
  String.prototype.startsWith = function (prefix){  
   return this.slice(0, prefix.length) === prefix;  
  };  
 }

 if (typeof String.prototype.endsWith != 'function') {  
  String.prototype.endsWith = function(suffix) {  
   return this.indexOf(suffix, this.length - suffix.length) !== -1;  
  };  
 }  

/**
 * 对元素的字数进行限制  多余的省略并在末尾添加省略号
 * @param {HTMLELEMENT} cname 要操作的DOM元素
 * @param { Number } wordLength 保留字数
 */
export const wordlimit = (cname,wordLength) =>{
    const nowLength=cname.innerHTML.length;
    if(nowLength > wordLength){
      cname.innerHTML=cname.innerHTML.substr(0,wordLength)+' . . . ';
    }　
  }
