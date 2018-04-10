import React from 'react';
import './style.less';
import { Link } from 'react-router-dom';
const LOGO = require('../../../../static/img/logo.png');
const headImg = require('../../../../static/img/loginbg.png');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class BackgroundsHeader extends React.Component{
    render(){
        const { userInfo } = this.props;
        return (
            <div className="clearfix" id="BackgroundsHeader">
                <div className="logo float-left">
                    <Link to="/"><img src={LOGO} alt=""/></Link>    
                </div>
                <div className="float-right user">
                    <div className="img float-left">
                        { userInfo && userInfo.head_img ? 
                            <img src={userInfo.head_img} alt=""/> : 
                            <img src={headImg} alt=""/>
                        }
                    </div>
                    <div className="float-right">
                        {
                            userInfo ? 
                            userInfo.nickname ? <span>{userInfo.nickname}</span> :
                            <span>{userInfo.username}</span>
                            : ''
                        }
                        (管理员用户)
                    </div>
                </div>
            </div>
        );
    }
}
//redux
function mapStateToProps(state){
    return {
        userInfo: state.userInfo
    }
}
function mapDispatchToProps(dispatch){
    return {}
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BackgroundsHeader);