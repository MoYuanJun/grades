/* 个人中心 购物车木偶组件 */
import React from 'react';
import './style.less';
import ConfirmationOfOrder from '../../ConfirmationOfOrder';
import OrderListComponent from '../../OrderList';
class MyShoppingCart extends React.Component{
    constructor(){
        super();
        this.state = {
            visible: true
        }
    }
    pushOrder(){
        console.log('点击提交订单');
    }

    render(){
        const  childrenNodeDom = <div><svg className='icon' aria-hidden='true'> <use xlinkHref='#icon-goumai'></use></svg>购买;</div>;
        return (
            <div id='MyShoppingCart'>
                <h2>购物车</h2>
                <div className='header'>
                    <ul className='clearfix'>
                        <li className='float-left li_1'>商品信息</li>
                        <li className='float-left li_2'>单价</li>
                        <li className='float-left li_3'>数量</li>
                        <li className='float-left li_4'>金额</li>
                        <li className='float-left li_5'>操作</li>
                    </ul>
                </div>
                <OrderListComponent data={this.props.data} 
                                    childrenNodeDom={childrenNodeDom}/>
                <div className='footer clearfix'>
                    <div className='float-left foot-left'></div>
                    <div className='float-right foot-right'></div>
                </div>
                <ConfirmationOfOrder visible={this.state.visible}
                                     changeParentState={this.setState.bind(this)}
                                     pushOrder={this.pushOrder.bind(this)}
                />
            </div>
        );
    }
}
export default MyShoppingCart;









