/* 智能组件 后台-发货 */
import React from 'react';
import './style.less';

import OrderListComponent from '../../../../components/OrderList';

import { connect } from 'react-redux';

import {message} from 'antd';

//获取封装的fetch方法：添加（插入）商品数据、获取订单数据
import { updateSalesRecordState, getSalesRecord } from '../../../../fetch';

class SendTheGoods extends React.Component{
    render(){
        const { orderData } = this.props;
        return (
            <div id="OrderListComponent">
                <OrderListComponent 
                    data={orderData}
                    operationLabel="已收货"
                    operationFunc={this.operationFun} 
                    operationIcon="#icon-shouhuo"
                /> 
            </div>
        );
    }
    //操作按钮处理函数，参数：选中状态、状态值、回调函数
    operationFun=(checkList, state, callback=()=>{'未设置回调函数'})=>{
        const { getAdminOrderDataAction, orderData, switchSpinState } = this.props;
        //过滤出当前选中的订单
        const filteCheckList = [];
        for(let key in checkList) {
            checkList[key] ? filteCheckList.push(key) : '';
        }
        //判断当前订单是否满足后台强制收货的条件（发货时间超过15天）
        let isGoodsReceipt = false;  //存储记录状态（是否允许收货）
        for(let i = 0 ; i < filteCheckList.length; i++){
            let testData = {};

            for(let z =0; z<orderData.length; z++){
                console.log('__', 4, filteCheckList[i], orderData[z]);
                if(filteCheckList[i] === orderData[z].sal_id){
                    testData = orderData[z];
                    console.log('___', '3', testData);
                    console.log(new Date().getTime() - testData.shipments_time > 24*60*60*1000*15)
                }
            }
            if( testData && new Date().getTime() - testData.shipments_time > 24*60*60*1000*15){
                isGoodsReceipt=true;
            } else {
                isGoodsReceipt=false;
                break;
            }
        }

        this.setState({sal_id: filteCheckList}, () => {
            const params = {
                state: '4',  //修改订单状态
                orderInfo: {},  //修改其他参数 主要作用：移除订单
                sal_id: this.state.sal_id  //需要修改的订单（订单号）
            };
            if(state !== '0'){
                console.log('__', '2', isGoodsReceipt);
                if(isGoodsReceipt){
                    switchSpinState();
                    updateSalesRecordState(params).then(res=>res.text()).then(text=>{
                        if(text !== '0'){ //影响行数不为0，则表示修改成功
                            //重新获取后端订单数据，更新redux，执行回调函数  
                            getSalesRecord().then(res=>res.json()).then(json=>{
                                this.props.getAdminOrderDataAction(json.content);
                                switchSpinState();
                                message.success('订单操作成功！');
                                callback();
                            });
                        } else {
                            switchSpinState();
                        }
                    });
                }else{
                    callback();
                    message.error('订单操作失败，发货十五天后才允许进行强制收货！');
                }
            }
        });
    }
}

export default SendTheGoods;


