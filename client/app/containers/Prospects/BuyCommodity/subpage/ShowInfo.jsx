/* 购买商品页面 ==> 显示商品智能组件 */
import React from 'react';

import { Link } from 'react-router-dom';

import { Modal } from 'antd';
import BuyCommodityComponent from '../../../../components/BuyCommodity/BuyCommodityComponent';

import { getCommodityInfo } from '../../../../fetch';
import { addSalesRecord, getSalesRecord } from '../../../../fetch';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserOrderDataAction } from '../../../../actions/orderDataAction';
import { switchSpinState } from '../../../../actions/commonGlobal';

class ShowInfo extends React.Component{
  constructor(){
    super();
    this.state={}
  }

  //@param { string } state 状态  1:直接添加到购物车  || 2：直接下单购买 
  userAddSalesRecordSuccess = (state) => {
    const { userInfo, history } = this.props;
    let ref = Modal.success({
      title: `${state === '1' ? '添加购物车' : '购买' }成功！`,
      content: <p>是否<a onClick={()=>{
        history.go(-1);
        ref.destroy();
      }}>返回</a>，或者跳转至
      {state === '1' ? 
      <a onClick={()=>{ 
        history.push(`/prospects/userHome/${userInfo.u_id}/2`);
        ref.destroy();
       }}>购物车</a> : 
      <a onClick={()=>{ 
        history.push('/');
       }}>首页</a>}
      ！</p>
    });
  }

  //用户添加销售记录
  //@param { object } obj 插入数据库订单参数
  //@param { object } state 当然状态  1:直接添加到购物车  || 2：直接下单购买  
  userAddSalesRecord(obj, state){
    const { switchSpinState, getUserOrderDataAction } = this.props;
    obj.com_id = this.props.comId //添加商品ID
    //通过订单状态处理数据 ==> 状态1，表示只是添加到购物车，状态为2，则表示用户直接下单咯
    obj.state = state;
    const timestamp=new Date().getTime();//获取当前时间戳
    if(state === '1'){
      //用户将商品添加到购物车 则设置cart_time记录用户添加购物车时间戳
      obj.cart_time = timestamp; 
    }else if(state === '2'){
      //用户直接购买商品，则设置buy_time记录用户购买商品时间
      obj.buy_time = timestamp;
    };
    //加载中状态
    switchSpinState();
    //将数据插入数据库 ==> 成功则进行业务处理 ==> 重新获取订单数据 ==> 更新redux ==> 进行友好的提示
    addSalesRecord(obj).then(res=>res.text()).then(text=>{
      if(text === '200'){
        //插入数据成功 重新从数据库获取当前用户的订单数据
        getSalesRecord({u_id: obj.u_id}).then(res=>res.json()).then(json=>{
          if( json.error === '200' ){
            //获取数据成功 ==> 更新redux
            getUserOrderDataAction(json.content);
            console.log('%c更新当前用户订单数据成功！', 'color: green', json);
          }
          switchSpinState();  //切换加载中状态
          this.userAddSalesRecordSuccess(state);  //弹出会话框
        });
      }else if (text === '404'){
        //错误处理
      }
    });
  }

  render(){
    return (
      <div>
        <BuyCommodityComponent data={this.state.data} 
                               history={this.props.history} 
                               addSalesRecord = {this.userAddSalesRecord.bind(this)} />
      </div>
    );
  }

  //加载数据
  loadData = (comId) => {
    const { switchSpinState } = this.props;
    switchSpinState();
    getCommodityInfo(comId).then(res=>res.json()).then(json=>{
      this.setState({data:json});
      switchSpinState();
    });
  }

  //组件加载后自动执行  ==> 获取数据
  componentDidMount(){
    this.loadData(this.props.comId);
  }

  //将要更新 Props时触发
  componentWillReceiveProps(nextProps){
    this.loadData(nextProps.comId);
  }
  
}

//redux
function mapSatateToProps(state){return {
  userInfo: state.userInfo
};}
function mapDispatchToProps(dispatch){
  return {
    switchSpinState: bindActionCreators(switchSpinState, dispatch),
    getUserOrderDataAction: bindActionCreators(getUserOrderDataAction, dispatch)
  }
}

export default connect(
  mapSatateToProps,
  mapDispatchToProps
)(ShowInfo);


