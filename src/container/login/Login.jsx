import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {validatePhone,Msg,Url,setTitle} from 'buddy-util';
import * as Actions from '../../actions/actions';
import {appid,urlPath} from '../../core/config';
import jumpPage from '../../core/jumpPage';
import './Login.less';
class Login extends React.Component{
    constructor(props){
        super(props);
        setTitle('登录米丽金融');
        this.state = {
            phone  : '',
            smscode: '',
            smscodeDisable : '',
            btnDisable:'disabled',
            buttonTitle:'获取验证码',
            wechatLogin : 'https://open.weixin.qq.com/connect/oauth2/authorize' +
            '?appid='+appid+
            '&redirect_uri=' + Url.urlEncode(location.origin+'/?codefor=login') +
            '&response_type=code' +
            '&scope=snsapi_userinfo' +
            '&state=123#wechat_redirect'
        }
    }
    handlePhoneChange(event){
        this.setState({
            phone : event.target.value
        })
    }
    handleSmscodeChange(event){
        this.setState({
            smscode : event.target.value,
            btnDisable:''
        })
    }
    getSmscode(event){
        event.preventDefault();
        if(validatePhone(this.state.phone)){
            this.setState({
                smscodeDisable:'disabled',
                second:60
            });
            this.props.actions.xuser_sendSmscode({'phone':this.state.phone}).then((err)=>{
                console.log(err)
            });
            let int = setInterval(time,1000);
            let that = this;
            function time(){
                if(that.state.second !== 0){
                    that.setState({
                        second: that.state.second - 1,
                        buttonTitle:that.state.second + 'S后重发'
                    });
                }else {
                    int=window.clearInterval(int);
                    that.setState({
                        buttonTitle:'点击重发',
                        smscodeDisable:''
                    })
                }
            }
        }else{
            Msg('手机号输入错误!','60%');
        }
    };
    login(event){
        event.preventDefault();
        let {actions} = this.props;
        let param = {
            'thirdtype' : 'phone',
            'thirdid'   : this.state.phone,
            'smscode'   : this.state.smscode
        };
        actions.xuser_signup(param).then(()=>{
            jumpPage('index');
        }, (err)=>{Msg('验证码错误!','60%');})
    };
    componentWillUnmount(){
        clearInterval(int);
    }
    render(){
        return(
            <div style={{height:window.innerHeight}}>
                <form onSubmit = {this.login.bind(this)} className="login" style={{display:this.state.signup}}>
                    <h1 className="title">米丽金融</h1>
                    <input
                        className   = "phone"
                        onChange    = {this.handlePhoneChange.bind(this)}
                        value       = {this.state.phone}
                        placeholder ="手机号"
                        required/>
                    <div className="code">
                        <input
                            className   = "smscode"
                            onChange    = {this.handleSmscodeChange.bind(this)}
                            value       = {this.state.smscode}
                            placeholder = "验证码"
                            required/>
                        <button
                            className = "btn getCode"
                            disabled  = {this.state.smscodeDisable}
                            onClick   = {this.getSmscode.bind(this)}
                        >{this.state.buttonTitle}</button>
                    </div>
                    <input type="submit" className="btn btn-success next" value="登录" disabled={this.state.btnDisable}/>
                    <a href={this.state.wechatLogin} type="button"  className="bind">微信快速登录</a>
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
export default connect(mapStateToProps,mapDispatchToProps)(Login)
