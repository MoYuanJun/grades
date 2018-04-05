/* 后台首页智能组件 */
import React from 'react';
import './style.less';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAdminOrderDataAction } from '../../../actions/orderDataAction';
import { getCommodityData } from '../../../actions/commodityDataAction';
import { updataUser } from '../../../actions/userInfoAction';
import { switchSpinState } from '../../../actions/commonGlobal';
import { categoryDataGet } from '../../../actions/commodityCategoryData';

import AddCommodity from './Subpage/AddCommodity';  //添加商品
import UpdataCommodity from './Subpage/UpdataCommodity'; //商品修改
import SendTheGoods from './Subpage/SendTheGoods';  //待发货
import WaitForGoodsReceiptComponent from './Subpage/WaitForGoodsReceipt'; //待收货
import CommodityCategory from './Subpage/CommodityCategory';  //商品分类
import BannerSetting from './Subpage/BannerSetting';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

//获取封装的fetch方法：获取订单数据 、 获取所有商品数据
import { getSalesRecord, getAllCommodityData, selectData } from '../../../fetch';

class BackgroundsHome extends React.Component{
  state = {
    current:'10'
  }
  render(){
    const { history, commodityData, orderData } = this.props;
    return (
      <div id='backgrounds-home'> 
        <Layout>
          <Header className="header">
            <div className='header-content'>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
                >
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
              </Menu>
            </div>
          </Header>
          <div className='content'>
            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['10']}
                  defaultOpenKeys={['sub3']}
                  onClick={(e) => {
                    this.setState({current: e.key});
                  }}
                  style={{ height: '100%', borderRight: 0 }}
                  >
                  <SubMenu key="sub1" title={<span><Icon type="user" />商品信息管理</span>}>
                    <Menu.Item key="1">商品添加</Menu.Item>
                    <Menu.Item key="2">商品修改</Menu.Item>
                    <Menu.Item key="3">option3</Menu.Item>
                    <Menu.Item key="4">option4</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" title={<span><Icon type="laptop" />订单信息管理</span>}>
                    <Menu.Item key="5">option5</Menu.Item>
                    <Menu.Item key="6">待发货</Menu.Item>
                    <Menu.Item key="7">待收货</Menu.Item>
                    <Menu.Item key="8">option8</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub3" title={<span><Icon type="notification" />商品类别管理</span>}>
                    <Menu.Item key="9">分类管理</Menu.Item>
                    <Menu.Item key="10">轮播设置</Menu.Item>
                    <Menu.Item key="11">option11</Menu.Item>
                    <Menu.Item key="12">option12</Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout style={{ padding: '0 0 0 24px' }}>
                <Content >
                  <div className='content-content' >
                    <div style = {{display:this.state.current === '1' ? 'block' : 'none'}}>
                      <AddCommodity history={history} />
                    </div>
                    <div style = {{display:this.state.current === '2' ? 'block' : 'none'}}>
                      <UpdataCommodity data={commodityData} />
                    </div>
                    <div style = {{display:this.state.current === '3' ? 'block' : 'none'}}>
                      3
                    </div>
                    <div style = {{display:this.state.current === '4' ? 'block' : 'none'}}>
                      4
                    </div>
                    <div style = {{display:this.state.current === '5' ? 'block' : 'none'}}>
                      5
                    </div>
                    <div style = {{display:this.state.current === '6' ? 'block' : 'none'}}>
                        <SendTheGoods 
                            orderData = {orderData.filter((item, index, arr)=>{
                              if (item.state === '2' ){ return item }
                            })}
                          getAdminOrderDataAction={this.props.getAdminOrderDataAction}
                        />
                    </div>
                    <div style = {{display:this.state.current === '7' ? 'block' : 'none'}}>
                      <WaitForGoodsReceiptComponent
                        orderData = {orderData.filter((item, index, arr)=>{
                          if (item.state === '3' ){ return item }
                        })}
                        getAdminOrderDataAction={this.props.getAdminOrderDataAction}
                      />
                    </div>
                    <div style = {{display:this.state.current === '8' ? 'block' : 'none'}}>
                      8
                    </div>
                    <div style = {{display:this.state.current === '9' ? 'block' : 'none'}}>
                      <CommodityCategory />
                    </div>
                    <div style = {{display:this.state.current === '10' ? 'block' : 'none'}}>
                      <BannerSetting />
                    </div>
                    <div style = {{display:this.state.current === '11' ? 'block' : 'none'}}>
                      11
                    </div>
                    <div style = {{display:this.state.current === '12' ? 'block' : 'none'}}>
                      12
                    </div>
                  </div>
                </Content>
              </Layout>
            </Layout>
          </div>
        </Layout>
      </div>
    );
  }

  /**组件将要渲染的时候
   * 1、获取所有订单数据 
   * 2、将获取到的订单数据更新到redux中state.orderData
   */
  componentWillMount(){
    const { getAdminOrderDataAction, getCommodityData, switchSpinState,categoryDataGet
    
    } = this.props;
    //监听：当数据全部加载完，切换redux中spin状态值   ，没加载完一个随便push一个值 监听数组长度即可起到监听作用
    let count = [];
    switchSpinState();
    //获取 商品订单数据 ==> 并存储到redux - store
    getSalesRecord().then(res=>res.json()).then(json=>{
      count.push(1);
      count.length === 2 ? switchSpinState() : '';
      if(json.error === '200'){
        getAdminOrderDataAction(json.content);
      }
    });

    //获取商品数据 ==> 并存储到redux - store
    getAllCommodityData().then(res=>res.json()).then(json=>{
      count.push(1);
      count.length === 2 ? switchSpinState() : '';
      if(json.error === '200'){
        getCommodityData(json.content);
      }
    });

    //加载获取商品分类
    let request = {   //查询 条件
      request:{
        tableName: 'commoditycategory',
        orderBy: {column: 'cat_time', type: 'DESC' }
      }
    };
    //查询获取分类数据 => 存入redux
    selectData(request).then(res=>res.json()).then(json=>{
        json.error === '1' ? categoryDataGet(json.content ) : '';
    });
    
  }
}
//连接redux
function mapStateToProps(state){
  return {
    userInfo: state.userInfo,
    orderData: state.orderData,
    commodityData: state.commodityData,
  }
}
function mapDispatchToProps(dispatch){
  return {
    switchSpinState: bindActionCreators(switchSpinState, dispatch),
    getAdminOrderDataAction:bindActionCreators(getAdminOrderDataAction, dispatch),
    updataUser:bindActionCreators(updataUser, dispatch),
    getCommodityData: bindActionCreators(getCommodityData, dispatch),
    categoryDataGet: bindActionCreators(categoryDataGet, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackgroundsHome);
