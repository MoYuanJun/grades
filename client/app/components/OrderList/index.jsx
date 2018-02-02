import React from 'react';
import { Checkbox } from 'antd';
import './style.less';
class OrderListComponent extends React.Component{
    render(){
        //接口，从父组件 获取的所有接口
        const {data, childrenNodeDom } = this.props;
        return (
            <div id="OrderListComponent">
                {data ? data.map(( item, index, arr ) => {
                    return (
                        <div className='box clearfix' key = { index }>
                            <div className='checkbox float-left'>
                                <Checkbox />
                            </div>
                            {console.log('订单信息购物车：', item)}
                            <div className='img float-left'>
                                <img src={item.commodity.com_img} alt=""/>
                            </div>
                            <div className='title float-left'>
                                {item.commodity.com_title}
                            </div>
                            <div className='price float-left'>
                                <p>{item.commodity.com_oldPrice}</p>
                                <p>{item.commodity.com_newPrice}</p>
                            </div>
                            <div className='number float-left'>
                                {item.com_number}
                            </div>
                            <div className='total float-left'>
                                {item.com_number * item.commodity.com_newPrice}
                            </div>
                            <div className='state float-left'>
                                dsadssa
                            </div>
                            <div className='operation float-left'>
                                {childrenNodeDom ? childrenNodeDom :'' }
                            </div>
                        </div>
                    );
                }) : <div>暂无数据</div>}
            </div>
        );
    }
}

export default OrderListComponent;