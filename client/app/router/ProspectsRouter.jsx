/* 客户端 路由配置  管理 */
import { Route } from 'react-router-dom';
import React from 'react';  //必须 配合使用
import Login from '../containers/Login/index';
import Search from '../containers/Prospects/Search';
import Commodity from '../containers/Prospects/Commodity';

import ProspectsHome from '../containers/Prospects/Home';
/* 嵌套路由设置 :根路由为 /prospects */
const ProspectsRouter = ({ match }) => (
  <div>
    <Route path={`${match.url}/home`} component={ProspectsHome}/>
    <Route path={`${match.url}/search/:searchText`} component={Search} />{/* this.props.match.params.searchText */}
    <Route path={`${match.url}/commodity/:comId`} component={ Commodity } />{/* this.props.match.params.comId */}
  </div>
) 
export default ProspectsRouter;