/* 子木偶组件 ==> 我的订单 */
import React from 'react';
import { Tabs } from 'antd';
import OrderListComponent from '../../OrderList';
import { getSalesRecord } from '../../../fetch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserOrderDataAction, updataOrderDataAction } from '../../../actions/orderDataAction';
const TabPane = Tabs.TabPane;

class MyOrderComponent extends React.Component{
    constructor(){
        super();
        this.state={
            FullOrderData: [],          //全部订单数据
            PendingDeliveryData: [],    //待发货订单数据
            GoodsReceiptData: [],       //待收货订单数据
            time: 0
        }
    }

    /**【移除订单操作函数】获取订单列表选中项并添加到 this.state.sal_id 同时根据state执行不同操作 ==> 传给木偶子组件
     * @param { Object } checkList {sal_id : boolean, sal_id : boolean, ....}
     * @param { String } state 0表示用户单纯点击多选框，1表示用户点击列表项中的按钮 2表示用户点击底部按钮
     * @param { function } callback 回调函数 可选
     */
    operationFunc_removeOrder = (checkList, state = '0', callback= ()=>{console.log('未指定回调函数')}) => {
        //过滤出当前选中的订单
        const filteCheckList = [];
        for(let key in checkList) {
            checkList[key] ? filteCheckList.push(key) : '';
        }
        this.setState({sal_id: filteCheckList}, () => {
            const params = {
                state: '4',
                orderInfo: {
                    user_delete: '1'
                },
                sal_id: this.state.sal_id
            };
            if(state !== '0'){
                this.props.updateSalesRecordState(params, () => {
                    //重新获取数据，更新至redux
                    getSalesRecord({u_id:this.props.userInfo.u_id}).then(res=>res.json()).then(json=>{
                        this.props.getUserOrderDataAction(json.content);
                        callback();
                    });
                });
            }
        });
    }
    /**【提醒发货操作函数】获取订单列表选中项并添加到 this.state.sal_id 同时根据state执行不同操作 ==> 传给木偶子组件
     * @param { Object } checkList {sal_id : boolean, sal_id : boolean, ....}
     * @param { String } state 0表示用户单纯点击多选框，1表示用户点击列表项中的按钮 2表示用户点击底部按钮
     */
    operationFunc_remindDelivery = (checkList, state = '0', callback= ()=>{console.log('未指定回调函数')}) => {
        //过滤出当前选中的订单
        const filteCheckList = [];
        for(let key in checkList) {
            checkList[key] ? filteCheckList.push(key) : '';
        }
        this.setState({sal_id: filteCheckList}, () => {
            const params = {
                state: '4',
                orderInfo: {
                    user_delete: '1'
                },
                sal_id: this.state.sal_id
            };
            console.log('提醒发货');
            callback();
        });
    }

    /**【确认收货操作函数】获取订单列表选中项并添加到 this.state.sal_id 同时根据state执行不同操作 ==> 传给木偶子组件
     * @param { Object } checkList {sal_id : boolean, sal_id : boolean, ....}
     * @param { String } state 0表示用户单纯点击多选框，1表示用户点击列表项中的按钮 2表示用户点击底部按钮
     */
    operationFunc_confirmReceipt = (checkList, state = '0', callback= ()=>{console.log('未指定回调函数')}) => {
        //过滤出当前选中的订单
        const filteCheckList = [];
        for(let key in checkList) {
            checkList[key] ? filteCheckList.push(key) : '';
        }
        this.setState({sal_id: filteCheckList}, () => {
            const params = {
                state: '4',
                orderInfo: {},
                sal_id: this.state.sal_id
            };
            if(state !== '0'){
                this.props.updateSalesRecordState(params, ()=>{
                    getSalesRecord({u_id:this.props.userInfo.u_id}).then(res=>res.json()).then(json=>{
                        this.props.getUserOrderDataAction(json.content);
                        callback();
                    });
                })
            }
        });
    }

    render(){
        const FullOrderData = this.props.data.length ? this.props.data.filter((item, index, arr) => {
            return item.state === '4' && item.user_delete !== '1';
        }) : [];
        const PendingDeliveryData = this.props.data.length ? this.props.data.filter((item, index, arr) => {
            return item.state === '2';
        }) : [];
        const GoodsReceiptData = this.props.data.length? this.props.data.filter((item, index, arr) => {
            return item.state === '3';
        }) : [];
        return ( 
            <div id='MyOrder'>
                <br/>
                <Tabs defaultActiveKey='1' key={this.state.time} onChange={console.log('')}>
                    <TabPane tab={<div className='tab'>全部订单<span>{FullOrderData.length}</span></div>} key='1'>{/* 已确认收货的：state=4 */}
                        <OrderListComponent 
                                            data={ FullOrderData }
                                            operationLabel="订单移除"
                                            operationIcon="#icon-goumai"
                                            operationFunc={this.operationFunc_removeOrder}/>
                    </TabPane>
                    <TabPane tab={<div className='tab'>待发货<span>{PendingDeliveryData.length}</span></div>} key='2'>{/* 订单已下单，等待发货 state=2 */}
                        <OrderListComponent 
                                            data={ PendingDeliveryData }
                                            operationLabel="提醒发货"
                                            operationIcon="#icon-goumai"
                                            operationFunc={this.operationFunc_remindDelivery}/>
                    </TabPane>
                    <TabPane tab={<div className='tab'>待收货<span>{GoodsReceiptData.length}</span></div>} key='3'>{/* 订单已发货，等待收货 state=3 */}
                        <OrderListComponent 
                                            data={ GoodsReceiptData }
                                            operationLabel="确认收货"
                                            operationIcon="#icon-goumai"
                                            operationFunc={this.operationFunc_confirmReceipt} />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
//连接redux
function mapStateToProps(state){
    return {
        userInfo: state.userInfo,
        orderData: state.orderData
    }
}
function mapDispatchToProps(dispatch){
    return {
        getUserOrderDataAction:bindActionCreators(getUserOrderDataAction, dispatch),
        updataOrderDataAction:bindActionCreators(updataOrderDataAction, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyOrderComponent);


