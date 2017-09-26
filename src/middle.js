/**
 * Created by HuangJinYu on 2017/5/1.
 */
import React from 'react';
import { bindActionCreators } from 'redux';
import NavBottom from './components/nav/NavBottom.jsx';
import { connect } from 'react-redux';
import {getCurrentUser} from './core/config';
import {MultiSlice,SingleSlice} from './components/multiSlice/MultiSlice';
import {setTitle,MoneyFormat} from 'buddy-util';
import * as Actions from './actions/actions';
import jumpPage from './core/jumpPage';

class Middle extends React.Component{
    constructor(props){
        super(props);
        getCurrentUser(this.props.actions);
    }
    componentDidMount(){
        setTitle('钱包余额');
        this.props.actions.wallet_balanceQuery({})
    }
    render(){
        return (
            <div style={style.container}>
                <div style={style.main}>
                    <p style={style.balanceTitle}>
                        <span>钱包余额(元)</span>
                         <span style={style.right}>
                            账单
                         </span>
                    </p>
                    <p style={style.balance}>
                        {MoneyFormat(this.props.balance)}
                    </p>
                    {/*<p style={style.freeze}>*/}
                        {/*{"提现中: "+100}*/}
                    {/*</p>*/}
                </div>
                <MultiSlice>
                    <SingleSlice
                        handleClick     = {()=>{jumpPage('Recharge')}}
                        icon         = "&#xe67c;"
                        iconColor    = "rgb(0, 165, 255)"
                        title        = "充值"
                        //href         = {'index.html#/balance'}
                        borderBottom = {true}
                        value = {<icon className="iconfont">&#xe602;</icon>}
                    />
                    <SingleSlice
                        handleClick     = {()=>{jumpPage('Withdraw')}}
                        icon         = "&#xe66c;"
                        iconColor    = "orange"
                        title        = "提现"
                        //href         = {'index.html#/balance'}
                        //borderBottom = {true}
                        value = {<icon className="iconfont">&#xe602;</icon>}
                    />
                </MultiSlice>
                <NavBottom/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user:state.user,
        balance:state.balance.balance*0.01||0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Middle)
const style = {
    container:{
        background : '#eee' ,
        height     : window.innerHeight
    },
    main:{
        background : 'rgb(0, 165, 255)',
        width      : '100%',
        height     : '2rem',
        padding    : '30px 15px 30px 15px',
        opacity    : 0.8
    },
    balanceTitle:{
        color        : '#eee',
        marginBottom : '20px'
    },
    right:{
        float  : 'right'
    },
    balance:{
        color    : '#fff',
        fontSize : 60
    },
    freeze:{
        color    : '#fff',
        fontSize : 16
    }
};