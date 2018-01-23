/* 购买商品页面 ==> 显示商品智能组件 */
import React from 'react';
import { getCommodityInfo } from '../../../../fetch';
import BuyCommodityComponent from '../../../../components/BuyCommodity/ShowInfoComponent';

class ShowInfo extends React.Component{
  constructor(){
    super();
    this.state={}
  }
  
  render(){
    return (
      <div>
        <BuyCommodityComponent data={this.state.data} history={this.props.history} />
      </div>
    );
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

  //组件加载后自动执行  ==> 获取数据
  componentDidMount(){
    getCommodityInfo(this.props.comId).then(res=>res.json()).then(json=>{
      this.setNewState('data', json);
    });
  }
  
}
export default ShowInfo;