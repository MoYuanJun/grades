/* 木偶组件：Swiper */
import React from 'react';
import './style.less';
import './swiper.min.js';
import './swiper.min.less';
class SwiperComponent extends React.Component{
  render(){
    return (
      <div id='swiper'>
          <div className="swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide blue-slide">slider1</div>
                <div className="swiper-slide red-slide">slider2</div>
                <div className="swiper-slide orange-slide">slider3</div>
              </div>
              <div className="swiper-pagination"></div>
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
          </div>
      </div>
    );
  }
  componentDidMount(){
      const mySwiper = new Swiper('.swiper-container',{
      loop: true,
      autoplayDisableOnInteraction:false,
      autoplay: 3000,
      pagination : '.swiper-pagination',
      paginationClickable:true,
      prevButton:'.swiper-button-prev',
      nextButton:'.swiper-button-next'	
    });
  }
}
export default SwiperComponent;