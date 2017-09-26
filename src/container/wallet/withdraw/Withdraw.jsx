/**
 * Created by 123 on 2017/7/20.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../../actions/actions';
import NavTop from '../../../components/nav/NavTop.jsx';
import {setTitle,Url,MoneyFormat} from 'buddy-util';
import jumpPage from '../../../core/jumpPage';
import {PullToRefresh} from 'buddyui'
class Withdraw extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        setTitle('取现');
        this.props.actions.getLocalUser();
    }
    render(){
        return (
            <div style={{width:'100%'}}>
                <NavTop
                    handleImgClick = {()=>jumpPage('me')}
                    avatar = {this.props.avatar}/>
                <div style={style.main}>
                    <div style={style.withdrawTitle}>
                        <span>银行卡</span>
                        <span style={style.bankcard}>工商银行(9919)</span>
                    </div>
                    <div style={style.cash}>提现金额</div>
                    <div>
                        ￥<input style={style.input} type="text"/>
                    </div>
                    <div style={style.nowCash}>可提取现金:<span>666元</span></div>
                </div>
                <div onClick = {()=>{alert(1)}} style={style.button}><span style={{fontSize:18,color:'#fff'}}>申请提现</span></div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user:state.user,
        avatar: state.user.isReady?state.user.user.avatar : ''
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Withdraw)
const style={
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
        margin:'20px auto',
        width:'90%',
        height:'40px',
        textAlign:'center',
        background:'green',
        lineHeight:'40px',
        borderRadius:'5px'
    }

};