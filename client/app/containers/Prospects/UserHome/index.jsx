/* 用户中心 智能组件 */
import React from 'react';
import Header from '../../../components/Header';
import UserHomeComponent   from '../../../components/UserHome';
import { connect } from 'react-redux';
import { getSalesRecord } from '../../../fetch';
class UserHome extends React.Component{
    constructor(){
        super();
        this.state = {};
    }
    render (){
        return (
            <div>
                <Header></Header>
                <UserHomeComponent OrdeData={this.state.OrdeData}></UserHomeComponent>
            </div>
        );
    }
    componentDidMount(){
        getSalesRecord({u_id:this.props.userInfo.u_id}).then(res=>res.json()).then(json=>{
            if(json.error === '200'){
                this.setState({OrdeData:json.content});
            }
        });
    }
}

/* 连接到redux */

function mapStateToProps(state){
    return {userInfo:state.userInfo}
}
function mapDispatchToProps(state){
    return {}
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserHome);
