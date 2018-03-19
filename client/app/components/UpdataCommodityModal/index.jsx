import React from 'react';
import { Modal, Button } from 'antd';

class UpdataCommodityModal extends React.Component{
    render(){
        return (
            <div>
                <Modal title="Title"
                    /* visible={visible} */
                    width="90%"
                    visible={true}
                    onOk={()=>{}}
                    confirmLoading={false}
                    onCancel={()=>{}}
                    >
                    <p>11111111111111111 <br/><br/><br/><br/><br/><br/><br/><br/></p>
                </Modal>
            </div>
        );
    }
}
export default UpdataCommodityModal;

/* 
import { Modal, Button } from 'antd';

class App extends React.Component {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Open</Button>
        
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);


*/