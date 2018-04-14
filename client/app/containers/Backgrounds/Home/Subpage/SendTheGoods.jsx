/* 智能组件 后台-发货 */
import React from 'react';
import './style.less';
import { Modal, Input, Select, Row, Col, message } from 'antd';
const Option = Select.Option;

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
        expressName: 'yd',//填写快递模态框 => 返回的参数：快递类型
        expressNo:''//填写快递模态框 ==> 返回的参数：快递单号
    }
    render(){
        const { orderData } = this.props;
        const { handleOk, visible, expressName, expressNo } = this.state;
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
                    title="填写物流"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={this.onCancelHandler}
                    >
                    <Row>
                        <Col span={3}>
                            <span style={{lineHeight: '32px'}}>快递：</span>
                        </Col>
                        <Col span={21}>
                            <Select defaultValue="yd" style={{width: '100%'}} onChange={(value)=>{
                                this.setState({expressName: value});
                            }}>
                                <Option value="yd">韵达快递</Option>
                                <Option value="sf">顺丰快递</Option>
                                <Option value="zto">中通快递</Option>
                                <Option value="yt">圆通快递</Option>
                                <Option value="sto">申通快递</Option>
                                <Option value="ems">EMS快递</Option>
                            </Select>
                        </Col>
                    </Row>
                    <br/>   
                    <Row>
                        <Col span={3}>
                            <span style={{lineHeight: '32px'}}>单号:</span>
                        </Col>
                        <Col span={21}>
                            <Input 
                                value={expressNo}
                                onChange={(e)=>{
                                    this.setState({expressNo: e.target.value});
                                }}
                            />
                        </Col>
                    </Row>
                </Modal>
                {console.log('___查看当前组件state___', this.state)}
            </div>
        );
    }

    //初始化state
    initState = () => {
        this.setState({
            sal_id: [],  
            handleOk: ()=>{},   
            visible: false,   
            /*expressName: '',  快递类型可能都一样，所有其实没必要初始化 */
            expressNo:''
        });
    }
    //模态框取消事件函数
    onCancelHandler = () => {
        this.initState();
    }
    operationFun=(checkList, state, callback)=>{
        const { getAdminOrderDataAction, switchSpinState } = this.props;
        //过滤出当前选中的订单
        const filteCheckList = [];
        for(let key in checkList) {
            checkList[key] ? filteCheckList.push(key) : '';
        }
        this.setState({sal_id: filteCheckList}, () => { 
            if(state !== '0'){
                //不等于0才处理
                this.setState({
                    visible: true, 
                    handleOk: ()=>{
                        const {expressName, expressNo} = this.state;
                        const params = {
                            state: '3',
                            orderInfo: {    //该参数主要作用：设置其余参数
                                express_name: expressName,
                                express_no: expressNo
                            },  
                            sal_id: this.state.sal_id
                        };
                        switchSpinState();
                        updateSalesRecordState(params).then(res=>res.text()).then(text=>{
                            if(text !== '0'){
                                getSalesRecord().then(res=>res.json()).then(json=>{
                                    switchSpinState();
                                    message.success('订单操作成功！');
                                    this.initState();
                                    this.props.getAdminOrderDataAction(json.content);
                                    callback();
                                });
                            } else {
                                this.setState({ visible: false });
                                switchSpinState();
                                message.error('订单操作失败！');
                            }
                        }); 
                    }
                });
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


