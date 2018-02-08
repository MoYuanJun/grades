/* 订单列表木偶组件
数据：{data}
实时获取checkList函数：{getCheckList}
操作节点label：{operationLabel}
修改设置父组件的this.state {changeParentState}
*/
import React from 'react';
import { Checkbox } from 'antd';
import './style.less';
class OrderListComponent extends React.Component{
    constructor(){
        super();
        this.state={
            checkList: {}
        }
    }
    /**
     * 通过状态值 返回状态
     * 1 ==>购物车中
     * 2 ==>已下单 || 待发货
     * 3 ==>已发货
     * 4 ==>已收货
     */
    stateNumberToText(stateNumber) {
        switch(stateNumber){
            case '1' : return '未下单' ; break;
            case '2' : return '待发货' ; break;
            case '3' : return '已发货' ; break;
            case '4' : return '待收货' ; break;
            default :  return '错误状态';
        }
    }
    //多选框改变状态事件
    checkChangehandler(key, isClear = false){
        if (isClear){ //判断是否需要清除已选内容，直接点击单个订单进行购买需要清除操作
            this.setState({checkList: []}, () => {
                let stateCheckList = this.state.checkList;
                stateCheckList[key] = !this.state.checkList[key];
                this.setState({checkList: stateCheckList}, ()=> {
                    this.props.getCheckList(this.state.checkList);
                });
            });
        } else {
            let stateCheckList = this.state.checkList;
            stateCheckList[key] = !this.state.checkList[key];
            this.setState({checkList: stateCheckList}, ()=> {
                this.props.getCheckList(this.state.checkList);
            });
        }
    }
    render(){
        //接口，从父组件 获取的所有接口
        const {data, childrenNodeDom, operationLabel, operationIcon, changeParentState } = this.props;
        return (
            <div id="OrderListComponent">
                <div className='header'>
                    <ul className='clearfix'>
                        <li className='float-left li_first'>商品信息</li>
                        <li className='float-left li_2'>单价</li>
                        <li className='float-left li_margin'>数量</li>
                        <li className='float-left li_4'>金额</li>
                        <li className='float-left li_margin'>状态</li>
                        <li className='float-left li_6'>操作</li>
                    </ul>
                </div>
                {data.length ? data.map(( item, index, arr ) => {
                    return (
                        <div className='box clearfix' key = { index } 
                            style={{background:this.state.checkList[item.sal_id] ? '#FFF8E1' : ''}} >
                            <div className='checkbox float-left'>
                                <Checkbox value={item.sal_id} checked={this.state.checkList[item.sal_id]} 
                                        onChange = {(e) => {
                                            this.checkChangehandler(e.target.value);
                                        }}
                                 />
                            </div>
                            <div className='img float-left'>
                                <img src={item.commodity.com_img} alt=""/>
                            </div>
                            <div className='title float-left'>
                                {item.commodity.com_title}
                            </div>
                            <div className='price float-left iteam'>
                                <p className='old-price'>￥{item.commodity.com_oldPrice}</p>
                                <p className='new-price'>￥{item.commodity.com_newPrice}</p>
                            </div>
                            <div className='number float-left iteam iteam-margin'>
                                {item.com_number}
                            </div>
                            <div className='total float-left iteam'>
                                ￥{item.com_number * item.commodity.com_newPrice}
                            </div>
                            <div className='state float-left iteam iteam-margin'>
                               {this.stateNumberToText(item.state)}
                            </div>
                            <div className='operation float-left iteam'>
                                <div value={item.sal_id} onClick={(e) => {
                                        this.checkChangehandler(e.target.getAttribute('value'), true);
                                        changeParentState({'visible': true});
                                    }}><svg className='icon' aria-hidden='true'> <use xlinkHref={operationIcon}></use></svg>
                                    {operationLabel}
                                </div>
                            </div>
                        </div>
                    );
                }) : <div>暂无数据</div>}
            </div>
        );
    }
}

export default OrderListComponent;