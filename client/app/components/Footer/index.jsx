/* 页脚 */
import React from 'react';
import './style.less';

class Footer extends React.Component{
  render(){
    return (
      <div id='footer'>
        <div className="head">
          <div className="content">
            <ul className="clearfix">
              <li className="float-left">
                <a href="###">
                  <svg className="icon" aria-hidden="true">
                      <use xlinkHref="#icon-QQ"></use>
                  </svg>
                </a>
              </li>
              <li className="float-left">
                <a href="###">
                  <svg className="icon" aria-hidden="true">
                      <use xlinkHref="#icon-weibo"></use>
                  </svg>
                </a>
              </li>
              <li className="float-left">
                <a href="###">
                  <svg className="icon" aria-hidden="true">
                      <use xlinkHref="#icon-weixin"></use>
                  </svg>
                </a>
              </li>
              <li className="float-left">
                <a href="###">
                  <svg className="icon" aria-hidden="true">
                      <use xlinkHref="#icon-facebook"></use>
                  </svg>
                </a>
              </li>
            </ul>
            <p>用我的品位聘你时尚，用我的高端聘你独立，你的私人顾问，我倾心！</p>
          </div>
        </div>
        <div className="foot">
          <div className="content">
            互联网出版许可证编号新出网证(京)字150号&nbsp;|&nbsp;出版物经营许可证&nbsp;|&nbsp;网络文化经营许可证京网文[2014]2148-348号&nbsp;|&nbsp;违法和不良信息举报电话：4006561155
            <br/>Copyright © 2004 - 2018  jpsz.com 版权所有&nbsp;|&nbsp;消费者维权热线：4006067733经营证照
          </div>
        </div>
      </div>
    );
  }
}
export default Footer;

