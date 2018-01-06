/* 登录 ==>智能组件 */
import React from 'react';
/* 加载自定义组件 */
import ComLogin from '../../components/Login';
/* 导入封装好的函数 该文件统一管理要获取的数据的方法 */
import { LoginData, judgeUser, register } from  '.././../fetch/index';


/* 连接到redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userInfoAction from '../../actions/userInfoAction';

class Login extends React.Component{
  /* 业务函数：登录函数 */
  LoginFun(obj,calback){ //第一参数：用户登录表单对象格式{userName:'..',password:'....'}
    /* 调用封装的函数，从数据库通过给定用户名和密码判断对比，并返回结果 */
    LoginData(obj).then(res=>res.json()).then((json)=>{
      if (json.error === 200){  //后端返回的数据通过error表示登录的状态 200 登录成功  404登录失败
        /* 登录成功则将用户数据存储到redux */
        this.props.userInfoAction.updataUser(json);
        console.log('redux-userInfo','输出位置：登录页面之智能组件','登录成功',this.props.userInfo);/* ================= */
        //跳转到首页
        //window.history.go(-1) 跳转到上一路径
      }else{
        //登录失败 调用木偶组件的回调函数 弹出登录失败对话框
        calback(); 
      }
    });
  }
  /* 业务函数：判断当前用户是否存在 参数：{userNam:'用户名'} */
  judgeUser_(obj){
    return judgeUser(obj);
  }
  /* 业务函数：用户注册函数 */
  register_(obj){
    return register(obj);
  }


  render(){
    return (
      <div>
        {/* 将业务函数 ： 登录方法传给木偶组件 */}
        <ComLogin LoginFun={this.LoginFun.bind(this)} judgeUser={this.judgeUser_.bind(this)} register={this.register_.bind(this)} />
      </div>
    )
  }
}

/* 连接到redux */
function mapStateToProps(state){
  return {
    userInfo:state.userInfo  //redux state映射到 props
  };
}
function mapDispatchToProps(dispatch){ //redux actions 和dispatch联系起来 并映射到props
  return {
    userInfoAction:bindActionCreators(userInfoAction,dispatch)
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);