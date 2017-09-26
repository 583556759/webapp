import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {validatePhone,Msg,Url,setTitle} from 'buddy-util';
import * as Actions from '../../actions/actions';
import {appid,urlPath} from '../../core/config';
import './Signup.less';
class Signup extends React.Component{
    constructor(props){
        super(props);
        setTitle('注册米丽金融');
        this.state = {
            step   : Url.getUrlParam().step || 1,
            signup : Url.getUrlParam().step == 2 ? 'none':'flex',
            addinfo: Url.getUrlParam().step == 2 ? 'flex':'none',
            phone  : '',
            smscode: '',
            smscodeDisable : '',
            username : '',
            btnDisable:'disabled',
            buttonTitle:'获取验证码',
            wechatLogin: 'https://open.weixin.qq.com/connect/oauth2/authorize' +
            '?appid=' + appid +
            '&redirect_uri=' + Url.urlEncode(window.location.origin + '/?codefor=bind') +
            '&response_type=code' +
            '&scope=snsapi_userinfo' +
            '&state=123#wechat_redirect'
        }
    }
    handlePhoneChange(event){
        event.preventDefault();
        this.setState({
            phone : event.target.value
        })
    }
    handleSmscodeChange(event){
        event.preventDefault();
        this.setState({
            smscode    : event.target.value,
            btnDisable : ''
        })
    }
    handleUsernameChange(event){
        event.preventDefault();
        this.setState({
            username:event.target.value
        })
    }
    getSmscode(event){
        event.preventDefault();
        if(validatePhone(this.state.phone)){
            this.setState({
                smscodeDisable : 'disabled',
                second         : 60,
            });
            this.props.actions.xuser_sendSmscode({'phone':this.state.phone}).then((err)=>{
                console.log(err)
            });
            let int = setInterval(time,1000);
            let that = this;
            function time(){
                if(that.state.second !== 0){
                    that.setState({
                        second      : that.state.second - 1,
                        buttonTitle : that.state.second + 'S后重发'
                    });
                }else {
                    int=window.clearInterval(int);
                    that.setState({
                        buttonTitle    : '点击重发',
                        smscodeDisable : ''
                    })
                }
            }
        }else{
            Msg('手机号输入错误!','60%');
        }
    };
    signup(event){
        event.preventDefault();
        let {actions} = this.props;
        let param = {
            'thirdtype' : 'phone',
            'thirdid'   : this.state.phone,
            'smscode'   : this.state.smscode
        };
        actions.xuser_signup(param).then((data)=>{
            if(data.third_accounts.weixin){
                if(confirm('此手机号已绑定其他微信,是否继续绑定此微信帐号')){
                    window.location.href = this.state.wechatLogin;
                }else {
                    this.setState({
                        signup  : 'none',
                        addinfo : 'flex',
                        step    : 2
                    })
                }
            }else {
                window.location.href = this.state.wechatLogin
            }
        }, (err)=>{Msg('验证码错误!','60%');})
    }
    updateUser(event){
        event.preventDefault();
        let {actions} = this.props;
        let that = this;
        let param = {
            'user': {'name': this.state.username}
        };
        actions.xuser_updateUser(param).then(()=>{
            that.props.actions.xuser_synUserData().then(()=>{
                window.location.href = location.origin + '/index';
            })
        })
    }
    render(){
        return(
            <div style={{height:window.innerHeight}}>
                <ProgressBar step={this.state.step}/>
                <form onSubmit = {this.signup.bind(this)} className="signup" style={{display:this.state.signup}}>
                    <h1 className="title">米丽金融</h1>
                    <input
                        className   = "phone"
                        onChange    = {this.handlePhoneChange.bind(this)}
                        value       = {this.state.phone}
                        placeholder ="手机号"/>
                    <div className="code">
                        <input
                            className   = "smscode"
                            onChange    = {this.handleSmscodeChange.bind(this)}
                            value       = {this.state.smscode}
                            placeholder = "验证码"/>
                        <button
                            className = "btn getCode"
                            disabled  = {this.state.smscodeDisable}
                            onClick   = {this.getSmscode.bind(this)}
                        >{this.state.buttonTitle}</button>
                    </div>
                    <input type="submit" className="btn btn-success next" value="注册" disabled={this.state.btnDisable}/>
                </form>
                <form onSubmit={this.updateUser.bind(this)} className="addinfo" style={{display:this.state.addinfo}}>
                    <h1 className="title">完善信息</h1>
                    <p>完善信息以便我们更好地为您服务</p>
                    <input
                        className   = "username"
                        onChange    = {this.handleUsernameChange.bind(this)}
                        value       = {this.state.username}
                        placeholder = "请填写您的真实姓名"
                        required
                    />
                    <input type="submit"  className="btn btn-success bind" value="完善信息"/>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    let isReady = state.user.isReady;
    return{
        avatar   : isReady?state.user.user.avatar:'',
        username : isReady?state.user.user.name||state.user.user.nickname:'',
        alias    : isReady?state.user.user.level.alias:'普通会员'
    }
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Signup)
class ProgressBar extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <ul className="progressbar">
                <li className="active">验证手机</li>
                <li className={this.props.step==2?'active':''}>完善信息</li>
            </ul>
        )
    }
}