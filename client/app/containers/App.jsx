/* 所有页面的 模板文件 */
import React from 'react';

import Footer from '../components/Footer';

/* 引用通用样式||JS */
import 'antd/dist/antd.less';  //antd样式
import '../static/css/common.less';   //通用样式  包括阿里字体图标的使用
import '../static/font_icon/iconfont'; //引入阿里字体图标 之JS文件
/* 连接redux相关依赖 */
import {connect} from 'react-redux';
import * as userInfoAction from '../actions/userInfoAction.js';

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import CustomSpin from '../components/Spin';
class App extends React.Component{
  render(){
    return(
      
      <LocaleProvider locale={zh_CN}>
          <div>
            {this.props.children}
            <Footer />
            <CustomSpin />
          </div>
      </LocaleProvider>
    )
  }
}

export default App;
/* // 连接到redux  不能在这里连接redux会造成页面路由跳转，但页面确没有任何变化
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
 */