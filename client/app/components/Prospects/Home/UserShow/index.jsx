import React from 'react';

import './style.less';


class UserShowComponent extends React.Component{
  render(){
    return (
      <div id='userShow'>
        <div className='top'>
          <div className=''><img src={require('../../../../static/img/loginbg.png')} alt=""/></div>
          <div></div>
        </div>
      </div>
    );
  }
}
export default UserShowComponent;