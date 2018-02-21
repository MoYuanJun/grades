import React from 'react';
import './style.less';
import {Upload, Button, Icon, message, Modal} from 'antd';

import { uploadFile } from '../../fetch';

class Demo extends React.Component {
  
  state = {
    isShowUpIcon:true,
    isShowUpRes:false,
    upResData:null
  }

  clickHandler = ()=>{
    var input = document.querySelector('input[type="file"]');
    var data = new FormData()
    data.append('file', input.files[0])
    data.append('user', 'hubot')
    uploadFile(data).then(res=>res.text()).then(json=>{
      console.log(json);
    });
  }
  
  uploadChangeHandler = (e) => { 
    if(e.target.files && e.target.files[0]){  
        this.setState({isShowUpIcon: false , isShowUpRes: true });
        this.setState({upResData: window.URL.createObjectURL(e.target.files[0]) });
    } else {
        this.setState({isShowUpIcon: true , isShowUpRes: false });
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
        display:this.state.isShowUpRes ? 'block' : 'none'
      }
    }
    return (
        <div id='upload' style={style.upload}>
            <input name='upfile' type="file" onChange={this.uploadChangeHandler} />
            <div className='up-icon' style={style.upIcon}>
                <svg className='icon' style={{fontSize: style.svgSize}} aria-hidden='true'><use xlinkHref='#icon-shangchuan'></use></svg>
                <p style={{fontSize: style.pSize}}>上传</p>
            </div>
            <div className='up-res' style={style.upRes}>
                <img src={this.state.upResData} alt="浏览图"/>
            </div>
        </div>
    );
  }
}
export default Demo;

