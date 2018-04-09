import React from 'react';
import './style.less';
const LOGO = require('../../../../static/img/logo.png');
class BackgroundsHeader extends React.Component{
    render(){
        return (
            <div className="clearfix" id="BackgroundsHeader">
                <div className="logo float-left">
                    <img src={LOGO} alt=""/>
                </div>
                <div className="float-right">
ssssssssssssssss
                </div>
            </div>
        );
    }
}
export default BackgroundsHeader;