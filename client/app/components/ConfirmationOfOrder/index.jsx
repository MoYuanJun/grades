/* 木偶组件 ： 确认订单 ==> 模态框  ConfirmationOfOrder extends React.Component*/
import React from 'react';
import './style.less';
import { changeState } from '../../static/js/common';
import { Modal, Button, Input,Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class ConfirmationOfOrder extends React.Component {
    constructor(){
        super();
        this.state = {
            isPrompt : false,
            prompt : '',
            address : undefined,
            phone : undefined,
            paymentMethod : '货到付款'
        }
    }
    /* 确定按钮触发函数 */
    handleOk = (e) => {
        //console.log(e,'确认订单');
        console.log(1);
        if(!this.isPrompt()) {
            this.props.changeState(
                ['address','phone','paymentMethod'],
                [this.state.address,this.state.phone,this.state.paymentMethod])
                console.log(2);
            this.props.pushOrder();
        }else{
            return false;
        }
        
    }
    /* 取消按钮触发函数 */
    handleCancel = (e) => {
      console.log(e,'取消订单');
      this.props.changeState('visible',false);
    }
    //是否显示提示：没有正确填写信息
    isPrompt(){
        if(this.state.address && this.state.phone){
            return false;
        }else{
            changeState(this,['isPrompt','prompt'],[true,'注意：请填写您的地址和联系方式！']);
            return true;
        }
    }
    render() {
        /* 图标管理 */
        const icon_genggaishouhuodizhi = <svg className='icon' aria-hidden='true'>
                                            <use xlinkHref='#icon-genggaishouhuodizhi'></use>
                                         </svg>;
        const icon_lianxifangshi = <svg className='icon' aria-hidden='true'>
                                        <use xlinkHref='#icon-lianxifangshi'></use>
                                   </svg>;
        const icon_tianmaohuodaofukuan  = <svg className='icon' aria-hidden='true'>
                                    <use xlinkHref='#icon-tianmaohuodaofukuan'></use>
                                </svg>;
        const icon_zhifu01 = <svg className='icon' aria-hidden='true'>
                                    <use xlinkHref='#icon-zhifu01'></use>
                                  </svg>
      return (
          <Modal
            title="订单确认"
            okText='提交订单'
            cancelText='取消'
            visible={this.props.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <div id='ConfirmationOfOrder'>
                <p className='prompt'>{this.state.prompt}</p>
                <div className='receivingAddress'>
                    <div className='key'>收货地址：</div>
                    <div className='value'>
                    <Input prefix={icon_genggaishouhuodizhi} 
                          onChange={(e)=>{
                              changeState(this,'address', e.target.value);
                          }} />
                    </div>
                </div>
                <div  className='cellPhoneNumbe'>
                    <div className='key'>联系方式：</div>
                    <div className='value'>
                    <Input prefix={ icon_lianxifangshi } 
                           onChange={(e)=>{
                               changeState(this,'phone', e.target.value);
                            }} />
                    </div>
                </div>
                <div className='paymentMethod'>
                    <div className='key'>付款方式：</div>
                    <div className='value'>
                        <RadioGroup defaultValue="货到付款" 
                                    onChange={(e)=>{
                                        changeState(this,'paymentMethod', e.target.value);
                                    }}>
                            <RadioButton value="货到付款">{icon_tianmaohuodaofukuan}&nbsp;货到付款</RadioButton>
                            <RadioButton value="在线支付">{icon_zhifu01}&nbsp;在线支付</RadioButton>
                        </RadioGroup>
                    </div>
                </div>
            </div>
          </Modal>
      );
    }
}
export default ConfirmationOfOrder;
