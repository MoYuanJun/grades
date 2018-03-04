/* 广告商品栏 => 木偶组件 */
/* 
暴露的props接口
1、data: 数组对象 ==> 数据源
2、keyTime: time(毫秒) ==> 间歇函数的循环时间
3、titme: string ==> 标题
4、listLent：number ==> 广告商品栏显示个数
*/
import React from 'react';
import './style.less';
import { Link } from 'react-router-dom';
/* 元素字数限制 */
import { wordlimit } from '../../static/js/common';
class AdvCom extends React.Component{
    state={ keyTime: 0 }
    render(){
        const { data, listLent, keyTime, title} = this.props;
        return (
            <div id="AdvCom">
                {title ? <h2>{title}</h2> : '' }
                {
                    data && data.length >= listLent ? this.getRandomDataArr().map((item, index, arr) => {
                        return <Link to={`/prospects/commodity/${item.com_id}`} key={`${keyTime}-index`}>
                                    <div className='container'>
                                        <div className='img'>
                                            <img src={item.commodity.com_img} alt=""/>
                                        </div>
                                        <div className='content'>
                                            <h2 ref='title' className='title'>{item.commodity.com_title}</h2>
                                            <p>
                                                <span>{item.commodity.com_evaluate}</span>
                                                <span>{item.commodity.com_collect}</span>
                                            </p>
                                            <div className='clearfix'>
                                                <p className='float-left'>
                                                    <span>{item.commodity.com_newPrice}</span>
                                                    <span>{item.commodity.com_oldPrice}</span>
                                                </p>
                                                <p className='float-right'>{item.commodity.com_salesVolume}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                    })
                    : ''
                }
                
            </div>
        );
    }

    componentDidMount(){
        const { keyTime, forTime } = this.props;
        setInterval(()=>{
            this.setState({keyTime: new Date().getTime()})
        }, forTime);
        //限制标题字符长度
        this.refs.title ? wordlimit(this.refs.title,23) : '';
    }

    //组件更新后  触发==>执行函数 对标题字数进行限制
    componentDidUpdate(){
        //先进行判断 dom是否成功渲染
        this.refs.title ? wordlimit(this.refs.title,23) : '';
    }

    getRandomDataArr = () => {
        const { data, listLent } = this.props;;
        let listData = [];
        for(let i = 0; i< listLent; i++ ){
            let item = data[Math.floor(Math.random()*data.length)];
            let isExist = false;
            for(let j = 0;j < listData.length; j++){
                if( item === listData[j] ){
                    isExist = true;
                    break;
                }
            }
            isExist ? i-- : listData.push(item);
        }
        return listData;
    }

}
export default AdvCom;