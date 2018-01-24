/* 首页侧边栏用户中心：木偶组件 */
import React from 'react';

import './style.less';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UserShowComponent extends React.Component{
  render(){
    return (
      <div id='userShow'>
        <div className='top'>
          <div className='headPortrait'> {/* 头像 */}
            <img src={require('../../static/img/loginbg.png')} alt=""/>
          </div>
          <div className='welcome'>
            Hi~{this.props.userInfo.u_id ? <span>{this.props.userInfo.username}</span> : 
            <span>欢迎来到精品时装！</span>}
          </div>
        </div>
        <div className='bottom'>
          <div className='loginAndRegister clearfix'>
            <div className='login float-left'><Link to='/login/login'>登录入口</Link></div>
            <div className='register float-right'><Link to='/login/register'>注册入口</Link></div>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}
//连接redux
function mapStateToProps(state){
  return {
    userInfo:state.userInfo
  }
}
function mapDispatchToProps(){
  return {}
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShowComponent);