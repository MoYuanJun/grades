/* 登录木偶组件 ==> 登录分页 */
import React from 'react';

import './style.less';

/* 获取antd组件 */
import { Form, Icon, Input, Button, Modal } from 'antd';
const FormItem = Form.Item;


/* 错误对话框：当登录时账号密码错误时触发 */
function error() {
  Modal.error({
    title: '登录错误!',
    content: '账号或密码错误,请检查您的密码！',
  });
}

class SubLogin extends React.Component{
  state = {
    loading: false //是否登录中
  }

  /* 提交事件处理函数 */
  handleSubmit = (e) => {
    e.preventDefault();
    /* validateFields校验并获取一组输入域的值与 Error */
    this.props.form.validateFields((err, values) => {
      if (!err) { /* 表单提交在前端通过第一轮验证 */
        this.setState({loading: true});
        this.props.LoginFun(values,()=>{
          this.setState({loading: false});
          error();
        });
      }
    });
  };

  render(){
    //获取对form组件进行包装后 传递过来的接口getFieldDecorator
    //getFieldDecorator	用于和表单进行双向绑定，详见下方描述
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="com_login">
        {/* form表单开始 */}
        <Form onSubmit={this.handleSubmit} className="login-form">

          <FormItem hasFeedback>{/* hasFeedback 表示 自动检验 ==> 检验通过显示绿色小图标*/}
            {getFieldDecorator('userName', {
              /* 表单检验规则 */
              rules: [{ required: true, message: '请输入正确的账号!' }],
            })(
              <Input size='large' prefix={<Icon type="user" 
              style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
            )}
          </FormItem>

          <FormItem hasFeedback >{/* 自动检验 */}
            {getFieldDecorator('password', {
              /* 表单检验规则 */
              rules: [{ required: true, message: '请输入正确的密码！' }],
            })(
              <Input size='large' prefix={<Icon type="lock" 
              style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </FormItem>

          <FormItem className='but'>
            {/* 按钮设置type表示按钮的样式  htmlType表示类型   */}
            <Button style={{opacity: this.state.loading ? '0.5' : '1'}} 
              size='large' type="primary" htmlType="submit" className="login-form-button">
              {this.state.loading ? '登录中······' : '登录'}
            </Button>
          </FormItem>

        </Form>
      </div>
    );
  }
}
/* 对form进行包装，包装后的 form具有this.props.form 属性 一些列接口查antd表单那块的接口 */
export default Form.create()(SubLogin);




