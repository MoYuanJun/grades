import React from 'react';
const imgData = require('../../static/img/serch-null.png');
import "./style.less";
class NullData extends React.Component{
    render(){
        return(
            <div id="NullData">
                <div className="nulldata-content clearfix">
                    <div className="img float-left">
                        <img src={imgData} alt=""/>
                    </div>
                    <p className="float-right">
                        <span>童鞋，木有找到相关内容~</span><br/>
                        去其他地方到处逛一逛吧！
                    </p>
                </div>
            </div>
        );
    }
}
export default NullData;