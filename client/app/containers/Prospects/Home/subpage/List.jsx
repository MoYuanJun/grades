/* 客户端：智能组件List */
import React from 'react';
import './style.less';
import ListComponent from '../../../../components/List';
import { getCommodityList } from '.././../../../fetch/index';


class List extends React.Component{
  constructor(){
    super();
    this.state = {}
  }
  render(){
    return (
      <div id="List">
        <div>
          <ListComponent data = {this.state} />
        </div>
      </div>
    );
  }
  componentDidMount(){
    getCommodityList('?size=10&orderBy=com_time&orderByType=desc').then(res=>res.json()).then((json)=>{
      json.title = '最新上架';
      this.setState(Object.assign(this.state, { newestList : json }));
    });
    getCommodityList('?size=10&orderBy=com_salesVolume&orderByType=desc').then(res=>res.json()).then((json)=>{
      json.title = '热销';
      this.setState(Object.assign(this.state,{ hotSelltList : json }));
    });
    getCommodityList('?size=10&orderBy=com_collect&orderByType=desc').then(res=>res.json()).then((json)=>{
      json.title = '热门收藏';
      this.setState(Object.assign(this.state,{ hotCollectList: json }));
    });
  }
}
export default List;

