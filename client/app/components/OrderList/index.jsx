/* 订单列表木偶组件
接口：
data ： 数据 ； 格式：数组对象  ==>  [{}, {}, {}, {}, .....]
getCheckList : 获取列表选中选中的订单 ； 格式：数组  ==> [ sal_id: boolean, sal_id: boolean, ..... ]
operationLabel : 操作按钮显示的文本内容
operationIcon="#icon-goumai"  : 操作按钮显示的图标名称(阿里云矢量图)
changeParentState ： 改变更新父组件的this.state //其实就是将数据传递给父组件
*/
import React from 'react';
import { Checkbox } from 'antd';
import './style.less';
class OrderListComponent extends React.Component{
    constructor(){
        super();
        this.state={
            checkList: {},
            isCheckAll: false,
            totalNum: 0,
            totalPrice: 0.00
        }
    }
    /** 通过状态值 返回状态
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

    //判断当前是否是全选状态：并设置this.state.isCheckAll
    isCheckAll = () => {
        const { data } = this.props;
        if(data.length){
            let checkListLength = 0;
            for(let key in this.state.checkList){
                this.state.checkList[key] === true ? checkListLength++ : '';
            }
            if(data.length === checkListLength){
                this.setState({isCheckAll: true});
            }else{
                this.setState({isCheckAll: false});
            }
        }
    }

    //多选框改变状态事件【单选获取点击单个操作按钮都会触发】
    checkChangeHandler(key, isClear = false){
        if (isClear){ //判断是否需要清除已选内容，直接点击单个订单进行购买需要清除操作
            //多了一步清除操作，当我们选中很多个订单后，又直接点击某个订单进行结算时应该清除其他选择
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
        this.upDataTotal();//更新统计
        //判断是否选中所有
        this.isCheckAll();
    }

    //全选事件
    checkAllHandler = () => {
        const { data } = this.props; //获取传递来的数据
        /* 更新this.state中isCheckAll状态(是否全选)，并触发回调函数 */
        this.setState({isCheckAll: !this.state.isCheckAll}, () => {
            let checkAllList = {};  //存储全选个数
            data.length ? data.map((item, index, arr) => {checkAllList[item.sal_id] = this.state.isCheckAll }) : '';
            this.setState({checkList: checkAllList}, () => {
                this.upDataTotal(); //更新统计
                this.props.getCheckList(this.state.checkList); //同步到父组件
            });
        });
    }

    //更新统计价格和数量
    upDataTotal = () => {
        const { data } = this.props;
        //过滤 返回已选订单数组
        let checkList = [];
        for( let key in this.state.checkList ){
            this.state.checkList[key] ? checkList.push(key) : '';
        }
        //更新已选订单数
        this.setState({totalNum: checkList.length});
        //遍历统计 ==> 更新已选商品总价
        let totalPrice = 0.00;
        checkList.map((salIdItem, salIdIndex, arr) => {
            data.map((orderDataItem, orderDataindex, arr) => {
                salIdItem === orderDataItem.sal_id ? totalPrice += orderDataItem.totalPrice : '';
            });
        });
        this.setState({totalPrice: totalPrice - 0 });
    }
    render(){
        //接口，从父组件 获取的所有接口
        const {data, childrenNodeDom, operationLabel, operationIcon, changeParentState } = this.props;
        return (
            <div id="OrderListComponent">
                <div className='header'>{/* 头部 */}
                    <ul className='clearfix'>
                        <li className='float-left li_first'>商品信息</li>
                        <li className='float-left li_2'>单价</li>
                        <li className='float-left li_margin'>数量</li>
                        <li className='float-left li_4'>金额</li>
                        <li className='float-left li_margin'>状态</li>
                        <li className='float-left li_6'>操作</li>
                    </ul>
                </div>
                {/* 中间列表 */}
                {data.length ? data.map(( item, index, arr ) => {
                    return (
                        <div className='box clearfix' key = { index } 
                            style={{background:this.state.checkList[item.sal_id] ? '#FFF8E1' : ''}} >
                            <div className='checkbox float-left'>
                                <Checkbox value={item.sal_id} checked={this.state.checkList[item.sal_id]} 
                                        onChange = {(e) => {
                                            this.checkChangeHandler(e.target.value);
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
                                ￥{item.totalPrice}
                            </div>
                            <div className='state float-left iteam iteam-margin'>
                               {this.stateNumberToText(item.state)}
                            </div>
                            <div className='operation float-left iteam'>
                                {this.props.operationDom}
                            </div>
                        </div>
                    );
                }) : <div className="no-data">暂无数据</div>}
                <div className='footer clearfix'>{/* 尾部 */}
                    <div className='float-left foot-left'>
                        <Checkbox checked={this.state.isCheckAll} onChange={this.checkAllHandler} />
                        <span>全选</span>
                    </div>
                    <div className='float-right foot-right'>
                        <div  className="button" onClick={(e) => {
                                for (let key in this.state.checkList){
                                    if(this.state.checkList[key]){
                                        changeParentState({'visible': true});
                                        break;
                                    }
                                }
                            }}><svg className='icon' aria-hidden='true'> <use xlinkHref={operationIcon}></use></svg>&nbsp;
                            {operationLabel}
                        </div>
                    </div>
                    <div className="float-right foot-center">
                        <span>已选商品<span className="total-num total">{this.state.totalNum}</span>件</span>
                        <span>合计：<span className="total-price total">{`￥${this.state.totalPrice}`}</span></span>
                    </div>
                </div>

            </div>
        );
    }
}
export default OrderListComponent;
