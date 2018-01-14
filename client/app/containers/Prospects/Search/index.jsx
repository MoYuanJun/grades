/* 搜索页面  智能组件主页 路由： */
import React from 'react';

import { searchCommodity } from '../../../fetch/index';

import List from '../../../components/Prospects/Home/List/index';


class Search extends React.Component{
  render(){
    return (
      <div>
        <List data={111} />
      </div>
    );
  }
  componentDidMount(){
    console.log(location);
    searchCommodity({
      searchText: '自行车',   //搜索词条
      startIndex: 0,         //开始条数
      dataNumber: 5,          //获取n条数据
      orderBy:'com_time',     //按照什么进行排序?
      orderType:'asc'         //降序desc || 升序asc 
    }).then(res=>res.json()).then(json=>{
      console.log(json);
    });
  }
}

export default Search;
