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

    //获取订单列表选中项并添加到 this.state.sal_id ==> 传给木偶子组件
    getCheckList = (checkList) => {
        const filteCheckList = [];
        for(let key in checkList) {
            checkList[key] ? filteCheckList.push(key) : '';
        }
        this.setState({sal_id: filteCheckList});
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
        this.props.updateSalesRecordState(params);
        this.props.history.push('/');
        console.log('点击提交订单', params);
    }

    /* 点击按钮执行 */
    operationFunc = () =>{
        this.setState({visible:true });
    }

    render(){
        return (
            <div id='MyShoppingCart'>
                <h2>购物车</h2>
                <OrderListComponent data={this.props.data} /* 列表木偶组件 */
                                    getCheckList={this.getCheckList}
                                    operationLabel="购买"
                                    operationIcon="#icon-goumai"
                                    operationFunc={this.operationFunc}/>
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







