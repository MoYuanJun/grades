/* 客户端List 主木偶组件 */
import React from 'react';

import ListComponentSubpage from './subpage';

class ListComponent extends React.Component{
  //匹配路由，根据不同路由进行展示
  matchHash(){
    if (location.hash.indexOf('/prospects/search') !== -1){
      return 1;
    } else {
      return 0;
    }
  }


  render(){
    const data = this.props.data;
    return (
      <div>
        {
          this.matchHash() === 0 ?  
          <div>{/* 展示首页 */}
            <ListComponentSubpage data = {data.newestList} /> {/* 最新上架 */}
            <ListComponentSubpage data = {data.hotSelltList} />{/* 热销 */}
            <ListComponentSubpage data = {data.hotCollectList} />{/* 热门收藏 */}
          </div>: 
          <div>{/* 展示搜索页 */}
            111111
          </div>
          }
        
      </div>
      
    );
  }
}
export default ListComponent;
