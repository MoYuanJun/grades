/* 登录木偶组件==>注册分页 */
import React from 'react';
import './style.less';

/* 获取antd组件 */
import { Form, Icon, Input, Button, Modal } from 'antd';
const FormItem = Form.Item;

/* 错误对话框：当登录时账号密码错误时触发 */
function error(content) {
  Modal.error({
    title: '注册错误!',
    content,
    userValue:''
  });
}

class SubRegister extends React.Component{
  constructor(){
    super();
    this.state = {
      validateStatus:'',      //验证状态值：''表示初始化状态、'success'表示成功状态、'error'表示错误状态
      userHelp:'',            //用户注册账号表单出错时的提示
      userValue:'',            //账号输入框值
      loading: false //是否登录中
    }
  }

  /* 提交事件处理函数 */
  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.validateStatus !== 'success'){
      return ;
    }
    if(this.state.validateStatus === ''){ //如果this.state.validateStatus === ''表示用户没有填写账号
      //当然输入框表单为空 ==> 修改this.state.userValue和this.state.help的值
      this.setState({'validateStatus':'error', 'userHelp':'请输入要注册的账号'});
    }
    /* validateFields校验并获取一组输入域的值与 Error */
    this.props.form.validateFields((err, values) => {
      if (!err) { /* 表单提交在前端通过第一轮验证 */
       if(this.state.userValue){ /* 判断输入值是否为空！ */
          this.setState({loading: true});
          //这里执行注册业务函数 ==> 该函数是智能组件传给主木偶组件 ==> 主木偶组件再传过来的
          //注册成功到底怎么做，木偶组件不管，全部交给智能组件处理 它只负责执行
          this.props.register(values);
       }else{
         /* 错误对话框！ */
        error('账号不能为空！');
       }   
      }
    });
  };

  /* 账号表单 改变事件 */
  changeHandle = (e)=>{
      //实时动态修改this.state.userValue值
      var obj = this.state;
      obj.userValue = e.target.value;
      this.setState(obj); 

      //这里执行判断当前用户是否存在业务函数 ==> 该函数是智能组件传给主木偶组件 ==> 主木偶组件再传过来的
      //该函数调用后台接口，判断要注册的用户是否存在  ===> 传入回调函数
      if(this.state.userValue != ''){
        this.props.judgeUser({userName:this.state.userValue},( text )=>{
          if(text === '200'){   //后端接口：判断是否存在某用户，存在则返回200  不存在则返回404
            //当前用户存在 => 修改this.state.userValue和this.state.help的值
            this.setState({'validateStatus':'error', 'userHelp':'当前用户已存在'});
          }else if(this.state.userValue != ''){ //判断当前用户输入框是否为空
              //当前账号输入框不为空值 => 修改this.state.userValue和this.state.help的值
              this.setState({'validateStatus':'success', 'userHelp':''});
          }
        });
      }else{
        //当前账号输入框为空值 => 修改this.state.userValue和this.state.help的值
        this.setState({'validateStatus':'error', 'userHelp':'请输入要注册的账号！'});
      }
  }

  render(){
    //获取对form组件进行包装后 传递过来的接口getFieldDecorator   
    //getFieldDecorator	用于和表单进行双向绑定，详见下方描述
    const { getFieldDecorator } = this.props.form;
    return (
      <div id='com_register'>
          <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem 
            hasFeedback
            validateStatus = {this.state.validateStatus}
            help = {this.state.userHelp}
            required = {true}
          >
          {getFieldDecorator('userName',{
              /* 表单检验规则 */
            })(
             <Input size='large' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" id="warning" onChange={this.changeHandle} />
          )}
          </FormItem>

          <FormItem hasFeedback >{/* 自动检验 */}
            {getFieldDecorator('password', {
              /* 表单检验规则 */
              rules: [{ required: true, message: '请输入密码！' }],
            })(
              <Input size='large' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                type="password" placeholder="密码" />
            )}
          </FormItem>

          <FormItem className='but'>
            {/* 按钮设置type表示按钮的样式  htmlType表示类型   */}
            <Button style={{opacity: this.state.loading ? '0.5' : '1'}} 
            size='large' type="primary" htmlType="submit" className="login-form-button">
              {this.state.loading ? '注册中······' : '注册'}
            </Button>
          </FormItem>

          </Form>
      </div>
    )
  }
}

/* 对form进行包装，包装后的 form具有this.props.form 属性 一些列接口查antd表单那块的接口 */
export default Form.create()(SubRegister);