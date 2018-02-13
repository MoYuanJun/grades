/* 个人中心 购物车木偶组件 */
import React from 'react';
import './style.less';
import ConfirmationOfOrder from '../../ConfirmationOfOrder';
import OrderListComponent from '../../OrderList';
class MyShoppingCart extends React.Component{
    constructor(){
        super();
        this.state = {
            visible: false,
            sal_id: []
        }
    }

    
    /**获取订单列表选中项并添加到 this.state.sal_id 同时根据state执行不同操作 ==> 传给木偶子组件
     * @param { Object } checkList {sal_id : boolean, sal_id : boolean, ....}
     * @param { String } state 0表示用户单纯点击多选框，1表示用户点击列表项中的按钮 2表示用户点击底部按钮
     */
    operationFunc = (checkList, state = '0') => {
        const filteCheckList = [];
        for(let key in checkList) {
            checkList[key] ? filteCheckList.push(key) : '';
        }
        this.setState({sal_id: filteCheckList}, () => {
            if(state !== '0'){
                this.setState({visible: true});
            }
        });
    }

    //模态框提交处理函数
    pushOrder(){
        /* {参数格式：
            *  state: xx,
            *  orderInfo: {key:value,key:value},
            *  sal_id: [sal_id,sal_id,sal_id……]
        } */
        const params = {
            state: '2',
            orderInfo: {
                u_address: this.state.u_address,
                u_phone: this.state.u_phone,
                paymentMethod: this.state.paymentMethod
            },
            sal_id: this.state.sal_id
        }
        console.log(params);
        //该方法有个回调函数
        this.props.updateSalesRecordState(params, () => {
            this.props.history.push('/');
        });
    }

    render(){
        return (
            <div id='MyShoppingCart'>
                <h2>购物车</h2>
                <OrderListComponent data={this.props.data} /* 列表木偶组件 */
                                    operationFunc={this.operationFunc}
                                    operationLabel="购买"
                                    operationIcon="#icon-goumai"/>
                <ConfirmationOfOrder visible={this.state.visible} /* 模态框 */
                                     changeParentState={this.setState.bind(this)}
                                     pushOrder={this.pushOrder.bind(this)}
                />
            </div>
        );
    }
    componentDidMount(){
        /* this.props.updateSalesRecordState({}); */
    }
}
export default MyShoppingCart;







