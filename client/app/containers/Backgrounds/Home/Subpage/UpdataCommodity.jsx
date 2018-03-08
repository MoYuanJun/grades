/* 子智能组件 后台商品修改 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchComponent from '../../../../components/SearchComponent';
class UpdataCommodity extends React.Component{
    render(){
        const { props } = this.props;
        return (
            <div>
                <SearchComponent />
                {console.log('%c查看redux-state', 'background:green', this.props.state)}
            </div>
        );
    }
}

//连接redux
function mapStateToProps(state){
    return {
        state: state
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