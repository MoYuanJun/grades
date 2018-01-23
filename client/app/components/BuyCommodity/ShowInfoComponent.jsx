/* 单个商品展示  ==> 木偶组显示购买商品信息 */
import React from 'react';
import './style.less';
import { getStrToArray } from  '../../static/js/common';
import ConfirmationOfOrder from '../ConfirmationOfOrder';

import { Radio, InputNumber, Cascader  } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

//级联数据
const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
}];

class ShowInfoComponent extends React.Component{
  constructor(){
    super();
    this.state={
      visible : false,            //监听模态框的显示和隐藏
      size:  undefined,                    //选择的商品尺寸
      color: undefined,                   //选择的商品颜色
      number: 1,                  //购买数量
      city: undefined,                    //购买者当前城市
      address: undefined,                //收货地址
      phone: undefined,                   //联系方式
      paymentMethod:'货到付款'    //付款方式
    }
  }

  //更新设置：state
  changeState(key, value){
    const state = this.state;
    state[key] = value;
    this.setState(state);
    return true;
  }
  
  //初始化函数：
  initialization(stateKey, data){
    let array = getStrToArray(data,';');
    return array;
  }

  //级联 ==> 选择后展示的渲染函数
  displayRender(label) {
    return label[label.length - 1];
  }

  //提模态框提交订单：处理函数
  pushOrder(){
    if( this.state.address && this.state.phone ){
      //提交订单信息到后端：
      console.log('添加订单','跳转到：购买成功提示页面');
    }
  }

  render(){
    const data = this.props.data;
    return (
      <div id='showComInfo'>
        { data ?
          <div className='content clearfix'>
            {/* 左侧 */}
            <div className='float-left con-left'>
              <div className='img'>
                <img src={data.com_img} alt=""/>
              </div>
            </div>

            {/* 中间 */}
            <div className='float-left con-center'>
                <h2>{data.com_title}</h2>
                <div className='price clearfix'>
                  <div className='price-top clearfix'>
                    <div className='row-key float-left'>价格</div>
                    <div className='row-value float-left'>
                        <span className='newPrice'>￥{data.com_newPrice}</span>
                        <span className='oldPrice'>￥{data.com_oldPrice}</span>
                    </div>
                  </div>
                  <div className='price-bottom'>
                    <svg className='icon' aria-hidden='true'><use xlinkHref='#icon-zongxiaoliang'></use></svg>
                    <span>月销量：{data.com_salesVolume}</span>
                    <svg className='icon' aria-hidden='true'><use xlinkHref='#icon-pinglunliang_icon'></use></svg>
                    <span>评论量：{data.com_evaluate}</span>
                  </div>
                </div>

                <div className='row distribution clearfix'>
                  <div className='row-key float-left'>配送</div>
                  <div className='row-value float-left'>{data.com_birthplace}&nbsp;至 &nbsp; 
                  <Cascader options={options} expandTrigger='hover'
                            size='small'
                            placeholder="请选择所在城市！"
                            displayRender={this.displayRender}
                            onChange={(value)=>{this.changeState('city',value)}}/>
                  </div>
                </div>

                <div className='row size clearfix'>
                  <div className='row-key float-left'>尺寸</div>
                  <div className='row-value float-left'>
                    <div>
                        { data.com_size ? 
                        <RadioGroup size='small' name="radiogroup" 
                                    defaultValue={0}
                                    onChange={(e)=>{ this.changeState('size',e.target.value) }}>
                          { this.initialization('size', data.com_size).map((value, index, arr)=>{
                              return <RadioButton value={value} key={index}>{value}</RadioButton>;
                            }) }
                        </RadioGroup>: ''
                        }
                    </div>
                  </div>
                </div>

                <div className='row color clearfix'>
                  <div className='row-key float-left'>颜色</div>
                  <div className='row-value float-left'>
                      <div>
                        { data.com_color ? 
                          <RadioGroup size='small' name='radiogroup'
                                      defaultValue={0} 
                                      onChange={(e)=>{this.changeState('color',e.target.value)}}>
                            { this.initialization('color', data.com_color).map((value, index, arr)=>{
                              return <RadioButton value={value} key={index}>{value}</RadioButton>
                            }) }
                          </RadioGroup> : ''
                        }
                      </div>
                  </div>
                </div>

                <div className='row number clearfix'>
                  <div className='row-key float-left'>数量</div>
                  <div className='row-value float-left'>
                    <div className='float-left num-input'>
                      <InputNumber min={1} max={10}
                                  step={1} defaultValue={1} 
                                onChange={(value)=>{this.changeState('number',value)}} />
                    </div>
                    <div className='float-left num-prompt'>
                      件&nbsp;(库存:{data.com_number}件)
                    </div>
                  </div>
                </div>

                <div className='row buy-btn clearfix'>
                  <div className='buyNow btn float-left'  onClick={()=>{this.changeState('visible', true)}}>
                    <svg className='icon' aria-hidden><use xlinkHref='#icon-yijiangoumai'></use></svg>
                    &nbsp;
                    立即购买
                  </div>
                  <div className='buyAfter btn float-left' onClick={()=>{console.log('立即购买')}}>
                    <svg className='icon' aria-hidden><use xlinkHref='#icon-navigoumai'></use></svg>
                    &nbsp;
                    加入购物车
                  </div>
                </div>
                <br/><br/><br/><br/>
                <div>{console.log('监听：this.state发生改变',this.state)}</div>
            </div>

            {/* 右侧 */}
            <div className='float-right con-right'>
              木偶组件 商品展示
            </div>
          </div> : ''
        }
        <ConfirmationOfOrder visible={this.state.visible} 
                             pushOrder={this.pushOrder.bind(this)}
                             changeState = {this.changeState.bind(this)}
         />
      </div>
    );
  }

  componentDidMount(){
    //console.log(getStrToArray('ab;bc;cd;',';'));
  }
}

export default ShowInfoComponent;

