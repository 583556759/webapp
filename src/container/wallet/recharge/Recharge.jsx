/**
 * Created by 123 on 2017/7/20.
 */
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
import {SingleSlice,MultiSlice} from '../../../components/multiSlice/MultiSlice';
import RechargeAmount from '../../../components/recharge/RechargeAmount.jsx';
import './Recharge.less';

class Recharge extends React.Component{
    constructor(props){
        super(props);
        this.state={
            focused:0
        };
        getCurrentUser(this.props.actions);
        this.getAmount=this.getAmount.bind(this);
    }
    componentDidMount(){
        setTitle('充值');
        this.props.actions.getLocalUser();
        this.props.actions.wallet_balanceQuery({})
    }
    /*onClick(amount){
        this.setState({focused:!this.state.focused})
    }*/
    getAmount(amount,index){
        this.setState({focused:index});
        this.setState({amount:amount});
    }
    render(){
        let arrs=['2000','4000','10000','20000','30000','60000'];
        const {focused}=this.state;
        //console.log(focused);
        let getAmount=this.getAmount;
        //console.log(this.getAmount);
        let RechargeCard=arrs.map(function(arr,index){
            //console.log(this.getAmount)
            return(
                <RechargeAmount key={index} index={index} amount={arr} selected={index==focused?true:false} getAmount={getAmount}/>
            )
        });
        return (
            <div className='container'>
                <NavTop
                    handleImgClick = {()=>jumpPage('me')}
                    avatar = {this.props.avatar}/>
                <div className='main'>
                    <div>请选择充值金额</div>
                    {RechargeCard}
                    {/* <RechargeAmount amount='2000' onClick={()=>{alert(1)}}/>*/}
                </div>
                <div className='method'>
                    <div className='pay'>选择支付方式</div>
                    <div>
                        <icon style={{fontSize:40,color:'green',float:'left'}} className="iconfont">&#xe649;</icon>
                        <icon style={{fontSize:35,color:'#888',float:'right'}} className="iconfont">&#xe614;</icon>
                    </div>
                    <div onClick = {()=>{alert('支付成功OK')}} className='button'><span className='span'>立即支付</span></div>
                </div>
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
export default connect(mapStateToProps,mapDispatchToProps)(Recharge);