/* 智能组件 后台-发货 */
import React from 'react';
import './style.less';

import OrderListComponent from '../../../../components/OrderList';

import { connect } from 'react-redux';

//获取封装的fetch方法：添加（插入）商品数据、获取订单数据
import { updateSalesRecordState, getSalesRecord } from '../../../../fetch';

class SendTheGoods extends React.Component{
    render(){
        const { orderData } = this.props;
        console.log(orderData);
        const data = orderData.filter((item, index, arr)=>{
            if (item.state === '2' ){ return item }
        }); 
        return (
            <div id="OrderListComponent">
                <h2>待发货</h2>
                {data && data.length > 0 ? 
                    <OrderListComponent 
                        data = {data}
                        operationLabel = "已发货"
                        operationFunc = {this.operationFun} /> :
                 ''}
            </div>
        );
    }
    operationFun=(checkList, state, callback)=>{
        const { getAdminOrderDataAction } = this.props;
        //过滤出当前选中的订单
        const filteCheckList = [];
        for(let key in checkList) {
            checkList[key] ? filteCheckList.push(key) : '';
        }
        this.setState({sal_id: filteCheckList}, () => {
            const params = {
                state: '3',
                orderInfo: {},  //主要作用：移除订单
                sal_id: this.state.sal_id
            };
            if(state !== '0'){
                updateSalesRecordState(params).then(res=>res.text()).then(text=>{
                    if(text !== '0'){
                        getSalesRecord().then(res=>res.json()).then(json=>{
                            this.props.getAdminOrderDataAction(json.content);
                            callback();
                        });
                    }
                });
            }
        });
    }
}

/* 连接redux */
function mapStateToProps(state){
    return {
        orderData: state.orderData,
    }
}
function mapDispatchToProps(dispatch){
    return {
        
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SendTheGoods);


