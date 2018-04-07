/* 客户端首页智能组件 Home */
import React from 'react';
import { Link } from 'react-router-dom';
/* 引入自定义组件：首页智能组件 */
import Header from './subpage/Header';  //导航头 子智能组件
import SwiperAndUser from './subpage/SwiperAndUser'; //swiper和user信息 子智能组件
import List from './subpage/List';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getUserOrderDataAction } from '../../../actions/orderDataAction';
import { switchSpinState } from '../../../actions/commonGlobal';
import { getSalesRecord } from '../../../fetch';

class ProspectsHome extends React.Component{
  render(){
    return (
      <div>
        <Header history={this.props.history} />
        <SwiperAndUser />
        <List />
      </div>
    )
  }

  

  componentDidMount(){
    
  }
}
//连接 redux
function mapStateToProps(state){
  return {
    userInfo: state.userInfo,
    orderData: state.orderData
  }
} 
function mapDispatchToProps(dispatch){
  return {
    switchSpinState: bindActionCreators(switchSpinState, dispatch),
    getUserOrderDataAction: bindActionCreators(getUserOrderDataAction, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProspectsHome);
