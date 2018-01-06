/* 客户端首页智能组件 */
import React from 'react';
import { Link } from 'react-router-dom';
class ProspectsHome extends React.Component{
  render(){
    return (
      <div>
        客户端首页
        <p><Link to='/login'>登录</Link></p>
        <p><Link to='/prospects/home'>客户端</Link></p>
        <p><Link to='/backgrounds/home'>前台</Link></p>
      </div>
    )
  }
}
export default ProspectsHome;