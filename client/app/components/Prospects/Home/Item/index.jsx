/* 客户端：木偶组件List中的每个木偶组件Item */
import React from 'react';
import './style.less';
//引入 方法 对特定元素的字数进行限制 并将多余的文字用省略号替代
import { wordlimit } from '../../../../static/js/common';
class ItemComponent extends React.Component{
  render(){
    const data = this.props.data;
    return (
      <div id='ItemComponent'>
        <div className = 'img'>
          <img src={ data.com_img } alt=""/>
        </div>
        <p ref='title' className = 'title'>{data.com_title}</p>
        <p className = 'evacol'>
            评价<span>{data.com_evaluate}</span>
            收藏<span>{data.com_collect}</span>
        </p>
        <p className = 'price'>
            <span className = 'newPrice'><span>￥</span>{data.com_price}</span>
            <span className = 'oldPrice'>￥{data.com_price}</span>
            <span className = 'float-right'>月销{data.com_salesVolume}笔</span>
        </p>

      </div>
    );
  }
  componentDidMount(){
    //调用方法 对标题的字数进行限制，超过用省略号进行替代
    wordlimit(this.refs.title,23);
  }
  componentDidUpdate(){wordlimit(this.refs.title,23);console.log(1111)}
}
export default ItemComponent;


