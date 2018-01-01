/* 路由组件  这里引入所有页面 再按父模板进行展示所有页面 根据不同路由统计管理页面 */
import React from 'react'; //react基本依赖
import {BrowserRouter,Route,Switch,browserHistory} from 'react-router-dom';//router依赖 实际上只要这一个组件就可以了
/* 引入自定义组件 */
import App from '../containers/App'; //父模板
import Home from '../containers/Home';//首页
import Login from '../containers/Login';//登录页
import NotFound from '../containers/NotFound';//找不到页面时显示


class RouterMap extends React.Component{
  render(){
    return (
      //BrowserRouter理解为路由器
      <BrowserRouter> 
        <App> {/* 所有页面外层：父模板 */}
          <Switch>{/* 根据路由 按所有路由(Route)从上到下依次匹配路由，有且只匹配一个 */}
            <Route path='/' component={Home} exact /> {/* 路由，path表示匹配路由(理解为正则) exact表示严格匹配 没有exact默认按照模糊匹配那么所有路由都会先被匹配到 那么自然就没必要向下匹配来了 */}
            <Route path='/login' component={Login} />
            <Route path='/*' component={NotFound} />
          </Switch>
        </App>
      </BrowserRouter>
    )
  }
}
export default RouterMap;