/* 子智能组件 ==> 客户端 ==> 轮播器：以及user信息展示栏 */
import React from 'react';
import './style.less';
import SwiperComponent from '../../../../components/Swiper';
import UserShowComponent from '../../../../components/UserShow';
class SwiperAndUser extends React.Component{
  render(){
    return (
      <div  id='swiperAndUser'>
        <div className='content clearfix'>
          <div  className='swiper float-left'>
            <SwiperComponent />
          </div>
          <div  className='userShow float-right'>
            <UserShowComponent />
          </div>
        </div>
      </div>
    );
  }
}
export default SwiperAndUser;










