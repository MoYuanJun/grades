/* 木偶组件 ： 确认订单填写地址手机号付款方式 ==> 模态框 */
/* 
状态值，控制模态框显示         {visible}
设置父组件的this.state        {changeParentState}
模态框点击确定的触发事件函数    {pushOrder}
*/
import React from 'react';
import './style.less';
import { Modal, Button, Input,Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class ConfirmationOfOrder extends React.Component {
    constructor(){
        super();
        this.state = {
            isPrompt : false,   //是否显示提示 ：对填写内容进行检测、错误提示状态
            prompt : '',            //提示语 
            u_address : undefined,    //地址
            u_phone : undefined,      //电话
            paymentMethod : 1       //付款方式   1 货到付款   2  在线支付
        }
    }
    /* 确定按钮触发函数 */
    handleOk = (e) => {
        //console.log(e,'确认订单');
        console.log(1);
        if(!this.isPrompt()) {
            this.props.changeParentState(
                {
                    'u_address': this.state.u_address,
                    'u_phone': this.state.u_phone,
                    'paymentMethod': this.state.paymentMethod
                })
                
            this.props.pushOrder();  //提交订单函数
        }else{
            return false;
        }
    }
    /* 取消按钮触发函数 */
    handleCancel = (e) => {
      this.props.changeParentState({'visible': false});
    }
    //是否显示提示：没有正确填写信息
    isPrompt(){
        if(this.state.u_address && this.state.u_phone){
            return false;
        }else{
            this.setState({'isPrompt': true, 'prompt': '注意：请填写您的地址和联系方式！'});
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
                              this.setState({'u_address': e.target.value});
                          }} />
                    </div>
                </div>
                <div  className='cellPhoneNumbe'>
                    <div className='key'>联系方式：</div>
                    <div className='value'>
                    <Input prefix={ icon_lianxifangshi } 
                           onChange={(e)=>{
                               this.setState({'u_phone': e.target.value});
                            }} />
                    </div>
                </div>
                <div className='paymentMethod'>
                    <div className='key'>付款方式：</div>
                    <div className='value'>
                        <RadioGroup defaultValue={1} 
                                    onChange={(e)=>{
                                        this.setState({'paymentMethod': e.target.value});
                                    }}>
                            <RadioButton value={1}>{icon_tianmaohuodaofukuan}&nbsp;货到付款</RadioButton>
                            <RadioButton value={2}>{icon_zhifu01}&nbsp;在线支付</RadioButton>
                        </RadioGroup>
                    </div>
                </div>
            </div>
          </Modal>
      );
    }
}
export default ConfirmationOfOrder;
