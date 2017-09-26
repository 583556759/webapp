/**
 * Created by HuangJinYu on 2017/5/1.
 */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getCurrentUser} from '../../../core/config';
import {setTitle} from 'buddy-util';
import * as Actions from '../../../actions/actions';
import NavTop from '../../../components/nav/NavTop.jsx';

class Balance extends React.Component{
    constructor(props){
        super(props);
        getCurrentUser(this.props.actions);
    }
    componentDidMount(){
        setTitle('钱包余额');
        this.props.actions.wallet_balanceQuery({}).then((data)=>{
            console.log(data);
        })
    }
    render(){
        return (
            <div style={style.container}>
                <NavTop
                    handleImgClick = {()=>jumpPage('me')}
                    avatar = {this.props.avatar}/>
                <div style={style.main}>
                    <p style={style.balanceTitle}>
                        <span>钱包余额(元)</span>
                         <span style={style.right}>
                            账单
                         </span>
                    </p>
                    <p style={style.balance}>
                        1000
                    </p>
                    <p style={style.freeze}>
                        {"提现中: "+100}
                    </p>
                </div>
                <div style={styleB.main}>
                    <div style={styleB.withdrawTitle}>
                        <span>银行卡</span>
                        <span style={styleB.bankcard}>工商银行(9919)</span>
                    </div>
                    <div style={styleB.cash}>提现金额</div>
                    <div>
                        ￥<input style={styleB.input} type="text"/>
                    </div>
                    <div style={styleB.nowCash}>可提取现金:<span>0.78元</span></div>
                </div>
                <div onClick = {()=>{alert(1)}} style={styleB.button}>申请提现</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user:state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Balance)
const styleB={
    main:{
        background : '#fff',
        width      : '100%',
        height     : '2rem',
        padding    : '30px 30px 30px 30px',
        opacity    : 0.8,
        marginTop  : 15
    },
    withdrawTitle:{
        color        : '#666',
        marginBottom : '20px'
    },
    bankcard:{
        marginLeft:'30%'
    },
    cash:{
        margin:'20px 0 20px 0'
    },
    /*money:{
        border:'1px solid red'
    },*/
    input:{
        width:'60%',
        fontSize:12,
        border:0,
        borderBottom:'1px solid #000',
        outline:'none'
    },
    nowCash:{
        margin:'20px 0 20px 0'
    },
    button:{
        marginTop:'20px',
        width:'100%',
        height:'30px',
        textAlign:'center',
        background:'green',
        lineHeight:'30px'
    }

};
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