import React from 'react';
import './style.less';
import {Upload, Button, Icon, message, Modal} from 'antd';

import { uploadFile } from '../../fetch';

class Demo extends React.Component {
  clickHandler = ()=>{
    var input = document.querySelector('input[type="file"]');

    var data = new FormData()
    data.append('file', input.files[0])
    data.append('user', 'hubot')

    uploadFile(data).then(res=>res.text()).then(json=>{
      console.log(json);
    });
  }
  
  viewmypic(e) {  
    if(e.target.files && upfile.files[0]){  
      let mypic = document.getElementById('showimg');
      console.log(mypic, upfile.files[0]);
      mypic.style.display="";  
      mypic.src = window.URL.createObjectURL(upfile.files[0]);  
    }
  }
  render(){
    return (
      <div>
        <div className="fileInput">
          <input name="upfile" type="file" id="upfile" onChange={this.viewmypic} />
          <div className='fileValue'>
            <svg className='icon' aria-hidden='true'>
              <use xlinkHref='#icon-shangchuan'></use>
            </svg>
          </div>
        </div>
        <img name="showimg" id="showimg" src="" style={{display:'none'}} alt="预览图片" /> 
      </div>
    );
  }
}
export default Demo;

