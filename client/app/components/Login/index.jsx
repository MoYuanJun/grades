/* 登录组件之木偶组件 */
import React from 'react';
import './style.less';

/* 导入 antd */
import { Tabs } from 'antd';
/* 获取选项组*/
const TabPane = Tabs.TabPane;

/* 导入木偶组件的分页 */
import SubLogin from  './subpage/login';/* 登录木偶组件 */
import SubRegister from './subpage/register';/* 注册木偶组件 */

class ComLogin extends React.Component{
  render() {
    /* 设置选项卡图标  ==> 分离管理 ==> 使用阿里图标 */
    const icon_login = <svg className="icon" aria-hidden="true"><use xlinkHref="#icon-denglu-copy"></use></svg>;
    const icon_re = <svg className='icon' aria-hidden='true'><use xlinkHref='#icon-zhuce'></use></svg>
    return (
      <div id='login'>

        <div className='content'>
          {/* 使用antd组件 */}
          {/* 外层组件 defaultActiveKey默认当前key */}
          <Tabs defaultActiveKey="1" > 

            <TabPane className='tab_login' tab={<span className='tab_head'>{icon_login}登录</span>} key="1">
              {/* 第一个选项卡：调用木偶组件分页 ===> 登录 */}
              <SubLogin LoginFun={this.props.LoginFun} />{/* 接收智能组件传来的方法 再传给木偶组件之分页 */}
            </TabPane>

            <TabPane className='tab_login' tab={<span  className='tab_head'>{icon_re}注册</span>} key="2">
              <SubRegister judgeUser={this.props.judgeUser} register={this.props.register}/>
            </TabPane>

          </Tabs>
          </div>
          
      </div>
    )
    
  }
}
export default ComLogin;


