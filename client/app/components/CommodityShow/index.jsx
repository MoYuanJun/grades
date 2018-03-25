/**展示商品列表之木偶组件
 * props接口：
 *  - commodityData: 需要展示的数据（经搜索栏搜索过滤的商品数据）
 *  - deleteFun : 删除商品按钮处理函数，接收一个参数：商品id;
 *  - updataFun : 修改商品提交处理函数，接收一个参数：商品id;
 *  - 补充：通过暴露的接口，木偶组件从智能组件那获取数据，获取业务函数并执行业务函数，通过函数参数的形式将木偶组件的数据传给智能组件
 *  - 补充：木偶组件是子组件，智能组件是父组件
 */
import React from 'react';
import './style.less';
import { Pagination , Button } from 'antd';
import { TimestampToFormat } from '../../static/js/common';
class CommodityShow extends React.Component{
    state = {
        pagination: {              //分页数据
            current: 1,            //当前页码 ==> 控制分页器选中的状态
            total: 0,              //数据总条数 ==> 动态，根据传入的数据条数变化
            pageSize: 5,           //每页总条数
        },
        currentData: [],           //当前页应该显示的数据  ==> 通过分页器 ==> 对源数据进行筛选获取当前页数据
    };

    //props改变时触发
    componentWillReceiveProps(nextProps){
        const {pagination} = this.state;
        const { commodityData } = nextProps;
        //更新分页器总数，并获取第一页数据
        pagination.total = commodityData.length; //直接修改对象值
        this.setState({pagination});    //状态改变通过this.setState触发才有效引起组件的重渲染
            this.setState({ currentData: [] });
        //判断将要传入的props.commodityData是否存储着数据，有则执行getCurrentData，空数据则直接置空this.state.currentData
        if(commodityData.length > 0){
            this.getCurrentData(1, commodityData);
        } else {
            this.setState({ currentData: [] });
        }
        
    }

    /**获取当前页数据  存储到this.state.currentData，并设置当前页码
     * @param {number} page 当前页码
     * @param {Array}  updata 当将要重新从this.props获取区数据时，这时当前this.props.commodityData是旧数据无法使用,将下一个数据传入
     */
    getCurrentData = (page=1, updata=[]) => {
        const { commodityData } = this.props;
        let { pagination, currentData } = this.state;
        //根据当前页和每页条数 => 获取当前页应显示的数据
        let total = pagination.total;
        let pageSize = pagination.pageSize;
        let start = (page - 1) * pageSize;
        let end = page * pageSize;
        //判断this.props是否将要更新，重新获取了数据
        updata.length > 0 ? currentData = updata.slice(start, end) : 
        currentData = commodityData.slice(start, end);
        //设置当前页码：current
        pagination.current = page;
        //将数据存储到this.state.currentData ==> 更新当前视图
        this.setState({currentData, pagination});
    }

    
    render(){
        const { pagination, currentData } = this.state;
        const { commodityData, deleteFun, updataVisible, updataModalData } = this.props;
        return (
           <div id="CommodityShowList">
                {   
                    currentData.length > 0 ?
                        currentData.map((item, index, arr)=>{
                            return <CommodityShowListItem 
                                commodityData={item} 
                                key={index} 
                                deleteFun={deleteFun} 
                                updataVisible={updataVisible}
                                updataModalData={updataModalData}
                            />
                        })
                    : <div>
                        暂无数据
                    </div>
                }
                {
                    pagination.total > 0 ? 
                    <div className="pagination">
                        <div className="box">
                            <Pagination 
                                current={pagination.current}
                                total={ pagination.total } 
                                pageSize={ pagination.pageSize }
                                style={{margin: '0 auto'}}
                                onChange={(page, pageSize)=>{
                                    this.getCurrentData(page);
                                }} 
                            />
                        </div>
                    </div>
                    : ''
                }
                
           </div>
        );
    }
}
export default CommodityShow;

class CommodityShowListItem extends React.Component{
    render(){
        const { commodityData, deleteFun, updataVisible, updataModalData } = this.props;
        return (
            <div id="CommodityShowListItem">
                <div className="header clearfix">
                    <div className="float-left">
                        <h2>{commodityData.com_title}</h2>
                        <div className="time-id">
                            <span className="content">{TimestampToFormat(commodityData.com_time)}</span>
                            <span className="label">商品编号 : </span>
                            <span className="content">{commodityData.com_id}</span>
                        </div>
                    </div>
                    <div className="float-right">
                        <div className="btn-delete" 
                            onClick={()=>{
                                deleteFun(commodityData.com_id);
                            }}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-iconset0127"></use>
                            </svg>
                        </div>
                        <div className="float-left">
                            <span onClick={() => {
                                updataVisible();
                                updataModalData(commodityData);
                            }}>修改</span>
                        </div>
                    </div>
                </div>
                <div className="commodity-box clearfix">
                    <div className="img float-left">
                        <img src={commodityData.com_img} alt="commodityImg"/>
                    </div>
                    <div className="info float-right">
                        <table>
                            <thead>
                                <tr>
                                    <td>价格</td>
                                    <td>库存</td>
                                    <td>销量</td>
                                    <td>评价</td>
                                    <td>收藏</td>
                                    <td>尺寸</td>
                                    <td>颜色</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{commodityData.com_newPrice}</td>
                                    <td>{commodityData.com_number}</td>
                                    <td>{commodityData.com_salesVolume}</td>
                                    <td>{commodityData.com_evaluate}</td>
                                    <td>{commodityData.com_collect}</td>
                                    <td>{commodityData.com_size.replace(/;/g, '  ')}</td>
                                    <td>{commodityData.com_color.replace(/;/g, '  ')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
} 