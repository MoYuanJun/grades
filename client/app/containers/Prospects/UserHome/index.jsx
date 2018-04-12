/* 用户中心 智能组件 */
import React from 'react';
import Header from '../../../components/Header';
import UserHomeComponent   from '../../../components/UserHome';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserOrderDataAction } from '../../../actions/orderDataAction';
import { switchSpinState } from '../../../actions/commonGlobal';
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
    updateSalesRecordState = (obj,func = () => {console.log('未给定回调函数')}) => {
        const { userInfo, getUserOrderDataAction, switchSpinState } = this.props;
        //切换加载中状态
        switchSpinState();
        //更新订单
        updateSalesRecordState(obj).then(res => res.text()).then(text => {
            if(text !== '0'){
                //从数据库获取指定用户的订单数据
                getSalesRecord({u_id: userInfo.u_id}).then(res=>res.json()).then(json=>{
                    //切换加载中状态
                    switchSpinState();
                    if(json.error === '200' ){
                        getUserOrderDataAction(json.content);
                    }
                });
                func();
            }
        });
    }
    
    render (){
        return (
            <div>
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

    componentDidMount(){
        const { history, userInfo } = this.props;
        if(!userInfo.u_id){
            history.push('/login/login');
        }

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
        getUserOrderDataAction : bindActionCreators(getUserOrderDataAction, dispatch),
        switchSpinState: bindActionCreators(switchSpinState, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserHome);
