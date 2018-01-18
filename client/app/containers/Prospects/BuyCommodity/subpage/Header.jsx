/* 单独商品展示 ==> 头部智能组件 ==> 因为业务不同 */
import React from 'react';
import HeaderComponetn from '../../../../components/Prospects/Home/Header';

class Header extends React.Component{
  constructor(){
    super();
    this.state = {placeholder:''}
  }

  /* 搜索事件处理器 */
  searchHandler(value){
    this.props.history.push('/prospects/search/'+value);
    this.setState({ placeholder: value });
  }
  render(){
    return (
      <div>
        <HeaderComponetn searchHandler={this.searchHandler.bind(this)}
                         placeholder={this.state.placeholder}
        />
      </div>
    );
  }
}

export default Header;