/* 单个商品购买页 ==> 智能组件 */
import React from 'react';
import Header from './subpage/Header';
import ShowInfo from './subpage/ShowInfo';

class BuyCommodity extends React.Component{
  render(){
    return (
      <div>
        <Header history={this.props.history} />
        <ShowInfo comId={this.props.match.params.comId} history={this.props.history} />
        {this.props.match.params.comId}
      </div>
    );
  }
}
export default BuyCommodity;

