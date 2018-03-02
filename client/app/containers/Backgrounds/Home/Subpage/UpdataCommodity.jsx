/* 子智能组件 后台商品修改 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class UpdataCommodity extends React.Component{
    render(){
        return (
            <div>
                1111111111
            </div>
        );
    }
}

//连接redux
function mapStateToProps(state){
    return {

    }
}
function mapDispatchToProps(state){
    return {

    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdataCommodity);