/* 购买商品页面 ==> 显示商品智能组件 */
import React from 'react';
import { getCommodityInfo } from '../../../../fetch';
import BuyCommodityComponent from '../../../../components/BuyCommodity/BuyCommodityComponent';
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

  //用户添加销售记录
  //@param { object } obj 插入数据库订单参数
  //@param { object } state 当然状态  1:直接添加到购物车  || 2：直接下单购买  
  userAddSalesRecord(obj, state){
    const { switchSpinState } = this.props;
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

        //插入数据成功 重新获取当前用户的订单数据
        getSalesRecord({u_id: obj.u_id}).then(res=>res.json()).then(json=>{
          console.log('%c更新当前用户订单数据成功！', 'color: green', json);
          switchSpinState();
          this.props.history.push(`/prospects/userHome/${obj.u_id}/2`);
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
function mapSatateToProps(state){return {};}
function mapDispatchToProps(dispatch){
  return {
    switchSpinState: bindActionCreators(switchSpinState, dispatch),

  }
}

export default connect(
  mapSatateToProps,
  mapDispatchToProps
)(ShowInfo);


//弹窗：订单提交 || 加入购物车成功后弹窗进行提示，用户可选择返回获取跳转到首页！
class asdsa extends React.Component{
  render(){
    return (
      <div>

      </div>
    );
  }
}