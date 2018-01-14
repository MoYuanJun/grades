/* 客户端List 主木偶组件 */
import React from 'react';

import ListComponentSubpage from './subpage';

class ListComponent extends React.Component{
  render(){
    const data = this.props.data;
    return (
      <div>
        <ListComponentSubpage data = {data.newestList} /> {/* 最新上架 */}
        <ListComponentSubpage data = {data.hotSelltList} />{/* 热销 */}
        <ListComponentSubpage data = {data.hotCollectList} />{/* 热门收藏 */}
      </div>
    );
  }
}
export default ListComponent;