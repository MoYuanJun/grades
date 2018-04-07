/* 用户中心 智能组件 */
import React from 'react';
import Header from '../../../components/Header';
import UserHomeComponent   from '../../../components/UserHome';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserOrderDataAction } from '../../../actions/orderDataAction';
import { getSalesRecord, updateSalesRecordState } from '../../../fetch';
class UserHome extends React.Component{
    constructor(){
        super();
        this.state = {};
    }

    /**更新订单：
     * @param {*} obj 
     * @param {*} func 
     */
    updateSalesRecordState(obj,func = () => {console.log('未给定回调函数')}){
        updateSalesRecordState(obj).then(res => res.text()).then(text => {
            if(text !== '0'){
                func();
            }
        });
    }
    
    render (){
        return (
            <div>
                {/* console.log('=========', this.props.match.params) */}
                <Header />
                <UserHomeComponent orderData = { this.props.orderData }
                                   params = {this.props.match.params}
                                   userInfo={this.props.userInfo}
                                   updateSalesRecordState = { this.updateSalesRecordState }
                                   history = { this.props.history }
                />
            </div>
        );
    }
}

/* 连接到redux */

function mapStateToProps(state){
    return {
        userInfo:state.userInfo,
        orderData:state.orderData
    }
}
function mapDispatchToProps(dispatch){
    return {
        getUserOrderDataAction : bindActionCreators(getUserOrderDataAction, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserHome);
