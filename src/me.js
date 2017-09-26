import React from 'react';
import NavBottom from './components/nav/NavBottom.jsx';
import {setTitle} from 'buddy-util';
import {getCurrentUser} from './core/config';
import { connect } from 'react-redux';
import {bindActionCreators } from 'redux';
import * as Actions from './actions/actions';
import {SingleSlice,MultiSlice} from './components/multiSlice/MultiSlice';
import {Avatar,Confirm} from 'buddyui';
import jumpPage from './core/jumpPage';
class Me extends React.Component{
    constructor(props){
        super(props);
        getCurrentUser(this.props.actions);
        this.state = {
            loginOutDisplay : 'none'
        }
    }
    componentDidMount(){
        setTitle('我');
        this.props.actions.getLocalUser();
    }
    render(){
        let {username,alias,avatar} = this.props;
        return(
            <div style={{fontFamily:'微软雅黑',background:'#eee',height:window.innerHeight}}>
                <Avatar src = {avatar}>
                    <p>
                        <span>{username}</span>
                        <span className="Right">{alias}</span>
                    </p>
                </Avatar>
                <div style={{marginTop:20}}>
                    <MultiSlice>
                        <SingleSlice
                            icon         = "&#xe61d;"
                            iconColor    = "#FFCC00"
                            title        = "实名认证"
                            //href         = {'index.html#/balance'}
                            value = {<icon className="iconfont">&#xe602;</icon>}
                            borderBottom = {true}
                        />
                        <SingleSlice
                            icon         = "&#xe678;"
                            iconColor    = "green"
                            title        = "关系认证"
                            //href         = {'index.html#/asset'}
                            value = {<icon className="iconfont">&#xe602;</icon>}
                            borderBottom = {false}
                        />
                    </MultiSlice>
                </div>
                <div style={{marginTop:20}}>
                    <MultiSlice>
                        <SingleSlice
                            icon         = "&#xe600;"
                            iconColor    = "red"
                            title        = "资产认证"
                            //href         = {'index.html#/balance'}
                            borderBottom = {false}
                            value = {<icon className="iconfont">&#xe602;</icon>}
                        />
                    </MultiSlice>
                </div>
                <div style={{marginTop:20}}>
                    <MultiSlice>
                        <SingleSlice
                            icon         = "&#xe6bc;"
                            iconColor    = "green"
                            title        = "退出登录"
                            handleClick  = {()=>{this.setState({loginOutDisplay:'block'})}}
                            borderBottom = {false}
                        />
                    </MultiSlice>
                </div>
                <Confirm
                    display = {this.state.loginOutDisplay}
                    title = "退出登录"
                    footerLeft = "确定"
                    footerRight = "取消"
                    footerLeftOnclick = {()=>{localStorage.clear();jumpPage('login')}}
                    footerRightOnclick = {()=>{this.setState({loginOutDisplay:'none'})}}>
                     <div>确定退出登录?</div>
                 </Confirm>
                <NavBottom/>
            </div>
        );
    }
}

Me.defaultProps = {
    alias    : '普通会员',
    avatar   : '',
    username : ''
};
const mapStateToProps = (state)=>{
    let isReady = state.user.isReady;
    return{
        avatar   : isReady?state.user.user.avatar:'',
        username : isReady?state.user.user.name||state.user.user.nickname:'',
        alias    : '普通会员'
    }
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Me)
