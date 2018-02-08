/* 个人中心  木偶组件【总】 */
import React from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import './style.less';
import MyShoppingCart from './subpages/MyShoppingCart';

class UserHomeComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            current: '2'
        }
    }
    render(){
        return (
            <div id='UserHomeComponent'>
                <div className='content'>
                    <div className='content_box'>
                    <Layout>
                        <Sider
                            breakpoint="lg"
                            collapsedWidth="0"
                            onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                            >
                            <div className="logo" />
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']} onClick={(e)=>{
                                console.log(e.key);
                                this.setState({'current': e.key });
                            }}>
                                <Menu.Item key="1">
                                    <Icon type="user" />
                                    <span className="nav-text">编辑资料</span>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Icon type="video-camera" />
                                    <span className="nav-text">我的购物车</span>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Icon type="upload" />
                                    <span className="nav-text">我的订单</span>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Icon type="user" />
                                    <span className="nav-text">我的收藏</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
                            <Content>
                                <div style={{ padding: '0 24px 24px 24px', background: '#fff', minHeight: 360 }}>
                                    <div style={ this.state.current === '1' ? { display: 'block' } : { display: 'none' } }>
                                    111111
                                    </div>
                                    <div style={ this.state.current === '2' ? { display: 'block' } : { display: 'none' } }>
                                        <MyShoppingCart data = {this.props.OrdeData ?
                                                        this.props.OrdeData.filter((item, index, arr) => {
                                                            if(item.state === '1'){
                                                                return item; 
                                                            }
                                                        }) :
                                                        ''}
                                                        updateSalesRecordState={this.props.updateSalesRecordState} 
                                                        history = { this.props.history }/>
                                    </div>
                                    <div style={ this.state.current === '3' ? { display: 'block' } : { display: 'none' } }>
                                    3333
                                    </div>
                                    <div style={ this.state.current === '4' ? { display: 'block' } : { display: 'none' } }>
                                    4444
                                    </div>
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserHomeComponent;
