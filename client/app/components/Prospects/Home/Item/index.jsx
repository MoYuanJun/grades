/* 客户端：木偶组件List中的每个木偶组件Item */
import React from 'react';
import './style.less';
import { ServerUrl } from '../../../../config';
//引入 方法 对特定元素的字数进行限制 并将多余的文字用省略号替代
import { wordlimit } from '../../../../static/js/common';
class ItemComponent extends React.Component{
  render(){
    return (
      <div id='ItemComponent'>
      {console.log(this.props.data)}
        <div className = 'img'>
          <img src={ServerUrl + this.props.data.img} alt=""/>
        </div>
        <p ref='title' className = 'title'>{this.props.data.title}</p>
        <p className = 'evacol'>
            评价<span>{this.props.data.evaluate}</span>
            收藏<span>{this.props.data.collect}</span>
        </p>
        <p className = 'price'>
            <span className = 'newPrice'><span>￥</span>{this.props.data.price}</span>
            <span className = 'oldPrice'>￥{this.props.data.price}</span>
            <span className = 'float-right'>月销{this.props.data.sales_volume}笔</span>
        </p>
      </div>
    );
  }
  componentDidMount(){
    //调用方法 对标题的字数进行限制，超过用省略号进行替代
    wordlimit(this.refs.title,23);
  }
}
export default ItemComponent;


