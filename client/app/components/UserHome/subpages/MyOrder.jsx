/* 子木偶组件 ==> 我的订单 */
import React from 'react';
import { Tabs } from 'antd';
import OrderListComponent from '../../OrderList';

const TabPane = Tabs.TabPane;

class MyOrderComponent extends React.Component{

    callback(key){
        console.log(key);
    }
    //获取订单列表选中项并添加到 this.state.sal_id ==> 传给木偶子组件
    getCheckList = (checkList) => {
        const filteCheckList = [];
        for(let key in checkList) {
            checkList[key] ? filteCheckList.push(key) : '';
        }
        this.setState({sal_id: filteCheckList});
    }
    render(){
        return (
            <div>
                {console.log('%c我的订单数据', 'background: red', this.props.data)}
                {console.log('%c监听this.state', 'background: blue', this.state)}
                <Tabs defaultActiveKey='1' onChange={this.callback}>
                    <TabPane tab='全部订单 1' key='1'>
                        <OrderListComponent data={this.props.data}
                                            getCheckList={this.getCheckList} 
                                            operationLabel="购买"
                                            operationIcon="#icon-goumai"/>
                    </TabPane>
                    <TabPane tab='待发货 2' key='2'>
                        <OrderListComponent data={this.props.data}
                                            getCheckList={this.getCheckList}
                                            operationLabel="购买"
                                            operationIcon="#icon-goumai" />
                    </TabPane>
                    <TabPane tab='代收货 3' key='3'>
                        <OrderListComponent data={this.props.data}
                                            getCheckList={this.getCheckList}
                                            operationLabel="购买"
                                            operationIcon="#icon-goumai" />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default MyOrderComponent;