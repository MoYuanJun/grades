/* 智能组件 后台-发货 */
import React from 'react';
import './style.less';
import { Modal, Input } from 'antd';

import OrderListComponent from '../../../../components/OrderList';
import { getAdminOrderDataAction } from '../../../../actions/orderDataAction';
import { switchSpinState } from '../../../../actions/commonGlobal';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//获取封装的fetch方法：添加（插入）商品数据、获取订单数据
import { updateSalesRecordState, getSalesRecord } from '../../../../fetch';
class SendTheGoods extends React.Component{
    state={
        sal_id: [],         //从订单展示列表传来的数据，当前选中的订单单号数组
        handleOk: ()=>{},   //填写快递模态框 => 确认事件函数
        visible: false,   //填写快递模态框 控制参数
        expressType: '',//填写快递模态框 => 返回的参数：快递类型
        expressNo:''//填写快递模态框 ==> 返回的参数：快递单号
    }
    render(){
        const { orderData } = this.props;
        const { handleOk, visible, expressType, expressNo } = this.state;
        return (
            <div id="OrderListComponent">
                {/* <div className="shuaxin">
                    <a onClick={() => {
                    }}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-shuaxin"></use>
                        </svg>
                    </a>
                </div> */}
                <OrderListComponent 
                    operationIcon='#icon-iconddfh'
                    data = {orderData}
                    operationLabel = "已发货"
                    operationFunc = {this.operationFun} />
                <Modal
                    title="Basic Modal"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={this.onCancelHandler}
                    >
                    <Input 
                        value={expressType}
                        onChange={(e)=>{
                        this.setState({expressType: e.target.value});
                        }} 
                    />
                    <Input 
                        value={expressNo}
                        onChange={(e)=>{
                            this.setState({expressNo: e.target.value});
                        }}
                    />
                </Modal>
                {console.log('___查看当前组件state___', this.state)}
            </div>
        );
    }
    //模态框取消事件函数
    onCancelHandler = () => {
        this.setState({
            sal_id: [],  
            handleOk: ()=>{},   
            visible: false,   
            /*expressType: '',  快递类型可能都一样，所有其实没必要初始化 */
            expressNo:''
        });
    }
    operationFun=(checkList, state, callback)=>{
        const { getAdminOrderDataAction, switchSpinState } = this.props;
        //过滤出当前选中的订单
        const filteCheckList = [];
        for(let key in checkList) {
            checkList[key] ? filteCheckList.push(key) : '';
        }
        this.setState({sal_id: filteCheckList}, () => {
            const params = {
                state: '3',
                orderInfo: {},  //该参数主要作用：移除订单；在这里不进行设置
                sal_id: this.state.sal_id
            };
            if(state !== '0'){
                //不等于0才处理
                this.setState({visible: true});
                /* switchSpinState();
                updateSalesRecordState(params).then(res=>res.text()).then(text=>{
                    if(text !== '0'){
                        getSalesRecord().then(res=>res.json()).then(json=>{
                            switchSpinState();
                            this.props.getAdminOrderDataAction(json.content);
                            callback();
                        });
                    } else {
                        switchSpinState();
                    }
                }); */
            }
        });
    }

}
//redux
function mapStateToProps(state){
    return {}
}
function mapDispatchToProps(dispatch){
    return {
        getAdminOrderDataAction: bindActionCreators(getAdminOrderDataAction, dispatch),
        switchSpinState: bindActionCreators(switchSpinState, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SendTheGoods);


