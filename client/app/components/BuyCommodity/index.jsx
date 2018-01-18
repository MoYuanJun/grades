/* 单个商品展示  ==> 木偶组件 */
import React from 'react';
import Subpage from './subpage';

class BuyCommodityComponent extends React.Component{
  render(){
    return (
      <div>
          木偶组件 商品展示
          <Subpage />
          {console.log(this.props.data)}
      </div>
    );
  }
}

export default BuyCommodityComponent;
