/* 后台路由配置 ==> 方便管理 嵌套到主路由配置中 */
import React from 'react';
import { Route } from 'react-router-dom';
/* 导入组件 */
import BackgroundsHome from '../containers/Backgrounds/Home';
//设置后台 嵌套路由 根路由为backgrounds
const BackgroundsRouter = ( { match } ) => (
  <div>
    <Route exact path={`${match.url}/`} component={BackgroundsHome}/>{/* this.props.match.params.key */}
  </div>
);
export default BackgroundsRouter;

