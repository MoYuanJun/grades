import React from 'react';
import './style.less';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchSpinState } from '../../../../actions/commonGlobal';

import { Input } from 'antd';

import { selectData } from '../../../../fetch';
import Upload from '../../../../components/Upload';
import { updateData } from '../../../../fetch';

//banner智能组件  +  木偶组件
class BannerSetting extends React.Component{
    state = {
        bannerData: [],
        copyData:[],
    }

    componentWillMount(){
        this.selectBannerData();
    }

    //查询数据
    selectBannerData = () => {
        const request = {
            tableName: 'banner',
            orderBy: {column:'ban_time', type: 'DESC'}
        };
        selectData({request}).then(res=>res.json()).then(json=>{
            if(json.error === '1'){
                this.setState({
                    bannerData: JSON.parse(JSON.stringify(json.content)), 
                    copyData: JSON.parse(JSON.stringify(json.content)),
                });
            }
        });
    }
    //切换到编辑状态：
    switchEditState = (id) =>{
        const { bannerData } = this.state;
        const target = bannerData.filter( item => (item.ban_id === id) )[0];
        target.editState = true;
        this.setState({bannerData});
    }

    //更新修改数据
    updataBannerData = (id, key, value) =>{
        const { bannerData } = this.state;
        const target = bannerData.filter(item => (item.ban_id === id))[0];
        target[key] = value;
        this.setState({bannerData});
    }

    //保存修改
    saveUpdateData = (id) => {
        const { bannerData, copyData } = this.state;
        const { switchSpinState } = this.props;

        //修改加载中组件状态
        switchSpinState(); 

        //获取要被更新的数据项
        const target = bannerData.filter( item => (item.ban_id === id) )[0];

        //更新数据库
        const request = {
            tableName: 'banner',
            params: {
                com_id: target.com_id,
                ban_img: target.ban_img,
            },
            where: {
                column: 'ban_id',
                value: target.ban_id
            }
        }
        updateData({request}).then(res=>res.json()).then(json=>{
            //修改加载中组件状态
            switchSpinState(); 

            if(json.error === '1'){
                console.log('%c更新数据成功！', 'color: green', json);
            }

        });

        //更新state
        const newCopyData = copyData.map((item, index, arr) => {
            if( item.ban_id === target.ban_id ){
                delete target.editState;
                return JSON.parse(JSON.stringify(target));
            } else {
                return item;
            }
        });
        this.setState({copyData: newCopyData});
    }

    //取消修改的数据
    cancelUapdeData = (id) => {
        const {bannerData, copyData } = this.state;
        const target = copyData.filter(item => (item.ban_id === id ))[0];
        const newBannerData = bannerData.map((item, index, arr) => {
            if(item.ban_id === target.ban_id){
                return JSON.parse(JSON.stringify(target));
            } else {
                return item;
            }
        });
        this.setState({bannerData: newBannerData});
    }

    render(){
        const { bannerData } = this.state;
        return (
            <div id="BannerSetting">
                {console.log('%cbanner组件this.state', 'background:blue', this.state)}
                {
                    bannerData && bannerData.length > 0 ? 
                    bannerData.map((item, index, arr) => {
                        return <BannerItem 
                                    key={index}
                                    data={item}
                                    operation={{
                                        updataBannerData: this.updataBannerData,
                                        cancelUapdeData: this.cancelUapdeData,
                                        updataBannerData: this.updataBannerData,
                                        saveUpdateData: this.saveUpdateData,
                                        switchEditState:this.switchEditState
                                    }}
                                />;
                    }) : <div></div>
                }
            </div>
        );
    }
}
//连接redux
function mapStateTo(state){
    return {};
}
function mapDispatchToProps(dispatch){
    return {
        switchSpinState: bindActionCreators(switchSpinState, dispatch)
    }
}

export default connect(
    mapStateTo,
    mapDispatchToProps
)(BannerSetting);

class BannerItem extends React.Component{
    getImgPath = (id, path) => {
        const { operation } = this.props;
        operation.updataBannerData(id, 'ban_img', path);
    }
    render(){
        const { data, operation } = this.props;
        return (
            <div className="float-left banner-item">
                <div className="banner-header clearfix">
                    <div className="float-left label">编号：</div>

                    <div className="float-left input">
                    { data.editState ? 
                        <Input
                            value={data.com_id}
                            onChange={(e) => {
                                operation.updataBannerData(data.ban_id, 'com_id', e.target.value);
                            }}
                        /> : data.com_id }
                    </div>
                    <div className="float-right btn">
                    { data.editState ? 
                        <span>
                            <a onClick={()=>{
                                operation.saveUpdateData(data.ban_id);
                            }}>保</a>
                            <a onClick={()=>{
                                operation.cancelUapdeData(data.ban_id);
                            }}>取</a>
                        </span> :
                        <a className="float-right" onClick={()=>{
                            operation.switchEditState(data.ban_id);
                        }}>修</a> }
                    </div>
                </div>
                <div className="banner-img">
                    {data.editState ? 
                    <Upload 
                        previewImg={data.ban_img}
                        uploadCatalog = "banner"
                        getImgPath={this.getImgPath.bind(this, data.ban_id)}
                        styleProps={{
                            width: '100%',
                            height: '100%'
                        }}
                    /> :  
                    <div className="banner-show">
                        <img src={data.ban_img} alt=""/>
                    </div>}
                </div>
            </div>
        );
    }
}