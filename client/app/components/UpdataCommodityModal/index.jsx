/**props
 * visible : 控制模态框显示状态
 * modalData: 模态框数据，当前要修改商品的数据
 */
import React from 'react';
import { Modal, Button, Input, InputNumber, Row, Col } from 'antd';
import Upload from '../Upload';
import './style.less';

class UpdataCommodityModal extends React.Component{
    state = {
        requestParam: null
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
        const { visible, updataVisible } = this.props;
        return (
            <div>
                {requestParam ? 
                    <Modal title="商品修改"
                        width="1200px"
                        visible={visible}
                        onOk={()=>{
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
                                        uploadCatalog="test"
                                        previewImg={requestParam ? requestParam.com_img : ''}
                                    />
                                </div>
                                <div className="com_input float-right">
                                    <div className="com_top">
                                        <Row>
                                            <Col span={2}> <span className="label"><span>*</span>标题：</span> </Col>
                                            <Col span={22}>
                                            <Input 
                                                size="large"
                                                value={requestParam.com_title}
                                                onChange={(e) => {
                                                    this.updateStateRequestParam('com_title', e.target.value);
                                                }} />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="com_bottom">
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
                {console.log('%c查看修改商品弹窗组件的state', 'background: green', this.state)}
            </div>
        );
    }
}
export default UpdataCommodityModal;
