import React from 'react';
import { Spin } from 'antd';
import './style.less';
class CustomSpin extends React.Component{
    render(){
        return (
            <div id="CustomSpin" style={{display: 'none'}}>
                <div className="content">
                <Spin size="large"></Spin>
                </div>
            </div>
        );
    }
} 
export default CustomSpin;

