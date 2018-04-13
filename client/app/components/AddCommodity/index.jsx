/* 添加商品 - 木偶组件 */
import React from 'react';
import './style.less';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
import Upload from '../Upload';

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class AddCommodityForm extends React.Component{
    state = {
        img:'',
        categoryArr: []
    };
    componentWillReceiveProps(nextProps){
        if(nextProps.commodityCategoryData.length > 0){
            this.setState({
                categoryArr: nextProps.commodityCategoryData.map((item, index, arr)=>{
                    return item.cat_name;
                })
            });
        } 
    }
    //表单提交事件处理器
    handleSubmit = (e) => {
        const { insertCommodity, history, form, switchSpinState } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            let com_category = values.com_category.reduce((pre='', next)=>{
                return `${pre};${next}`;
            });
            values.com_category = com_category+';';
            values.com_img = this.state.img;
            //切换加载中状态
            switchSpinState();
            insertCommodity(values).then(res=>res.json()).then(json=>{
                //切换加载中状态
                switchSpinState();
                if(json.error === '200'){
                    //清除表单数据，antd封装后的form中的方法
                    form.resetFields();
                    //同时初始化化this.state 因为图片上传组件是自定义的无法清除
                    this.setState({
                        img:'',
                        categoryArr: []
                    }, ()=>{
                        console.log('==============');
                    });
                }
            });
          }
        });
    }
    //获取上传文件组件返回的路径 ==> 不直接传递this.setState是考虑上传多个图片
    getImgPath = (imgUrl) => {
        this.setState({img: imgUrl});
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="AddCommodityForm">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <div className="clearfix">
                        <div className="float-left form-left">
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
                                    <Upload getImgPath= {this.getImgPath } 
                                            previewImg= {this.state.img}
                                            tyleProps = {{
                                                svgSize : '50px',
                                                
                                                pSize: '16px',
                                                padding: '60px',
                                                width: '200px',
                                                height: '200px',
                                            }}
                                    />
                                    </div>
                                )}
                            </FormItem>
                        </div>
                        <div className="float-right form-right">
                            <div className="clearfix" style={{padding: '0 0 0 20px'}}>
                                {/* 标题 */}
                                <FormItem
                                    label='标题'
                                    labelCol={{span: 2}}
                                    wrapperCol={{span: 22}}
                                    >
                                    {getFieldDecorator('com_title', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <Input prefix={
                                        <svg className='icon' style={{fontSize:'14px', color: '#ccc'}} aria-hidden='true'>
                                        <use xlinkHref='#icon-biaoti'></use>
                                        </svg>} 
                                        placeholder="请输入标题" />

                                    )}
                                </FormItem>
                            </div>
                            <div className="clearfix" style={{padding: '0 0 0 20px'}}>
                                
                            </div>
                            <div className="clearfix" style={{padding: '0 0 0 20px'}}>
                                
                            </div>
                            <div className="clearfix" style={{padding: '0 0 0 20px'}}>
                                
                            </div>
                            <div className="clearfix">
                                <div className="float-left form-con-left">
                                    {/* 原价 */}
                                    <FormItem
                                        label='原价'
                                        labelCol={{span: 5}}
                                        wrapperCol={{span: 19}}
                                        >
                                        {getFieldDecorator('com_oldPrice', {
                                            rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                                <Input addonBefore="￥"  placeholder="请输入商品原价" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className="float-right form-con-right">
                                    {/* 现价 */}
                                    <FormItem
                                        label='现价'
                                        labelCol={{span: 5}}
                                        wrapperCol={{span: 19}}
                                        >
                                        {getFieldDecorator('com_newPrice', {
                                            rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                                <Input addonBefore="￥" placeholder="请输入商品现价" />
                                        )}
                                    </FormItem>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                    
                    
                    
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
                    {/* 类别 */}
                    <FormItem
                        label='类别'
                        labelCol={{span: 2}}
                        wrapperCol={{span: 10}}
                        >
                        {getFieldDecorator('com_category', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Select
                                mode="tags"
                                style={{ width: '100%' }}
                                placeholder="请选择商品类别"
                                onChange={()=>{}}
                            >
                                {this.state.categoryArr.map(( item, index, arr ) =>{
                                    return <Option key={index} value={item}>{item}</Option>;
                                })}
                            </Select>
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
            </div>
        );
    }
}

const AddCommodityComponent = Form.create()(AddCommodityForm);

export default AddCommodityComponent;
