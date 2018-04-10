/* 首页侧边栏用户中心：木偶组件 */
import React from 'react';

import './style.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAdvComDataAction } from '../../actions/advComAction';
import { Link } from 'react-router-dom';
import AdvCom from '../AdvCom';
import { getAdvComData } from '../../fetch';

class UserShowComponent extends React.Component{
  render(){
    const { advCommData, userInfo } = this.props;
    return (
      <div id='brnach-right'>
        <div className='userShow'>
          <div className='top'>
            
              <div className='headPortrait'> {/* 头像 */}
                  { userInfo.head_img ? 
                    <Link to={`/prospects/userHome/${userInfo.u_id}/1`}>
                      <img src={userInfo.head_img} alt=""/>
                    </Link>:
                    <Link to={`/login/login`}>
                      <img src={require('../../static/img/loginbg.png')} alt=""/>
                    </Link>
                  }
              </div>
            
            <div className='welcome'>
              Hi~{userInfo.u_id ? <span>{ userInfo.nickname || userInfo.username}</span> : 
              <span>欢迎来到精品时装！</span>}
            </div>
          </div>
          <div className='bottom'>
            <div className='loginAndRegister clearfix'>
              {userInfo.u_id ? 
              <div>
                <Link to='/login/login'>
                  <div className='login float-left'>退出登录</div>
                </Link>
                <Link to={`/prospects/userHome/${userInfo.u_id}/1`}>
                  <div className='register float-right'>个人中心</div>
                </Link>
              </div> :
              <div>
                <Link to='/login/login'>
                  <div className='login float-left'>登录入口</div>
                </Link>
                <Link to='/login/register'>
                  <div className='register float-right'>注册入口</div>
                </Link>
              </div>}
            </div>
            <div></div>
          </div>
        </div>
        <div id="advertisingcommodity">
          <AdvCom 
            data={advCommData}
            listLent = {1}
            forTime = {10000}
           />
        </div>
      </div>
    );
  }

  componentWillMount(){
    const { getAdvComDataAction } = this.props;
    
    getAdvComData().then(res=>res.json()).then(json=>{
      json.error === '200' ? getAdvComDataAction(json.content) : [];
    });
  }

}
//连接redux
function mapStateToProps(state){
  return {
    userInfo:state.userInfo,
    advCommData: state.advCommData
  }
}
function mapDispatchToProps(dispatch){
  return {
    getAdvComDataAction: bindActionCreators(getAdvComDataAction, dispatch)
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShowComponent);