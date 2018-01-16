/* 客户端首页智能组件 Home */
import React from 'react';
import { Link } from 'react-router-dom';

/* 引入自定义组件：首页智能组件 */
import Header from './subpage/Header';  //导航头 子智能组件
import SwiperAndUser from './subpage/SwiperAndUser'; //swiper和user信息 子智能组件
import List from './subpage/List';
import Footer from '../../../components/Footer';

class ProspectsHome extends React.Component{
  render(){
    return (
      <div>
        <Header history={this.props.history} />
        <SwiperAndUser />
        <List />
        <Footer />
      </div>
    )
  }
}
export default ProspectsHome;