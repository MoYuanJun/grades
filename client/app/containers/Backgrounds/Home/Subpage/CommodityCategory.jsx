/* 商品分类 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.less';

import { categoryDataUpdata, categoryDataGet } from '../../../../actions/commodityCategoryData';
import { switchSpinState } from '../../../../actions/commonGlobal';

import { Table, Input, Popconfirm, Modal, Button } from 'antd';
import { updateData, deleteData, insertIntoData, selectData } from '../../../../fetch';
import { TimestampToFormat } from '../../../../static/js/common';
class CommodityCategory extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            cacheData: [], //存储拷贝数据，当取消编辑时，使用存储起来的数据，更新data中被改变的数据 （因为在编辑时 会改变data中的数据的）
            visible: false
        };
        this.columns = [
            {
                title: '名称',
                dataIndex: 'cat_name',
                width: '30%',
                render: (text, record) => {
                    return (
                        <div>
                            {record.editable ? 
                                <Input style={{ margin: '-5px 0' }} value={text} 
                                    onChange={e => this.handleChange(e.target.value, record.key, 'cat_name')} />
                                : text}
                        </div>
                    );
                },
            }, {
                title: '创建时间',
                dataIndex: 'cat_time',
                width: '30%',
                render: (text, record) => {
                    return (
                        <div>
                            {TimestampToFormat(text)}
                        </div>
                    );
                },
            }, {
                title:  <div className="clearfix add-data">
                            <div className="float-left column">操作</div>
                            <div className="float-right add-new" 
                                onClick={() => {
                                    this.switchAddNewDataModal();
                                }}>
                                    <svg style={{marginRight: '2px'}} className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-tianjia"></use>
                                    </svg>
                                    添加
                            </div>
                        </div>,
                width: '40%',
                dataIndex: 'operation',
                render: (text, record, index) => {
                    const { editable } = record;
                    return (
                        <div className="operation">
                        {
                            editable ?
                            <span>
                                <a onClick={() => this.save(record.key)}>
                                    <svg style={{marginRight: '2px'}} className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-msnui-save"></use>
                                    </svg>
                                    保存
                                </a>
                                <Popconfirm title="是否确定取消编辑?" onConfirm={() => this.cancel(record.key)}>
                                <a>
                                    <svg style={{marginRight: '2px'}} className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-cancel"></use>
                                    </svg>
                                    取消
                                </a>
                                </Popconfirm>
                            </span> : 
                            <a onClick={() => this.edit(record.key)}>
                                <svg style={{marginRight: '3px'}} className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-zhuce"></use>
                               </svg>
                            编辑
                            </a>
                        }
                        {
                            <Popconfirm title="是否确定删除该条分类?" onConfirm={() => this.delete(record.key)}>
                                <a>
                                    <svg style={{marginRight: '2px'}} className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-shanchu"></use>
                                    </svg>
                                    删除
                                </a>
                            </Popconfirm>
                        }
                        </div>
                    );
                },
            }
        ];
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({
            data: nextProps.commodityCategoryData.map((item, index, arr) => {
                item.key = item.cat_id;
                return item;
            }),  
            cacheData: nextProps.commodityCategoryData.map(item => ({ ...item })) }
        );
    }

    handleChange(value, key, column) {
        console.log('%c查看3个参数', value, key, column);
        const {data , cacheData} = this.state;
        const newData = [...data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            console.log('%c查看target', target);
            target[column] = value;
            this.setState({ data: newData });
        }
    }

    edit(key) {
        const {data , cacheData} = this.state;
        const newData = [...data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({ data: newData });
        }
    }

    save(key) {
        const {data , cacheData} = this.state;
        const { categoryDataUpdata, commodityCategoryData, switchSpinState } = this.props;
        const target = data.filter(item => key === item.key)[0];
        if (target) {
            const request = {
                request: {
                    tableName: 'commoditycategory',
                    params: {   //要设置字段的 键值对
                        cat_name: target.cat_name
                    },
                    where:{  //条件：字段 以及字段值
                        column: 'cat_id',
                        value: target.cat_id
                    }
                }
            }
            switchSpinState(); //切换加载中状态
            updateData(request).then(res=>res.json()).then(json=>{
                if (json.error === '1' && json.updatedData ){
                    const reduxState = commodityCategoryData.map((item, index, arr) => {
                        if(json.updatedData.cat_id === item.cat_id){
                            return json.updatedData;
                        }
                        return item;
                    });
                    categoryDataUpdata(reduxState);
                    console.log('%c商品分类更新数据库成功！', 'color:green', json);
                }
                switchSpinState(); //切换加载中状态
            });
        }
    }

    cancel(key) {
        const {data , cacheData} = this.state;
        const newData = [...data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            Object.assign(target, cacheData.filter(item => key === item.key)[0]);
            delete target.editable;
            this.setState({ data: newData });
        }
    }

    delete = (key) => {
        const {data , cacheData} = this.state;
        const { categoryDataUpdata, commodityCategoryData, switchSpinState } = this.props;
        //从redux.state.commodityCategoryData获取删除目标数据
        const target = commodityCategoryData.filter(item => key === item.cat_id)[0];
        //从redux.state.commodityCategoryData中获取若删除后数据的数组对象
        const deletedData = commodityCategoryData.filter(item => item.cat_id !== key );
        switchSpinState(); //切换加载中状态
        deleteData({
            request: {
                tableName: 'commoditycategory',
                where: {
                    column: 'cat_id',
                    value: target.cat_id
                }
            }
        }).then(res=>res.json()).then(json=>{
            if( json.error === '1' && json.deleteData ){
                categoryDataUpdata(deletedData); //更新redux
                console.log('%c数据删除成功', 'color: green',  json);
            }
            switchSpinState();//切换加载中状态
        });
    }
    
    //切换新增商品分类弹窗
    switchAddNewDataModal = () => {
        this.setState({visible: !this.state.visible});
    }

    //插入新数据
    insertIntoDataHandler = (arr) => {
        const { switchSpinState } = this.props;
        let j = 0;
        switchSpinState() //切换加载状态
        for(let i = 0; i < arr.length; i++){
            let request = {
                tableName: 'commoditycategory',
                columns: ['cat_id', 'cat_name'],
                values: ['catid', arr[i]],
                key: {column: 'cat_name', value: arr[i]}
            }
            insertIntoData({request}).then(res=>res.json()).then(json=>{
                j++;
                if(j === arr.length){
                    this.getCategoryData();
                }
                if(json.error === '1'){
                    console.log('%c插入数据成功!', 'color:green', json);
                } else if (json.error === '0'){
                    alert('插入数据失败！');
                    console.log('%c插入数据失败!', 'color:red', json);
                }
            });
        }
    }
    //重新获取分类数据 并更新redux
    getCategoryData = () => {
        const { switchSpinState, categoryDataGet } = this.props;
        //加载获取商品分类
        let request = {   //查询 条件
            request:{
                tableName: 'commoditycategory',
                orderBy: {column: 'cat_time', type: 'DESC' }
            }
        };
        //查询获取分类数据 => 存入redux
        selectData(request).then(res=>res.json()).then(json=>{
            switchSpinState();
            if(json.error === '1'){
                categoryDataGet(json.content );
                console.log('%c查询数据成功！', 'color: green', json);
            }
        });
    }


    render() {
        const { visible } = this.state;
        return (
            <div id="CommodityCategory">
                {
                    <Table 
                        bordered 
                        dataSource={this.state.data} 
                        columns={this.columns} />
                }
                <AddNewDataModal 
                    visible = {visible}
                    insertIntoDataHandler={this.insertIntoDataHandler}
                    switchAddNewDataModal={this.switchAddNewDataModal}
                />
            </div>
        );
    }
}

//连接redux
function mapStateToProps(state){
    return {
        commodityCategoryData: state.commodityCategoryData
    }
}
function mapDispatchToProps(dispatch){
    return {
        categoryDataUpdata: bindActionCreators(categoryDataUpdata, dispatch),
        switchSpinState : bindActionCreators(switchSpinState, dispatch),
        categoryDataGet: bindActionCreators(categoryDataGet, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommodityCategory);


class AddNewDataModal extends React.Component{
    state = {
        newDataArr : [ '' ],
    }
    //点击新增一行
    addNewRowHandler = () => {
        const state = this.state;
        state.newDataArr.push('');
        this.setState(state);
    }
    //移除一行
    removeRowHandler = (index) => {
        const state = this.state;
        state.newDataArr.splice(index, 1);
        this.setState(state);
    }
    //输入框changeHandler
    inoutChangeHandler = (value, index) => {
        const state = this.state;
        state.newDataArr[index] = value;
        this.setState(state);
    }
    //清除数据 
    clearNewDataArr = () => {
        this.setState({newDataArr: ['']});
    }
    render(){
        const { newDataArr } = this.state;
        const { visible, switchAddNewDataModal, insertIntoDataHandler } = this.props;
        return (
            <div>
                <Modal
                    title="添加新商品分类"
                    visible={visible}
                    onOk={()=>{
                        insertIntoDataHandler(newDataArr);
                        switchAddNewDataModal();
                        this.clearNewDataArr();
                    }}
                    onCancel={()=>{
                        switchAddNewDataModal();
                        this.clearNewDataArr();
                    }}
                    >
                        <div  id="add-new-data-modal" className="clearfix">
                            <div className="float-left label">分类名称：</div>
                            <div className="float-left input-group">
                                {newDataArr.map( (item, index, arr) => {
                                    return  <div key={index} className="clearfix item-row">
                                                <div className="input float-left">  
                                                    <Input
                                                        value={newDataArr[index]}
                                                        onChange={(e) => {
                                                            this.inoutChangeHandler(e.target.value, index);
                                                    }} />
                                                </div>
                                                {
                                                    newDataArr.length > 1 ?
                                                    <div className="float-left remove"
                                                        onClick={() => {
                                                            this.removeRowHandler(index);
                                                        }}
                                                    >
                                                        移除
                                                    </div> : '' 
                                                }
                                                
                                            </div>
                                })}
                                <div className="add-new-row" onClick={this.addNewRowHandler}>+新增一行</div>
                            </div>
                        </div>
                        
                </Modal>
            </div>
        );
    }
}