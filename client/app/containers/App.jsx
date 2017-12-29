/* 所有页面的 模板文件 */
import React from 'react';
/* 连接redux相关依赖 */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userInfoAction from '../actions/userInfoAction.js';
class App extends React.Component{
  render(){
    return(
      <div>
        {this.props.children}
        {this.props.userInfo.userName} {/* 测试 */}
      </div>
    )
  }
  componentDidMount(){/* 测试 */
    this.props.userInfoAction.userInfoGet(); //获取用户信息
  }
}


/* 连接到redux */
function mapStateToProps(state){/* 将state映射到 props*/
  return {
    userInfo:state.userInfo
  }
}
function mapDispatchToProps(dispatch){/* 将action函数集合dispatch进行连接并映射到props */
  return {
    userInfoAction:bindActionCreators(userInfoAction,dispatch),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
