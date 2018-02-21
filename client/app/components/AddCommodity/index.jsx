import React from 'react';
import './style.less';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
import Upload from '../Upload';

class AddCommodityForm extends React.Component{
    state = {
        isShowUpIcon:true,
        isShowUpRes:false,
        upResData:null
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }

      uploadChangeHandler = (e) => { 
        if(e.target.files && e.target.files[0]){  
            this.setState({isShowUpIcon: false , isShowUpRes: true });
            this.setState({upResData: window.URL.createObjectURL(e.target.files[0]) });
        } else {
            this.setState({isShowUpIcon: true , isShowUpRes: false });
        }
      }

      render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="AddCommodityForm">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    {/* 标题 */}
                    <FormItem
                        label='标题'
                        labelCol={{span: 2}}
                        wrapperCol={{span: 10}}
                        >
                        {getFieldDecorator('com_title', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<svg className='icon' style={{fontSize:'14px', color: '#ccc'}} aria-hidden='true'><use xlinkHref='#icon-biaoti'></use></svg>} 
                            placeholder="请输入标题" />

                        )}
                    </FormItem>
                    {/* 图片 */}
                    <FormItem
                        label='主图'
                        labelCol={{span: 2}}
                        wrapperCol={{span: 10}}
                        >
                        {getFieldDecorator('com_img', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <div>
                                <div className='input-file'>
                                    <input name='upfile' type="file" onChange={this.uploadChangeHandler} />
                                    <div className='up-icon' style={{display:this.state.isShowUpIcon ? 'block' : 'none'}}>
                                        <svg className='icon' aria-hidden='true'><use xlinkHref='#icon-shangchuan'></use></svg>
                                        <p>上传</p>
                                    </div>
                                    <div className='up-res' style={{display:this.state.isShowUpRes ? 'block' : 'none'}}>
                                        <img src={this.state.upResData} alt=""/>
                                    </div>
                                </div>
                            </div>
                        )}
                    </FormItem>
                    {/* 原价 */}
                    <FormItem
                        label='原价'
                        labelCol={{span: 2}}
                        wrapperCol={{span: 10}}
                        >
                        {getFieldDecorator('com_oldPrice', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                                <Input addonBefore="￥"  placeholder="请输入商品原价" />
                        )}
                    </FormItem>
                    {/* 现价 */}
                    <FormItem
                        label='现价'
                        labelCol={{span: 2}}
                        wrapperCol={{span: 10}}
                        >
                        {getFieldDecorator('com_newPrice', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                                <Input addonBefore="￥" placeholder="请输入商品现价" />
                        )}
                    </FormItem>
                    {/* 库存 */}
                    <FormItem
                        label='库存'
                        labelCol={{span: 2}}
                        wrapperCol={{span: 10}}
                        >
                        {getFieldDecorator('com_number', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" 
                            placeholder="请输入库存" />
                        )}
                    </FormItem>
                    {/* 颜色 */}
                    <FormItem
                        label='颜色'
                        labelCol={{span: 2}}
                        wrapperCol={{span: 10}}
                        >
                        {getFieldDecorator('com_color', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" 
                            placeholder="请输入商品颜色，多种颜色用分号分隔" />
                        )}
                    </FormItem>
                    {/* 尺寸 */}
                    <FormItem
                        label='尺寸'
                        labelCol={{span: 2}}
                        wrapperCol={{span: 10}}
                        >
                        {getFieldDecorator('com_size', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" 
                            placeholder="请输入商品尺寸，多种尺寸用分号分隔" />
                        )}
                    </FormItem>
                    {/* 发货地 */}
                    <FormItem
                        label='发货地'
                        labelCol={{span: 2}}
                        wrapperCol={{span: 10}}
                        >
                        {getFieldDecorator('com_birthplace', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" 
                            placeholder="请输入商品发货地" />
                        )}
                    </FormItem>
                    <FormItem>

                    <Button type="primary" htmlType="submit" className="login-form-button">
                        提交
                    </Button>

                    </FormItem>
                </Form>
                <div>
                     *商品标题 1
                     *商品图片 =
                     *商品原价 1
                     *商品现价 1
                     *商品库存 1
                     *商品颜色 1 
                     *商品尺寸 1 
                     *商品发货地 1

                     商品唯一ID
                     商品评价数
                     商品收藏量
                     商品月销售
                     商品修改时间
                    
                </div>
            </div>
        );
      }
}

const AddCommodityComponent = Form.create()(AddCommodityForm);

export default AddCommodityComponent;
