/* 订单列表木偶组件
接口：
data ： 数据 ； 格式：数组对象  ==>  [{}, {}, {}, {}, .....]
operationFunc : 
            父组件获取列表选中的订单id 并 通过给定state值执行不同操作；
            第一参数：：数组  ==> [ sal_id: boolean, sal_id: boolean, ..... ]
            第二参数：==> state :0 表示用户点击列表中的多选框  1 表示用户单击列表项的按钮 2 表示用户单击底部按钮
            第三参数：函数
operationLabel: 操作按钮label
operationIcon：操作按钮  iconfont中带#的icon名称；如：#icon-user
*/
import React from 'react';

import { Checkbox, Modal, Divider } from 'antd';

import NullData from '../../components/NullData';
import './style.less';
class OrderListComponent extends React.Component{
    constructor(){
        super();
        this.state={
            checkList: {},
            isCheckAll: false,
            totalNum: 0,
            totalPrice: 0.00,
            expressState: { //物流弹窗信息状态
                visible: false, //控制弹窗
                data: {}    //记录data
            }
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
            case '1' : return '待下单' ; break;    /* 加入购物车中，未下单 */
            case '2' : return '待发货' ; break;    /* 已下单，为发货，等待发货 */
            case '3' : return '待收货' ; break;    /* 订单已发货，用户为收货，等待确认收货 */
            case '4' : return '订单完成' ; break;  /* 用户已收货，订单已完成 */
            default :  return '错误状态';
        }
    }
    
