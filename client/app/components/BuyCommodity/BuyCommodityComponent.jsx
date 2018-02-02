/* 单个商品展示  ==> 木偶组显示购买商品信息 */
import React from 'react';
import { connect } from 'react-redux';
import './style.less';
import { changeState } from '../../static/js/common';
import { getStrToArray } from  '../../static/js/common';
import ConfirmationOfOrder from '../ConfirmationOfOrder';
import { Link } from 'react-router-dom';
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

class BuyCommodityComponent extends React.Component{
  constructor(){
    super();
    this.state={
      isCorrectFillIn:true,                 //判断当前内容是否正确填写(商品信息)
      visible : false,                      //监听模态框的显示和隐藏
      com_size:  undefined,                     //选择的商品尺寸
      com_color: undefined,                     //选择的商品颜色
      com_number: 1,                            //购买数量
      u_city: undefined,                      //购买者当前城市
      u_address: undefined,                   //收货地址
      u_phone: undefined,                     //联系方式
      paymentMethod:1                       //付款方式  ： 1表示货到付款 2 表示在线支付
    }
  }

  //点击事件处理器：传入回调函数，点击时需要处理的业务
  clickHandler(state){
    /* 判断用户是否完整填写当前订单信息  */
    if( this.isCorrectFillIn(['u_city','com_size','com_color','com_number'], 'isCorrectFillIn') ){
      if( !this.props.userInfo.u_id ){ /* 判断当前用户是否已经登录 */
        this.props.history.push('/login/login');   //用户没有正确注册则滚回注册
      }else{
        if(state === '1'){
          //用户直接添加到购物车 ==> 提交信息
          this.pushOrder(state);
         } else if(state === '2') {
          //用户直接购买 ==> 显示模态框 ==> 填写信息
           this.setState({'visible': true});
         }
      }
    }
  }

  //判断是否选择了购买信息：尺寸、颜色、数量，并设置给定状态
  //@params {array}    arr 传入需要检测数据=>在this.state的key,判断对应key的值是否都不为空
  //@params { string } key  用来监听该状态的key
  //@return { boolean } 返回布尔值,所有信息都完整填写 返回true否则返回false
  isCorrectFillIn(arr, key){
    for(let i = 0;i<arr.length;i++){
      if(this.state[arr[i]] == null ){
        this.setState({key: false});
        return false;
      }
    }
    this.setState({key: true});
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

  //提模态框提交订单和添加到购物车处理函数  ==> 合并处理
  //@param { string }  state 表示当前订单的状态 1 表示添加到购物车  2 表示直接购买
  pushOrder(state){
    this.setState({'u_id': this.props.userInfo.u_id}, ()=>{
      //执行从智能组件传来的处理函数
      this.props.addSalesRecord(this.state, state);
    });
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
                {/* 监听是否填写了需要购买的商品信息：没有购买就点击提交按钮 则显示提醒 */}
                <div style={this.state.isCorrectFillIn ? {} : {border:'2px solid #FF4400'}}>
                  <div className='row distribution clearfix'>
                    <div className='row-key float-left'>配送</div>
                    <div className='row-value float-left'>{data.com_birthplace}&nbsp;至 &nbsp; 
                    <Cascader options={options} expandTrigger='hover'
                              size='small'
                              placeholder="请选择所在城市！"
                              displayRender={this.displayRender}
                              onChange={(value)=>{this.setState({'u_city':value})}}/>
                    </div>
                  </div>
                  <div className='row size clearfix'>
                    <div className='row-key float-left'>尺寸</div>
                    <div className='row-value float-left'>
                      <div>
                          { data.com_size ? 
                          <RadioGroup size='small' name="radiogroup" 
                                      defaultValue={0}
                                      onChange={(e)=>{ this.setState({'com_size': e.target.value}) }}>
                            { this.initialization('com_size', data.com_size).map((value, index, arr)=>{
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
                                        onChange={(e)=>{this.setState({'com_color': e.target.value})}}>
                              { this.initialization('com_color', data.com_color).map((value, index, arr)=>{
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
                                  onChange={(value)=>{this.setState({'com_number': value})}} />
                      </div>
                      <div className='float-left num-prompt'>
                        件&nbsp;(库存:{data.com_number}件)
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row buy-btn clearfix'>
                  <div className='buyNow btn float-left'  
                       onClick={ this.clickHandler.bind(this, '2') } >
                    <svg className='icon' aria-hidden><use xlinkHref='#icon-yijiangoumai'></use></svg>
                    &nbsp;
                    立即购买
                  </div>
                  <div className='buyAfter btn float-left' 
                       onClick={ this.clickHandler.bind(this, '1') }>
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
                             changeParentState = {this.setState.bind(this)}
         />
         <div>{this.props.userInfo.u_id}</div>
      </div>
    );
  }

  componentDidMount(){
    //console.log(getStrToArray('ab;bc;cd;',';'));
    //console.log(1111111111111,this.props.addSalesRecord);
  }
}

//连接到redux
const mapStateToProps = (state)=>{
  return {
    userInfo:state.userInfo
  };
};
const mapDispatchToProps = () => {
  return {};
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyCommodityComponent);

