
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

/**
 *字符串处理方法：将给定字符串按指定分隔符分割成数组；
 * 例：将字符串 str;str;str;按';'格式化为[str,str,str]
 * @param {string} str   字符串
 * @param {chara} chara  字符
 * @return {Array}
 */
 export function getStrToArray(str, chara){
  let Array = str.split(chara);
  if(Array[Array.length-1] == ''){  //最后一个数组元素可能是空字符得进行判断处理
    //Array.length = Array.length - 1;
    Array.pop();
  }
  return Array;
 }

