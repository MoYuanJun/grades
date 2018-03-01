/* 所有页面的 模板文件 */
import React from 'react';

import Footer from '../components/Footer';

/* 引用通用样式||JS */
import 'antd/dist/antd.less';  //antd样式
import '../static/css/common.less';   //通用样式  包括阿里字体图标的使用
import '../static/font_icon/iconfont'; //引入阿里字体图标 之JS文件
/* 连接redux相关依赖 */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userInfoAction from '../actions/userInfoAction.js';


class App extends React.Component{
  render(){
    return(
      <div>
        {this.props.children}
        <Footer />
        {console.log('%c当前redux-state', 'background:green', this.props.ReduxState)}
      </div>
    )
  }
}

/* export default App; */
// 连接到redux
function mapStateToProps(state){// 将state映射到 props
  return {
    ReduxState:state
  }
}
function mapDispatchToProps(dispatch){// 将action函数集合dispatch进行连接并映射到props
  return {
    userInfoAction:bindActionCreators(userInfoAction,dispatch),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
