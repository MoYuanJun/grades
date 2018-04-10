/* 登录注册 ==>智能组件 */
import React from 'react';
/* 加载自定义组件 */
import ComLogin from '../../components/Login';
/* 导入封装好的函数 该文件统一管理要获取的数据的方法 */
import { LoginData, judgeUser, register } from  '.././../fetch/index';


/* 连接到redux */
import { getSalesRecord } from '../../fetch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updataUser, clearUserInfo } from '../../actions/userInfoAction';
import { getUserOrderDataAction, getAdminOrderDataAction, clearOrderDataAction } from '../../actions/orderDataAction';
import { switchSpinState } from '../../actions/commonGlobal';

class Login extends React.Component{

  componentDidMount(){
    //加载该页面时先清除用户数数据
    const { clearUserInfo } = this.props;
    clearUserInfo();
  }
  //加载数据……登录成功后需要加载的数据
  loadDataToRedux = (userInfo) => {
    const {updataUser, getUserOrderDataAction, getAdminOrderDataAction, 
      switchSpinState, clearOrderDataAction
    } = this.props;
    //先清除数据
    clearOrderDataAction();
    //更新用户信息 ==> redux
    delete userInfo.error;
    updataUser(userInfo);
    switchSpinState();
    getSalesRecord({u_id:userInfo.u_id}).then(res=>res.json()).then(json=>{
      switchSpinState();
      if(json.error === '200'){
        console.log(json.content);
        getUserOrderDataAction(json.content); //如果成功返回数据 则加载更新redux
        console.log('%c获取用户订单数据成功！', 'color:green', json);
      }
    });
  }

  /* 业务函数：登录函数 */
  LoginFun(obj,calback){ //第一参数：用户登录表单对象格式{userName:'..',password:'....'}
    /* 调用封装的函数，从数据库通过给定用户名和密码判断对比，并返回结果 */
    LoginData(obj).then(res=>res.json()).then((json)=>{
      if (json.error === 200){  //后端返回的数据通过error表示登录的状态 200 登录成功  404登录失败
        /* 登录成功则将用户数据存储到redux 并加载所需要的数据*/
        this.loadDataToRedux(json);

        //判断用户进行跳转
        if (json.username === 'root'){
          this.props.history.push('/backgrounds')
        } else {
          this.props.history.go(-1); //回退到上一个路由，继续操作
        }
      }else{
        //登录失败 调用木偶组件的回调函数 弹出登录失败对话框
        calback(); 
      }
    });
  }

  /* 业务函数：判断当前用户是否存在 参数：{userNam:'用户名',calback} */
  judgeUser_(obj, calback){
    judgeUser(obj).then(res=>res.text()).then(text=>{
      calback( text )
    });
  }
  
  /* 业务函数：用户注册函数 */
  register_(obj){
    register(obj).then(res=>res.json()).then(json=>{
      //更新 redux
      if( json.error === 200 ){  //注册成功 ==> 否则都是失败的

        //更新redux中userInfo状态并加载其余数据
        this.loadDataToRedux(json);

        if (json.username === 'root'){
          this.props.history.push('/backgrounds');
        } else {
          this.props.history.go(-1);
        }
      } else {
        this.props.history.push('/login/login');
      }
    });
  }

  render(){
    return (
      <div>
        {/* 将业务函数 ： 登录方法传给木偶组件 */}
        <ComLogin LoginFun={this.LoginFun.bind(this)} 
                  judgeUser={this.judgeUser_.bind(this)} 
                  register={this.register_.bind(this)}
                  type={this.props.match.params.type} />{/* 获取路由参数 */}
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
    updataUser: bindActionCreators(updataUser,dispatch),
    getUserOrderDataAction: bindActionCreators(getUserOrderDataAction, dispatch),
    getAdminOrderDataAction: bindActionCreators(getAdminOrderDataAction, dispatch),
    switchSpinState: bindActionCreators(switchSpinState, dispatch),
    clearOrderDataAction: bindActionCreators(clearOrderDataAction, dispatch),
    clearUserInfo: bindActionCreators(clearUserInfo, dispatch)
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);