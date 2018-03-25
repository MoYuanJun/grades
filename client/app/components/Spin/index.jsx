import React from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import './style.less';
class CustomSpin extends React.Component{
    render(){
        const { commonGlobal } = this.props;
        return (
            <div id="CustomSpin" style={{display: commonGlobal.spin ? 'block' : 'none'} } >
                <div className="content">
                <Spin size="large"></Spin>
                </div>
            </div>
        );
    }
}
//连接到redux
function mapStateToProps(state){
    return {
        commonGlobal: state.commonGlobal
    }
}
function mapDispatchToProps(dispatch){
    return {

    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomSpin);

