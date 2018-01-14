/* 木偶组件 ==> 头部 */
import React from 'react';
import './style.less';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
class ComponentHeader extends React.Component{
  render(){
    return (
      <div id='header'>
        <div id='header_top'>
          <div className='content clearfix'>
            <Link className='logo float-left' to='/'>
              <img src={require('../../../../static/img/logo.png')} alt="logo"/>
            </Link>
            <div className='menu float-left'>
              <ul>
                <li className='float-left'><a href="javascript:;">女装</a></li>
                <li className='float-left'><a href="javascript:;">男士</a></li>
                <li className='float-left'><a href="javascript:;">居家</a></li>
                <li className='float-left'><a href="javascript:;">运动</a></li>
              </ul>
            </div>
            <div className='search float-right'>
              <Input.Search className='inputSearch' onSearch={(value)=>{console.log(value)}} placeholder="输入搜索词条" enterButton="搜索"  />
            </div>
          </div>
        </div>
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
