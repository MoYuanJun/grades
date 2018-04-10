/* 木偶组件资料修改 */
/* props接口： 
    history = { this.props.history } 
    basicInfoShow: true || fasle  //是否显示基本信息修改
    passwordRemoveShow：true || false  //是否显示密码修改
*/

import React from 'react';
import { hex_md5 } from '../../../static/js/md5';
import { Divider, Row, Col, Input, Button, AutoComplete, Radio } from 'antd';
const RadioGroup = Radio.Group;
const Option = AutoComplete.Option;
import Upload from '../../Upload';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateData, selectData, updatePassword} from '../../../fetch';
import { updataUser, clearUserInfo } from '../../../actions/userInfoAction';
import { switchSpinState } from '../../../actions/commonGlobal';
class MyDataModification extends React.Component{
    state = {
        emailAutoArr:[],
        userInfo: {}, 
        oldPasswordError: '0',   //旧密码是否输入错误  0表示未触发表单验证 1表示正确 2表示错误
        newPasswordError: '0',    //新密码是否输入错误   
        password:{},
    }
    //邮箱自动补全,在输入框内输入内容时触发，更新option数据
    emailHandleSearch = (value) => {
        let emailAutoArr;
        if (!value || value.indexOf('@') >= 0) {
            emailAutoArr = [];
        } else {
            emailAutoArr = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
        }
        this.setState({ emailAutoArr });
        this.changeUserInfo('email', value);
    }
    //更新this.state.userInfo
    changeUserInfo = (key, value) => {
        const { userInfo } = this.state;
        userInfo[key] = value;
        this.setState({userInfo});
    }
    //重新查询用户数据 并重置redux
    userInfoUpdae = () => {
        const { updataUser, switchSpinState } = this.props;
        const { userInfo } = this.state;
        const  request = {
                      tableName: 'users',   
                      where: {
                        column: 'u_id',
                        value: userInfo.u_id
                      },         
                };
        selectData({request}).then(res=>res.json()).then(json=>{
            if(json.error === '1' ){
                updataUser(json.content[0]);
                console.log('%c查询数据成功！', 'color: green', json);
            }
            //切换加载状态
            switchSpinState();
        });
    }
    //用户基本信息修改提交
    submitUserInfo = () => {
        const { switchSpinState } = this.props;
        const { userInfo } = this.state;
        const params = JSON.parse(JSON.stringify(userInfo));
        params.u_id ? delete params.u_id : '';
        //切换加载中状态
        switchSpinState();
        const request = {
                   tableName: 'users',
                   params,
                   where:{  //条件：字段 以及字段值
                       column: 'u_id',
                       value: userInfo.u_id
                   }
               };
        updateData({request}).then(res=>res.json()).then(json=>{
            if(json.error === '1'){
                this.userInfoUpdae();
                console.log('%c更新成功！', 'color: green', json);
            } else {
                //切换加载中状态
                switchSpinState();
            }
        });
    }
    //修改密码提交
    submiPassword = () => {
        const { password, userInfo } = this.state;
        const { switchSpinState, clearUserInfo, history } = this.props;
        const request = Object.assign({}, password, {uid: userInfo.u_id});
        if( !request.old || !request.new || !request.uid ){
            return ;
        }
        switchSpinState();
        updatePassword(request).then(res=>res.json()).then(json=>{
            switchSpinState();
            if(json.error === '1'){
                console.log('%c密码修改成功', 'color:green', json);
                clearUserInfo();
                history.push('/login/login');
            }
        });
    }
    componentWillReceiveProps(nextProps){
        this.setState({userInfo: JSON.parse(JSON.stringify(nextProps.userInfo))});
    }
    componentDidMount(){
        const { userInfo } = this.props;
        userInfo ? this.setState({userInfo: JSON.parse(JSON.stringify(userInfo))}) : '';
    }
    render(){
        const { emailAutoArr, userInfo, oldPasswordError, newPasswordError, password } = this.state;
        const { basicInfoShow, passwordRemoveShow } = this.props;
        //email 配置
        const children = emailAutoArr.map((email) => {
            return <Option key={email}>{email}</Option>;
        });
        //图标
        const icon = {
            false: <span style={{color: 'green'}}>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-cuowu-tianchong"></use>
                    </svg>
                </span>,
            true:  <span style={{color: 'red'}}>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-icon"></use>
                    </svg>
                </span>,
        }
        return (
            <div id="MyDataModification">
                <div className="basic-info" style={{display: basicInfoShow ? 'block' : 'none'}}>
                    <Divider orientation="left" dashed>基本信息编辑</Divider>
                    <div className="clearfix">
                        <div className="float-left info-head-img">
                            <Upload 
                                previewImg={userInfo.head_img}
                                getImgPath={(path)=>{
                                    this.changeUserInfo('head_img', path);
                                }}
                                uploadCatalog="userimg"
                                styleProps={{
                                    svgSize: '30px',
                                    pSize: '14px',
                                    padding:'35px',
                                    width: '130px',
                                    height: '130px'
                                }}
                            />
                        </div>
                        <div className="float-right info-list">
                            {/* 第一行：账号、昵称、姓名 */}
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Row  gutter={5}>
                                        <Col span={4}>
                                            <span className="label">账号: </span>
                                        </Col>
                                        <Col span={20}>
                                            <Input disabled value={userInfo.username}/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Row>
                                        <Col span={4}>
                                            <span className="label">昵称: </span> 
                                        </Col>
                                        <Col span={20}>
                                            <Input 
                                                value={userInfo.nickname } 
                                                placeholder="未设置昵称"
                                                onChange={(e) => {
                                                    this.changeUserInfo('nickname', e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Row>
                                        <Col span={4}>
                                            <span className="label">姓名: </span> 
                                        </Col>
                                        <Col span={20}>
                                            <Input 
                                                value={userInfo.name} 
                                                placeholder="未设置姓名"
                                                onChange={(e) => {
                                                    this.changeUserInfo('name', e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <br/>
                            {/* 第二行：地址、电话、邮箱 */}
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Row  gutter={5}>
                                        <Col span={4}>
                                            <span className="label">地址: </span>
                                        </Col>
                                        <Col span={20}>
                                            <Input 
                                                value={userInfo.addr} 
                                                placeholder="为设置地址"
                                                onChange={(e) => {
                                                    this.changeUserInfo('addr', e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Row>
                                        <Col span={4}>
                                            <span className="label">电话: </span> 
                                        </Col>
                                        <Col span={20}>
                                            <Input 
                                                value={userInfo.phone} 
                                                placeholder="未设置电话"
                                                onChange={(e) => {
                                                    this.changeUserInfo('phone', e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Row>
                                        <Col span={4}>
                                            <span className="label">邮箱: </span> 
                                        </Col>
                                        <Col span={20}>
                                            <AutoComplete
                                                style={{width:'100%'}}
                                                value={userInfo.email}
                                                onSearch={
                                                    this.emailHandleSearch
                                                }
                                                onSelect={(value)=>{
                                                    this.changeUserInfo('email', value);
                                                }}
                                                placeholder="未设置邮箱"
                                            >
                                                {children}
                                            </AutoComplete>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <br/>
                            {/* 第三行：性别、按钮 */}
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Row  gutter={5}>
                                        <Col span={4}>
                                            <span className="">性别: </span>
                                        </Col>
                                        <Col span={20}>
                                            <RadioGroup 
                                                onChange={(e)=>{
                                                    this.changeUserInfo('gender', e.target.value);
                                                }} 
                                                value={userInfo.gender}
                                            >
                                                <Radio value={'男'}>男</Radio>
                                                <Radio value={'女'}>女</Radio>
                                            </RadioGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="submit">
                        <Button type="primary"
                            onClick={() => {
                                this.submitUserInfo();
                            }}
                        >提交修改</Button>
                    </div>
                </div>
                <div className="password-remove" style={{display: passwordRemoveShow ? 'block' : 'none'}}>
                    <Divider orientation="left" dashed>账号密码修改</Divider>
                    <div className="content" style={{padding: '0 20px 20px 20px'}}>
                        <Row>
                            <Col span={4}><span className="label">原密码：</span></Col>
                            <Col span={20}>
                                <Input 
                                    value={password.old}
                                    type="password"
                                    suffix={
                                        oldPasswordError === '1' ? icon.true :
                                        oldPasswordError === '2' ? icon.false : ''
                                    }
                                    onChange = { (e) => {
                                        if(oldPasswordError !== '0' && hex_md5(e.target.value) === userInfo.password){
                                            this.setState({oldPasswordError: '1'});
                                        } else if( oldPasswordError !== '0' ) {
                                            this.setState({oldPasswordError: '2'});
                                        }
                                        if(!e.target.value){
                                            this.setState({oldPasswordError: '0'});
                                        }
                                        const password = this.state.password;
                                        password.old = e.target.value;
                                        this.setState({password});
                                    } }
                                    onBlur={(e) => {
                                        if(hex_md5(e.target.value) !== userInfo.password){
                                            this.setState({oldPasswordError: '2'});
                                        } else {
                                            this.setState({oldPasswordError: '1'});
                                        }
                                    }}
                                />
                            </Col>
                        </Row>
                        {oldPasswordError === '2' ? <p className="errort-text">原密码输入错误，请重新输入！</p> : ''}
                        <br/>
                        <Row>
                            <Col span={4}><span className="label">新密码：</span></Col>
                            <Col span={20}>
                                <Input
                                    value={password.new} 
                                    type="password"
                                    suffix={
                                        newPasswordError === '1' ? icon.true :
                                        newPasswordError === '2' ? icon.false : ''
                                    }
                                    onChange = { (e) => {
                                        if( hex_md5(e.target.value) !== userInfo.password){
                                            this.setState({newPasswordError: '1'});
                                        } else {
                                            this.setState({newPasswordError: '2'});
                                        }
                                        if(e.target.value === ''){
                                            this.setState({newPasswordError: '0'});
                                        }
                                        const password = this.state.password;
                                        password.new = e.target.value;
                                        this.setState({password});
                                    } }
                                    
                                />
                            </Col>
                        </Row>
                        {newPasswordError === '2' ? <p className="errort-text">新密码不能和原密码一样！</p> : ''}
                        <div className="btn">
                            <Button type="primary"
                                onClick={() => {
                                    this.submiPassword();
                                }}
                            >提交修改</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
//redux
function mapStateToProps(state){
    return {
        userInfo:state.userInfo,
    }
}
function mapDispatchToProps(dispatch){
    return {
        updataUser: bindActionCreators(updataUser, dispatch),
        switchSpinState: bindActionCreators(switchSpinState, dispatch),
        clearUserInfo: bindActionCreators(clearUserInfo, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyDataModification);