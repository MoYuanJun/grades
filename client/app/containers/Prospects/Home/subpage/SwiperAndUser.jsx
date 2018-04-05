/* 子智能组件 ==> 客户端 ==> 轮播器：以及user信息展示栏 */
import React from 'react';
import './style.less';
import SwiperComponent from '../../../../components/Swiper';
import UserShowComponent from '../../../../components/UserShow';
import { selectData } from '../../../../fetch';

class SwiperAndUser extends React.Component{
  state = {
    bannerData: []
  }
  //查询数据
  selectBannerData = () => {
    const request = {
      tableName: 'banner',
      orderBy: {column:'ban_time', type: 'DESC'}
    };
    selectData({request}).then(res=>res.json()).then(json=>{
      if(json.error === '1'){
          this.setState({
              bannerData: json.content, 
          });
      }
    });
  }
  componentWillMount(){
    this.selectBannerData();
  }
  render(){
    return (
      <div  id='swiperAndUser'>
        <div className='content clearfix'>
          <div  className='swiper float-left'>
            <SwiperComponent data={this.state.bannerData} />
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

