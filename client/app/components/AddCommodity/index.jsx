import React from 'react';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;


class AddCommodityForm extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }
      render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    {/* 标题 */}
                    <FormItem
                        label='标题'
                        labelCol={{span: 2}}
                        wrapperCol={{span: 10}}
                        >
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />

                        )}
                    </FormItem>
                    {/* 价格 */}
                    <FormItem
                        label='标题'
                        labelCol={{span: 2}}
                        wrapperCol={{span: 10}}
                        >
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <div>
                                <Input addonBefore="原价" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                <Input addonBefore="现价" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            </div>
                            
                        )}
                    </FormItem>
                    <FormItem
                        label='文字'
                        labelCol={{span: 2}}
                        wrapperCol={{span: 10}}
                        >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                    </FormItem>
                    <FormItem>

                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>

                    </FormItem>
                </Form>
                <div>
                     *商品标题
                     *商品图片
                     *商品原价
                     *商品现价
                     *商品库存
                     *商品颜色
                     *商品尺寸
                     *商品发货地

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
