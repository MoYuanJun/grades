/**文件上传木偶组件
 * 接口参数：
 * styleProps{
 *  svgSize: 上传图标字体大小, 例：'10px'
 *  pSize: 上传文字字体大小,  例：'10px'
 *  padding: 上传图标偏离位置,  例：'10px'
 *  width: 最外层容器宽,  例：'10px'
 *  height: 最外层容器高, 例：'10px'
 * }
 * 
 * getImgPath:父组件传来的方法 ==> 目的是为了获取上传文件路径  ==> 调用方法 getImgPath(imgUrl)
 */
import React from 'react';
import './style.less';
import {Upload, Button, Icon, message, Modal} from 'antd';
import { uploadFile } from '../../fetch';

class Demo extends React.Component {
  state = {
    isShowUpIcon:true,  //是否现在上传图标
    isShowUpRes:false,  //是否显示预览图(上传图片后显示预览)
    upResData:null,     //上传图形数据，作为预览图片的数据
    isUploadSucceed: false, //监听是否上传成功文件
    img:''  //存储上传图片路径
  }
;

  uploadChangeHandler = (e) => { 
    if(e.target.files && e.target.files[0]){  
        this.setState({isShowUpIcon: false , isShowUpRes: true });
        this.setState({upResData: window.URL.createObjectURL(e.target.files[0]) });
        const data = new FormData();
        data.append('file', e.target.files[0]);
        uploadFile(data).then(res=>res.json()).then(json=>{
          if(json.error === '1'){
            this.props.getImgPath(json.img);
            this.setState({isUploadSucceed: true});
          } else {
            //
          }
        });
    } else {
        this.setState({isShowUpIcon: true , isShowUpRes: false, isUploadSucceed: false});
    }
  }

  render(){
    const {styleProps} = this.props;
    const style ={
      svgSize: styleProps && styleProps.svgSize ? styleProps.svgSize : '50px',
      pSize: styleProps && styleProps.pSize ? styleProps.pSize : '16px',
      upload :{
        width: styleProps && styleProps.width ? styleProps.width : '200px',
        height: styleProps && styleProps.height ? styleProps.height : '200px',
      },
      upIcon : {
        padding: styleProps && styleProps.padding ? styleProps.padding : '60px',
        display:this.state.isShowUpIcon ? 'block' : 'none',
        textAlign:'center',
        color: '#ccc'
      },
      upRes : {
        width: styleProps && styleProps.width ? styleProps.width : '200px',
        height: styleProps && styleProps.height ? styleProps.height : '200px',
        display:this.state.isShowUpRes ? 'block' : 'none'
      }
    }
    return (
        <div id='upload' className={this.state.isUploadSucceed ? 'UploadSucceed' : ''} style={style.upload}>
          <input name='upfile' type="file" onChange={this.uploadChangeHandler} />
          <div className='up-icon' style={style.upIcon}>
              <svg className='icon' style={{fontSize: style.svgSize}} aria-hidden='true'><use xlinkHref='#icon-shangchuan'></use></svg>
              <p style={{fontSize: style.pSize}}>上传</p>
          </div>
          <div className='up-res' style={style.upRes}>
              <img src={this.state.upResData} alt="浏览图"/>
          </div>
          {console.log('%c监听this.state', 'background:red', this.state)}
        </div>
    );
  }
}
export default Demo;

