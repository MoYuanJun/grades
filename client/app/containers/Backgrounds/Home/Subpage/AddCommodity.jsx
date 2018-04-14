/* 添加商品  智能组件 */
import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddCommodityComponent from '../../../../components/AddCommodity';  //添加商品
import { switchSpinState} from '../../../../actions/commonGlobal';
import { getCommodityData } from '../../../../actions/commodityDataAction';

/* 封装fetch方法 ： 插入商品 */
import { insertCommodity, getAllCommodityData } from '../../../../fetch';

class AddCommodity extends React.Component{
    render(){
        const { history, commodityCategoryData, switchSpinState, getCommodityData } = this.props;
        return (
            <div>
                <AddCommodityComponent 
                    switchSpinState={switchSpinState}
                    insertCommodity={insertCommodity} 
                    getCommodityData={getCommodityData}
                    getAllCommodityData={getAllCommodityData}
                    commodityCategoryData={commodityCategoryData}
                    history={history} />
            </div>
        );
    }
}
/* 连接redux */
function mapStateToProps(state){
    return {
        commodityCategoryData: state.commodityCategoryData,
    }
}
function mapDispatchToProps(dispatch){
    return {
        switchSpinState: bindActionCreators(switchSpinState, dispatch),
        getCommodityData: bindActionCreators(getCommodityData, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCommodity);
