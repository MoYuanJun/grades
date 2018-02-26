
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

/**字符串处理方法：将给定字符串按指定分隔符分割成数组；
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

 /**时间戳格式化成日期的方法  => 2018-02-25
  * @param {string} timestamp   字符串   //时间搓
  */
export function TimestampToFormat(timestamp){
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const date_ = date.getDate();
  return `${year}-${month > 9 ? '' : '0'}${month}-${date_}`;
}


/*   * 修改当前this.state的某个值 并保持其他值不变
  * @param {object} that 表示当前this指向
  * @param {string || array} key 表示要修改state的key,可以是数组
  * @param {任意} value 表示要修改state的value，可以是数组

 export function changeState(that, key, value){
  const state = that.state;
  if (typeof key === 'string'){
    state[key] = value;
  }else if(typeof key === 'object'){ 
    for(let i=0;i<key.length;i++){
      state[key[i]] = value[i];
    }
  }else{
    return false;
  }
  that.setState(state);
  return true;
} */