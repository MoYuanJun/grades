/* 头部智能组件 */
import React from 'react';
import ComponentHeader from '../../../../components/Header';
import { Modal } from 'antd';

class Header extends React.Component{
  //搜索框 提示信息
  info(){
    Modal.info({
      title:'搜索错误!',
      content:'请输入搜索词条!'
    });
  }
  /* 首页：搜索处理器 */
  searchHandler(value){
    if (value){
      /* 直接跳转路由 ：history是现在主智能组件中获取到然后传过来的 并不是想象中的那样直接获取  */
      this.props.history.push('/prospects/search/'+value);
    } else {
      this.info();
    }
  }
  render(){
    return (
      <div>  
        <ComponentHeader searchHandler={this.searchHandler.bind(this)} />
      </div>
    );
  }
}
export default Header;

