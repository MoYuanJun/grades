/* 子智能组件 后台商品修改 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCommodityData, reduxUpdataCommodity } from '../../../../actions/commodityDataAction';
import { switchSpinState } from '../../../../actions/commonGlobal';
import { getAllCommodityData, updataCommodity, updateData } from '../../../../fetch';

import SearchComponent from '../../../../components/SearchComponent';
import CommodityShow from '../../../../components/CommodityShow';
import UpdataCommodityModal from '../../../../components/UpdataCommodityModal';

import { message } from 'antd';
const modelData = [
    {
        type: 'TextInput', //TextInput 
        data: {
            label: '商品编号',
            size: '185px',
            inputKey: 'com_id',
        }
    },
    {
        type: 'TextInput', //TextInput 
        data: {
            label: '商品标题',
            size: '185px',
            inputKey: 'com_title',
        }
    },
    {
        type: 'TimeRangeInput', //TextInput NumberRangeInput TimeRangeInput SelectInput
        data: {
            label: '更新时间',
            size: '120px',
            inputKey: 'com_time',
        }
    },
    {
        type: 'NumberRangeInput', //TextInput NumberRangeInput TimeRangeInput SelectInput
        data: {
            label: '商品库存',
            size: '80px',
            inputKey: 'com_number',

        }
    },
    {
        type: 'NumberRangeInput', //TextInput NumberRangeInput TimeRangeInput SelectInput
        data: {
            label: '商品价格',
            size: '80px',
            inputKey: 'com_newPrice',

        }
    },
    {
        type: 'NumberRangeInput', //TextInput NumberRangeInput TimeRangeInput SelectInput
        data: {
            label: '销售数量',
            size: '80px',
            inputKey: 'com_salesVolume',

        }
    },
];
class UpdataCommodity extends React.Component{
    //
    state = {
        filterData: [],  //过滤出的数据
        visible: false,  //控制弹窗的显示
        modalData: null,  //要修改的数据 => 传给对话框
    } 
    //props改变时触发
    componentWillReceiveProps(nextProps){
        //初始化 => commodity列表
        this.setState({
            filterData: nextProps.commodityData
        });
    }

    //过滤参数  过滤掉值为""或者null或者undefined的属性
    filterParam = (param) => {
        for(let key in param){
            if(param[key] === "" || param[key] == null ){
                delete param[key];
                if( JSON.stringify(param[key]) == "{}"){
                    param[key]=null;
                }
            } else if(typeof param === 'object'){
                this.filterParam(param[key]);
            }
        }
        return param;
    }

    //过滤规则 数据 + 参数 ==> 该条数据是否满足条件 => true || false
    filterRule = (data, param) => {
        if(JSON.stringify(param) === "{}"){ return true }
        let isPush = true; //是否满足条件
        for(let key in param){
            switch(key){
                case 'com_id' : 
                    if( param[key] === "" ||  data[key].indexOf(param[key]) !== -1 ){
                        break; 
                    } else {
                        return false;
                    }
                case 'com_title' : 
                    if( param[key] === "" || data[key].indexOf(param[key]) !== -1 ){
                        break;
                    } else {
                        return false;
                    }

                case 'com_time' : 
                    if(  param[key] == null ){ 
                        break;
                     } else if( param[key].start != null && param[key].end != null ){
                        if(
                            new Date(data.com_time).getTime() >= new Date(param[key].start._d).getTime() && 
                            new Date(data.com_time).getTime() <= new Date(param[key].end._d).getTime() 
                        ){
                            break;
                         } else {
                             return false;
                         }
                     } else if( param[key].start == null && param[key].end != null ){
                        if(
                            new Date(data.com_time).getTime() >= 0 && 
                            new Date(data.com_time).getTime() <= new Date(param[key].end._d).getTime() 
                        ){
                            break;
                         } else {
                             return false;
                         }
                     } else if( param[key].start != null && param[key].end == null ){
                        if(
                            new Date(data.com_time).getTime() >= new Date(param[key].start._d).getTime()
                        ){
                            break;
                         } else {
                             return false;
                         }
                     } else {
                        break;
                     }

                case 'com_number' :
                    if(  param[key] == null ){ 
                        break;
                    } else if( param[key].start != null && param[key].end != null ){
                        if( data[key] >= param[key].start && data[key] <= param[key].end ){
                            break;
                        } else {
                            return false;
                        }
                    } else if( param[key].start == null && param[key].end != null ){
                        if( data[key] >= 0 && data[key] <= param[key].end ){
                            break;
                        } else {
                            return false;
                        }
                    } else if( param[key].start != null && param[key].end == null ){
                        if( data[key] >= param[key].start ){
                            break;
                        } else {
                            return false;
                        }
                    } else {
                        break;
                    }
                case 'com_newPrice' : 
                    if(  param[key] == null ){ 
                        break;
                    } else if( param[key].start != null && param[key].end != null ){
                        if( data[key] >= param[key].start && data[key] <= param[key].end ){
                            break;
                        } else {
                            return false;
                        }
                    } else if( param[key].start == null && param[key].end != null ){
                        if( data[key] >= 0 && data[key] <= param[key].end ){
                            break;
                        } else {
                            return false;
                        }
                    } else if( param[key].start != null && param[key].end == null ){
                        if( data[key] >= param[key].start ){
                            break;
                        } else {
                            return false;
                        }
                    } else {
                        break;
                    }
                case 'com_salesVolume' : 
                    if(  param[key] == null ){ 
                        break;
                    } else if( param[key].start != null && param[key].end != null ){
                        if( data[key] >= param[key].start && data[key] <= param[key].end ){
                            break;
                        } else {
                            return false;
                        }
                    } else if( param[key].start == null && param[key].end != null ){
                        if( data[key] >= 0 && data[key] <= param[key].end ){
                            break;
                        } else {
                            return false;
                        }
                    } else if( param[key].start != null && param[key].end == null ){
                        if( data[key] >= param[key].start ){
                            break;
                        } else {
                            return false;
                        }
                    } else {
                        break;
                    }
                default : break;
            }
        }
        return isPush;
    }
    
    //过滤函数
    filterFunc = (param)=>{
        const { commodityData } = this.props;
        const filterData = [];
        if(commodityData && commodityData.length > 0){
            commodityData.map((item, index, arr) => {
                this.filterRule(item, param) ? filterData.push(item) : '';
            });
        }
        this.setState({filterData});
    }

    //删除商品数据 处理函数
    deleteFun = (com_id) => {
        const { getCommodityData, switchSpinState } = this.props;
        

        //设置fetch-post参数
        const setKeyValue = JSON.stringify({
            com_isremove: '1'
        });
        const where = JSON.stringify({
            com_id
        });
        switchSpinState();
        updataCommodity({where, setKeyValue}).then(res => res.text()).then(text => {
            if(text == '200'){
                getAllCommodityData().then(res=>res.json()).then(json=>{
                    switchSpinState();
                    if(json.error === '200'){
                        getCommodityData(json.content);
                        message.success('删除商品成功！');
                    }

                });
            } else {
                switchSpinState();
                message.error('删除商品失败！');
            }
        });


        //1、调用 fetch中删除商品数据方法 2、在回调函数中更新commodityData
       /*  updataCommodity({com_id}).then(res => res.text()).then(text => {
            console.log('%c查看是否删除成功', 'background:blue', text);
            //获取商品数据 ==> 并存储到redux - store
            if(text === '200'){
                alert(111111);
                getAllCommodityData().then(res=>res.json()).then(json=>{
                    json.error === '200' ? getCommodityData(json.content) : '';
                });
            }
        }); */
    }

    //更新切换visible状态
    updataVisible = () => {
        this.setState({visible: !this.state.visible});
    }

    //更新modal数据
    updataModalData = (obj) => {
        this.setState({modalData: obj});
    }

    //弹窗确定按钮点击事件
    modalClickHandler = (obj) => {
        const { modalData } = this.state;
        const { reduxUpdataCommodity, switchSpinState } = this.props;
        if(obj.com_newPrice !== modalData.com_newPrice){
            obj.com_oldPrice = modalData.com_newPrice;
        }
        let params = {
            request: {
                tableName: 'commodity',
                params: obj,
                where:{  //条件：字段 以及字段值
                        column: 'com_id',
                        value: obj.com_id
                }
            }
        };
        switchSpinState();
        updateData(params).then(res=>res.json()).then(json=>{
            if(json.error === '1'){
                //传入个回调函数
                reduxUpdataCommodity(json.updatedData);
                switchSpinState();
                message.success('商品修改成功！');
            }else {
                switchSpinState();
                message.error('商品修改失败！');
            }
        });
    }
    
    render(){
        const { filterData, visible, modalData } = this.state;
        const { commodityData, commodityCategoryData } = this.props;
        return (
            <div id="UpdataCommodity">
                <div className="search-block clearfix">
                    <SearchComponent filterFunc={this.filterFunc} modelData={modelData} />
                </div>
                <div className='commity-list'>
                    <CommodityShow 
                        commodityData={filterData} 
                        deleteFun={this.deleteFun}
                        updataModalData={this.updataModalData}
                        updataVisible={this.updataVisible} />
                </div>
                <div>
                    <UpdataCommodityModal 
                        commodityCategoryData={commodityCategoryData}
                        visible = {visible}
                        modalData={modalData}
                        modalClickHandler={this.modalClickHandler}
                        updataVisible={this.updataVisible}
                    />
                </div>
                {console.log('%c查看redux-state', 'background:green', this.props.state)}
            </div>
        );
    }
}

//连接redux
function mapStateToProps(state){
    return {
        state: state,
        commodityData: state.commodityData,
        commodityCategoryData: state.commodityCategoryData
    }
}
function mapDispatchToProps(dispatch){
    return {
        getCommodityData: bindActionCreators(getCommodityData, dispatch),
        reduxUpdataCommodity: bindActionCreators(reduxUpdataCommodity, dispatch),
        switchSpinState: bindActionCreators(switchSpinState, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdataCommodity);
