/* 客户端List 主木偶组件 */
import React from 'react';

import ListComponentSubpage from './subpage';

class ListComponent extends React.Component{
  render(){
    return (
      <div>
        <ListComponentSubpage data = {this.props.data}/>
      </div>
    );
  }
}
export default ListComponent;