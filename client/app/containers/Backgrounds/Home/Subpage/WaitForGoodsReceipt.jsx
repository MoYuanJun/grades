/* 智能组件 后台-发货 */
import React from 'react';
import './style.less';

import OrderListComponent from '../../../../components/OrderList';

//获取封装的fetch方法：添加（插入）商品数据、获取订单数据
import { updateSalesRecordState, getSalesRecord } from '../../../../fetch';

class SendTheGoods extends React.Component{
    render(){
        return (
            <div id="OrderListComponent">
                <h2>待收货</h2>
                <OrderListComponent 
                data={this.props.orderData}
                operationLabel="已收货"
                operationFunc={this.operationFun} />
            </div>
        );
    }
    //操作按钮处理函数，参数：选中状态、状态值、回调函数
    operationFun=(checkList, state, callback=()=>{'未设置回调函数'})=>{
        const { getAdminOrderDataAction, orderData } = this.props;
        //过滤出当前选中的订单
        const filteCheckList = [];
        for(let key in checkList) {
            checkList[key] ? filteCheckList.push(key) : '';
        }
        //判断当前订单是否满足后台强制收货的条件（发货时间超过15天）
        let isGoodsReceipt = false;  //存储记录状态（是否允许收货）
        for(let i = 0 ; i<filteCheckList.length; i++){
            for(let key in orderData){
                new Date().getTime() - orderData[key].shipments_time > 24*60*60*1000*15 ? isGoodsReceipt=true : '';
            }
        }

        this.setState({sal_id: filteCheckList}, () => {
            const params = {
                state: '4',  //修改订单状态
                orderInfo: {},  //修改其他参数 主要作用：移除订单
                sal_id: this.state.sal_id  //需要修改的订单（订单号）
            };
            if(state !== '0' && isGoodsReceipt){
                updateSalesRecordState(params).then(res=>res.text()).then(text=>{
                    if(text !== '0'){ //影响行数不为0，则表示修改成功
                        //重新获取后端订单数据，更新redux，执行回调函数  
                        getSalesRecord().then(res=>res.json()).then(json=>{
                            this.props.getAdminOrderDataAction(json.content);
                            callback();
                        });
                    }
                });
            }else{ //不满足修改条件：执行回调函数==>目的是为了取消选中状态
                callback();
                alert('这里应该有个提示！！未满足强制收货条件');
            }
        });
    }
}
export default SendTheGoods;


