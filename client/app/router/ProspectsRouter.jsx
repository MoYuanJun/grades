/* 客户端 路由配置  管理 */
import { Route } from 'react-router-dom';
import React from 'react';  //必须 配合使用
import Login from '../containers/Login/index';
import Search from '../containers/Prospects/Search';
import BuyCommodity from '../containers/Prospects/BuyCommodity';
import UserHome from '../containers/Prospects/UserHome';
import ProspectsHome from '../containers/Prospects/Home';

/* 嵌套路由设置 :根路由为 /prospects */
const ProspectsRouter = ({ match }) => (
  <div>
    <Route path={`${match.url}/home`} component={ProspectsHome}/>
    <Route path={`${match.url}/search/:searchText`} component={Search} />{/* this.props.match.params.searchText */}
    <Route path={`${match.url}/commodity/:comId`} component={ BuyCommodity } />{/* this.props.match.params.comId */}
    <Route path={`${match.url}/userHome/:uId`} component={UserHome} />{/* this.props.match.params.uId */}
  </div>
) 
export default ProspectsRouter;