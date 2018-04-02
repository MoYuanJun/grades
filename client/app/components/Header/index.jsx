/* 木偶组件 ==> 头部 */
/* 接口：
需要父组件传一个
*/
import React from 'react';
import './style.less';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearUserInfo } from '../../actions/userInfoAction';
class ComponentHeader extends React.Component{

  clickHandlerClearUserInfo = () => {
    clearUserInfo();
  }

  /* 搜索事件处理器 searchText */
  render(){
    const { userInfo, searchHandler } = this.props;
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
                <li className='float-left'>
                  <a onClick={(e) => {searchHandler(e.target.innerHTML);}} href="javascript:;">女装</a>
                </li>
                <li className='float-left'>
                  <a onClick={(e) => {searchHandler(e.target.innerHTML);}}  href="javascript:;">男士</a>
                </li>
                <li className='float-left'>
                  <a onClick={(e) => {searchHandler(e.target.innerHTML);}}  href="javascript:;">居家</a>
                </li>
                <li className='float-left'>
                  <a onClick={(e) => {searchHandler(e.target.innerHTML);}}  href="javascript:;">运动</a>
                </li>
              </ul>
            </div>
            {/* 搜索框 */}
            <div className='search float-right'>
              <Input.Search className='inputSearch' 
                            onSearch={ searchHandler } 
                            placeholder={this.props.placeholder ? this.props.placeholder : '输入搜索词条'} 
                            enterButton="搜索"/>
            </div>
          </div>
        </div>
        {/* 底部灰白区域 */}
        <div id='header_bottom'>
          <div className='content clearfix'>
            <ul className='float-right'>
              <li className='float-left'>
                {
                  userInfo && userInfo.u_id ? 
                  <Link to={`/prospects/userHome/${userInfo.u_id}`}>Hi~{userInfo.username}</Link> :
                  <Link to='/login/login'>亲，请登录</Link>
                }
              </li>
              <li className='float-left'>
                {
                  userInfo && userInfo.u_id ? 
                  <Link to='/' onClick={ this.clickHandlerClearUserInfo }>退出登录</Link> :
                  <Link to='/login/register'>免费注册</Link>
                }
              </li>
              <li className='float-left'>
                <a href="/">我的购物车</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

//连接redux
function mapStateToProps(state){
  return {
    userInfo: state.userInfo
  }
}
function mapDispatchToProps(dispatch){return {
  clearUserInfo: bindActionCreators(clearUserInfo, dispatch)
};}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentHeader);
