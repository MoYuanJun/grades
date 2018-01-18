/* 单个商品页 ==> 智能组件 */
import React from 'react';

import { getCommodityInfo } from '../../../fetch';
import CommodityComponent from '../../../components/Prospects/Commodity';
import Header from './subpage/Header';


class Commodity extends React.Component{
  constructor(){
    super();
    this.state={}
  }


  /**
   * 设置更新state函数
   * @param {string} key    键
   * @param {任意数据} value 值 
   */
  setNewState(key,value){
    let state = this.state;
    state[key] = value;
    this.setState(state);
  }

  render(){
    return (
      <div>
        <Header history={this.props.history} />
        <CommodityComponent data={this.state.data} />
        单独商品展示
        {this.props.match.params.comId}
      </div>
    );
  }

  /**
   * 组件加载后自动执行  ==> 获取数据
   */
  componentDidMount(){
    getCommodityInfo(this.props.match.params.comId).then(res=>res.json()).then(json=>{
      this.setNewState('data', json);
    });
  }
}

export default Commodity;