    //判断当前是否是全选状态：并设置this.state.isCheckAll
    isCheckAll = () => {
        const { data } = this.props;
        if(data && data.length){
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
    checkChangeHandler(key){
        let stateCheckList = this.state.checkList;
        stateCheckList[key] = !this.state.checkList[key];
        this.setState({checkList: stateCheckList}, ()=> {
            this.props.operationFunc(this.state.checkList, '0');
        });
        this.upDataTotal();//更新统计
        //判断是否选中所有
        this.isCheckAll();
    }

    //列表操作按钮点击事件
    ListClickHandler = (sal_id)=>{
        this.setState({checkList: []}, () => { 
            let stateCheckList = this.state.checkList;
            stateCheckList[sal_id] = !this.state.checkList[sal_id];
            this.setState({checkList: stateCheckList}, ()=> {
                //因setState是异步操作 当直接点击操作按钮时执行操作函数 需要考虑是否已经设置状态
                this.props.operationFunc(this.state.checkList, '1', ()=>{
                    this.setState({
                        checkList: {},
                        isCheckAll: false,
                        totalNum: 0,
                        totalPrice: 0.00});
                }); 
            });
        });
    }

    //底部按钮执行
    FooterClickHandler = (e) => {
        for (let key in this.state.checkList){
            if(this.state.checkList[key]){
                //执行按钮操作函数 ==> 将重新获取数据  ==> 给个回调函数 完成操作 初始化
                this.props.operationFunc(this.state.checkList, '2', () => {
                    this.setState({
                            checkList: {},
                            isCheckAll: false,
                            totalNum: 0,
                            totalPrice: 0.00});
                }); 
                break;
            }
        }
    }

    //全选事件
    checkAllHandler = () => {
        const { data } = this.props; //获取传递来的数据
        /* 更新this.state中isCheckAll状态(是否全选)，并触发回调函数 */
        this.setState({isCheckAll: !this.state.isCheckAll}, () => {
            let checkAllList = {};  //存储全选个数
            data && data.length ? data.map((item, index, arr) => {checkAllList[item.sal_id] = this.state.isCheckAll }) : '';
            this.setState({checkList: checkAllList}, () => {
                this.upDataTotal(); //更新统计
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
                salIdItem === orderDataItem.sal_id ? totalPrice += orderDataItem.totalPrice-'0' : '';
            });
        });
        this.setState({totalPrice: totalPrice - 0 });
    }
    
    //expressState 切换弹窗状态
    switchVisible = () => {
        const { expressState } = this.state;
        expressState.visible = !expressState.visible;
        this.setState({expressState});
    }
    //expressState更新数据
    updateExpressOrderData = (data) => {
        const { expressState } = this.state;
        expressState.data = data;
        this.setState({expressState});
    }

    render(){
        //接口，从父组件 获取的所有接口
        const {data, childrenNodeDom, operationLabel, operationIcon, changeParentState } = this.props;
        const { expressState } = this.state;
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
                {data && data.length ? data.map(( item, index, arr ) => {
                    return (
                        <div className='box clearfix' key = { index } 
                            style={{background:this.state.checkList[item.sal_id] ? '#FFF8E1' : ''}} >
                            <div className='checkbox float-left'>
                                <Checkbox value={item.sal_id} checked={this.state.checkList[item.sal_id]} 
                                        onChange = {(e) => {this.checkChangeHandler(e.target.value);}}
                                 />
                            </div>
                            <div className='img float-left'>
                                <img src={item.commodity.com_img} alt=""/>
                            </div>
                            <div className='title float-left' style={{textAlign: 'left'}}>
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
                            <div className='state float-left iteam iteam-margin' >
                               {this.stateNumberToText(item.state)}
                               {    
                                    item.express_name && item.express_no ?
                                   <p><a onClick={()=>{
                                        this.switchVisible();
                                        this.updateExpressOrderData(item);
                                   }}>查看物流</a></p>: ''
                               }
                            </div>
                            <div className='operation float-left iteam'>
                                <div className="button" onClick={this.ListClickHandler.bind(this, item.sal_id)}>
                                    <svg className='icon' aria-hidden='true'> <use xlinkHref={operationIcon}></use></svg>&nbsp;
                                    {operationLabel}
                                </div>
                            </div>
                        </div>
                    );
                }) : <div className="no-data"><NullData /></div>}
                {/* 底部 */
                data && data.length > 0 ?
                    <div className='footer clearfix'>{/* 尾部 */}
                        <div className='float-left foot-left'>
                            <Checkbox checked={this.state.isCheckAll} onChange={this.checkAllHandler} />
                            <span>全选</span>
                        </div>
                        <div className='float-right foot-right'>
                            <div  className="button" onClick={this.FooterClickHandler}>
                                <svg className='icon' aria-hidden='true'> <use xlinkHref={operationIcon}></use></svg>&nbsp;
                                {operationLabel}
                            </div>
                        </div>
                        <div className="float-right foot-center">
                            <span>已选商品<span className="total-num total">{this.state.totalNum}</span>件</span>
                            <span>合计：<span className="total-price total">{`￥${this.state.totalPrice}`}</span></span>
                        </div>
                    </div> : ''
                }
                <ModelBlock 
                    visible={expressState.visible} 
                    data={expressState.data} 
                    switchVisible={this.switchVisible}
                />
            </div>
        );
    }
}
export default OrderListComponent;

class ModelBlock extends React.Component{
    state={
        expressName: '',  //快递名称
        expressNo:'',   //快递单号
        stateList: [],  //物流状态信息
    }
    //初始化state
    initState = () => {
        this.setState({
            expressName: '',
            expressNo:'',
            stateList: [],
        });
    }
    //确认事件
    onOKHandler = () => {
        const { switchVisible } = this.props;
        switchVisible();
    }
    //取消事件
    onCancelHandler = () => {
        const { switchVisible } = this.props;
        switchVisible();
    }
    //
    componentDidMount(){
        const { data } = this.props;
        console.log('__弹窗数据__', data);
    }
    //
    componentWillReceiveProps(nextProps){
        const {data, visible} = nextProps;
        if(data && visible){
            console.log('__弹窗数据在将要更新props时__', data);
            
        }
        
    }
    render(){
        const {visible, data, switchVisible} = this.props;
        return (
            <div>
                {console.log('___查看弹窗组件的this.state___', this.state)}
                <Modal
                    title="查看物流信息"
                    visible={visible}
                    onOk={this.onOKHandler}
                    onCancel={this.onCancelHandler}
                >
                    <Divider dashed>邮政快递包裹：992939394939129994</Divider>
                    <ul>
                        <li>到达中国邮政局福州市区<span>2018-04-11 07:15:24</span></li>
                        <li>到达中国邮政局福州市区<span>2018-04-11 07:15:24</span></li>
                        <li>到达中国邮政局福州市区<span>2018-04-11 07:15:24</span></li>
                        <li>到达中国邮政局福州市区<span>2018-04-11 07:15:24</span></li>
                        <li>到达中国邮政局福州市区<span>2018-04-11 07:15:24</span></li>
                    </ul>
                </Modal>
            </div>
        );
    }
}