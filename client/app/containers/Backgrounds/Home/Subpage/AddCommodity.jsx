/* 添加商品  智能组件 */
import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddCommodityComponent from '../../../../components/AddCommodity';  //添加商品

/* 封装fetch方法 ： 插入商品 */
import { insertCommodity } from '../../../../fetch';
class AddCommodity extends React.Component{
    render(){
        const { history, commodityCategoryData } = this.props;
        return (
            <div>
                <AddCommodityComponent 
                    insertCommodity={insertCommodity} 
                    commodityCategoryData={commodityCategoryData}
                    history={history} />
            </div>
        );
    }
}
/* 连接redux */
function mapStateToProps(state){
    return {
        commodityCategoryData: state.commodityCategoryData
    }
}
function mapDispatchToProps(dipatch){
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCommodity);
