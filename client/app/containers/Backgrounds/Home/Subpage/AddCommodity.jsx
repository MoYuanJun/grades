/* 添加商品  智能组件 */
import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddCommodityComponent from '../../../../components/AddCommodity';  //添加商品
import { switchSpinState} from '../../../../actions/commonGlobal';

/* 封装fetch方法 ： 插入商品 */
import { insertCommodity } from '../../../../fetch';

class AddCommodity extends React.Component{
    render(){
        const { history, commodityCategoryData, switchSpinState } = this.props;
        return (
            <div>
                <AddCommodityComponent 
                    switchSpinState={switchSpinState}
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
function mapDispatchToProps(dispatch){
    return {
        switchSpinState: bindActionCreators(switchSpinState, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCommodity);
