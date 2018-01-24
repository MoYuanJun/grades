/* 木偶组件 ==> 头部 */
import React from 'react';
import './style.less';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
class ComponentHeader extends React.Component{
  /* 搜索事件处理器 searchText */
  render(){
    return (
      <div id='header'>
        {/* 顶部 橘黄色 */}
        <div id='header_top'>
          <div className='content clearfix'>
            {/* Logo */}
            <Link className='logo float-left' to='/'>
              <img src={require('../../static/img/logo.png')} alt="logo"/>
            </Link>
            {/* 菜单 */}
            <div className='menu float-left'>
              <ul>
                <li className='float-left'><a href="javascript:;">女装</a></li>
                <li className='float-left'><a href="javascript:;">男士</a></li>
                <li className='float-left'><a href="javascript:;">居家</a></li>
                <li className='float-left'><a href="javascript:;">运动</a></li>
              </ul>
            </div>
            {/* 搜索框 */}
            <div className='search float-right'>
              <Input.Search className='inputSearch' 
                            onSearch={ this.props.searchHandler } 
                            placeholder={this.props.placeholder ? this.props.placeholder : '输入搜索词条'} 
                            enterButton="搜索"/>
            </div>
          </div>
        </div>
        {/* 底部灰白区域 */}
        <div id='header_bottom'>
          <div className='content clearfix'>
            <ul className='float-right'>
              <li className='float-left'><Link to='/login/login'>亲，请登录</Link></li>
              <li className='float-left'><Link to='/login/register'>免费注册</Link></li>
              <li className='float-left'><a href="">我的订单</a></li>
              <li className='float-left'><a href="">收藏夹</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default ComponentHeader;
