/* 客户端List 主木偶组件 */
import React from 'react';

import ListComponentSubpage from './subpage';
import './style.less';

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
      <div id='List'>
      {console.log(data)}
        {this.matchHash() === 0 ?  
          <div className='content'>{/* 展示首页 */}
            <ListComponentSubpage data = {data.newestList} /> {/* 最新上架 */}
            <ListComponentSubpage data = {data.hotSelltList} />{/* 热销 */}
            <ListComponentSubpage data = {data.hotCollectList} />{/* 热门收藏 */}
          </div>: 
          <div className='content' >{/* 展示搜索页 */}
            <ListComponentSubpage data={data} />
          </div>}
      </div>
    );
  }
}
export default ListComponent;
