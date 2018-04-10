/* 个人中心  木偶组件【总】 */
import React from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import './style.less';
import MyDataModification from './subpages/MyDataModification';  //资料编辑
import MyShoppingCart from './subpages/MyShoppingCart'; //购物车
import MyOrderComponent from './subpages/MyOrder';  //订单
class UserHomeComponent extends React.Component{
    componentDidMount(){
        this.setState({current: this.props.params.itemKey});
    }
    constructor(){
        super();
        this.state = {
            current: '1'
        }
    }
    /* this.props.params.itemKey */
    render(){
        const { params } = this.props;
        const { current } = this.state;
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
                            <Menu theme="dark" mode="inline" 
                                defaultSelectedKeys={[params.itemKey]} onClick={(e)=>{
                                this.setState({'current': e.key });
                            }}>
                                <Menu.Item key="1">
                                    <svg style={{fontSize: '16px', margin:'0 8px 0 0'}} className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-ziliaoguanli"></use>
                                    </svg>
                                    <span className="nav-text">编辑资料</span>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <svg style={{fontSize: '16px', margin:'0 8px 0 0'}} className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-navigoumai"></use>
                                    </svg>
                                    <span className="nav-text">我的购物车</span>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <svg style={{fontSize: '16px', margin: '0 8px 0 0'}} className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-iconddfh"></use>
                                    </svg>
                                    <span className="nav-text">我的订单</span>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <svg style={{fontSize: '16px', margin: '0 8px 0 0'}} className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-mima1"></use>
                                    </svg>
                                    <span className="nav-text">密码修改</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
                            <Content>
                                <div style={{ padding: '0 24px 24px 24px', background: '#fff', minHeight: 360 }}>
                                    <div style={ { display: current === '1' ? 'block' : 'none', paddingTop: '20px' } }>
                                        <MyDataModification history = { this.props.history } basicInfoShow={true} />
                                    </div>
                                    <div style={ { display: current === '2' ? 'block' : 'none' } }>
                                        {/* 购物车 */}
                                        <MyShoppingCart data = {this.props.orderData ?
                                                        this.props.orderData.filter((item, index, arr) => {
                                                            if(item.state === '1'){
                                                                return item; 
                                                            }
                                                        }) :
                                                        ''}
                                                        updateSalesRecordState={this.props.updateSalesRecordState} 
                                                        history = { this.props.history }/>
                                    </div>
                                    <div style={ { display: current === '3' ? 'block' : 'none' } }>
                                        {/* 我的订单 */}
                                        <MyOrderComponent data = {this.props.orderData ? this.props.orderData : [] }
                                                          updateSalesRecordState={this.props.updateSalesRecordState}
                                                          history = { this.props.history } 
                                        />
                                    </div>
                                    <div style={ { display: current === '4' ? 'block' : 'none', paddingTop: '20px' } }>
                                        <MyDataModification history = { this.props.history } passwordRemoveShow={true} />
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
