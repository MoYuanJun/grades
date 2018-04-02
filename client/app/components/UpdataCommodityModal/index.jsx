/**props
 * visible : 控制模态框显示状态
 * modalData: 模态框数据，当前要修改商品的数据
 */
import React from 'react';
import { Modal, Button, Input, InputNumber, Row, Col, Select } from 'antd';
const Option = Select.Option;
import Upload from '../Upload';
import './style.less';

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class UpdataCommodityModal extends React.Component{
    state = {
        requestParam: null  //表单数据对象  初始值为当前商品数据
    }
    componentWillReceiveProps(nextProps){
        let requestParam = null;
        requestParam = JSON.parse(JSON.stringify(nextProps.modalData));
        this.setState({requestParam});
    }

    //更新state.requestParam
    updateStateRequestParam = (key, value) => {
        const requestParam = this.state.requestParam;
        requestParam[key] = value;
        this.setState({requestParam}, () => {
            console.log('%c商品修改参数', 'background: green', this.state);
        });
    }
    //获取上传图片路径 并进行更新
    getImgPath = (imgUrl) => {
        this.updateStateRequestParam('com_img', imgUrl);
    }
    render(){
        const { requestParam } = this.state;
        const { visible, updataVisible, modalClickHandler, commodityCategoryData } = this.props;
        return (
            <div>
                {console.log('%c查看修改商品弹窗状态', 'background:red', this.state)}
                {requestParam ? 
                    <Modal title="商品修改"
                        width="1200px"
                        visible={visible}
                        onOk={()=>{
                            modalClickHandler(this.state.requestParam);
                            updataVisible();
                            
                        }}
                        confirmLoading={false}
                        onCancel={()=>{
                            updataVisible();
                        }}>
                            <div id="UpdataCommodityModal" className="clearfix">
                                <div className="com_img float-left">
                                    <Upload
                                        getImgPath={this.getImgPath}
                                        uploadCatalog="commodity"
                                        previewImg={requestParam ? requestParam.com_img : ''}
                                    />
                                </div>
                                <div className="com_input float-right">
                                    <div className="com_bottom">
                                        <div className="bottom-row clearfix">
                                            <div className="row-item float-left">
                                                <Row>
                                                    <Col span={4}> <span className="label"><span>*</span>标题：</span> </Col>
                                                    <Col span={20}>
                                                    <Input 
                                                        size="large"
                                                        value={requestParam.com_title}
                                                        onChange={(e) => {
                                                            this.updateStateRequestParam('com_title', e.target.value);
                                                        }} />
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="row-item float-right">
                                                <Row>
                                                    <Col span={4}> <span className="label"><span>*</span>分类：</span> </Col>
                                                    <Col span={20}>
                                                    <Select
                                                        size="large"
                                                        mode="tags"
                                                        style={{ width: '100%' }}
                                                        placeholder="Please select"
                                                        value={ requestParam.com_category ? requestParam.com_category.slice(0, -1).split(';') : [] }
                                                        onChange={(value) => {
                                                            this.updateStateRequestParam('com_category', value.length ? value.join(';')+';' : '');
                                                        }}>
                                                        {
                                                            commodityCategoryData && commodityCategoryData.length > 0 ? 
                                                            commodityCategoryData.map((item, index, arr) => {
                                                                return <Option key={index} value={item.cat_name}>{item.cat_name}</Option>
                                                            }) : []
                                                        }
                                                    </Select>
                                                    </Col>
                                                </Row>
                                            </div>  
                                        </div>
                                        <div className="bottom-row clearfix">
                                            <div className="row-item float-left">
                                                <Row>
                                                    <Col span={4}> <span className="label"><span>*</span>价格：</span> </Col>
                                                    <Col span={20}>
                                                    <Input 
                                                        size="large"
                                                        value={requestParam.com_newPrice}
                                                        onChange={(e) => {
                                                            this.updateStateRequestParam('com_newPrice', e.target.value);
                                                        }} />
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="row-item float-right">
                                                <Row>
                                                    <Col span={4}> <span className="label"><span>*</span>尺寸：</span> </Col>
                                                    <Col span={20}>
                                                    <Input 
                                                        size="large"
                                                        value={requestParam.com_size}
                                                        onChange={(e) => {
                                                            this.updateStateRequestParam('com_size', e.target.value);
                                                        }} />
                                                    </Col>
                                                </Row>
                                            </div>  
                                        </div>
                                        <div className="bottom-row clearfix">
                                            <div className="row-item float-left">
                                                <Row>
                                                    <Col span={4}> <span className="label"><span>*</span>库存：</span> </Col>
                                                    <Col span={20}>
                                                    <Input 
                                                        size="large"
                                                        value={requestParam.com_number}
                                                        onChange={(e) => {
                                                            this.updateStateRequestParam('com_number', e.target.value);
                                                        }}/>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="row-item float-right">
                                                <Row>
                                                    <Col span={4}> <span className="label"><span>*</span>颜色：</span> </Col>
                                                    <Col span={20}>
                                                    <Input 
                                                        size="large"
                                                        value={requestParam.com_color}
                                                        onChange={(e) => {
                                                            this.updateStateRequestParam('com_color', e.target.value);
                                                        }}/>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </Modal> :''}
            </div>
        );
    }
}
export default UpdataCommodityModal;
