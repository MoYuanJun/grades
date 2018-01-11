/* 客户端首页智能组件 Home */
import React from 'react';
import { Link } from 'react-router-dom';

/* 引入自定义组件：首页智能组件 */
import Header from './subpage/Header';  //导航头 子智能组件
import SwiperAndUser from './subpage/SwiperAndUser'; //swiper和user信息 子智能组件
import List from './subpage/List';
class ProspectsHome extends React.Component{
  render(){
    return (
      <div>
        <Header />
        <SwiperAndUser />
        <List />

        <p>====================================== 分割线 ====================================</p>
        <h2>客户端首页</h2>
        <p><Link to='/login'>登录</Link></p>
        <p><Link to='/prospects/home'>客户端</Link></p>
        <p><Link to='/backgrounds/home'>前台</Link></p>
      </div>
    )
  }
}
export default ProspectsHome;