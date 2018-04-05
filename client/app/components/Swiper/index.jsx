/* 木偶组件：Swiper */
import React from 'react';
import  './style.less';
import Swiper from './swiper';
import './swiper.min.css';
import { Link } from 'react-router-dom';
class SwiperComponent extends React.Component{
  render(){
    const { data } = this.props;
    return (
      <div id="Swiper">
         <div className="swiper-container">
          <div className="swiper-wrapper">
            
            { data.length > 0 ? 
            data.map((item, index, arr) => {
              return <div key={index} className="swiper-slide">
                <Link to={`/prospects/commodity/${item.com_id}`}><img className="img" src={item.ban_img} alt=""/></Link>
            </div> 
            })
              :
            '' }
          </div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
     
    );
  }
  componentDidMount(){
    const swiper = new Swiper('.swiper-container', {
      /* loop : true, */
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',

      },
      pagination: { //分页器
        el: '.swiper-pagination',
        clickable :true,
      },

      autoplay: { //自动播放
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
      },
      autoplayDisableOnInteraction: false,
      observer:true,//修改swiper自己或子元素时，自动初始化swiper 
      observeParents:false,//修改swiper的父元素时，自动初始化swiper 
      
    });
  }
}
export default SwiperComponent;