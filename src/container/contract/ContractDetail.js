/**
 * Created by HuangJinYu on 2017/4/24.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../actions/actions';
import NavTop from '../../components/nav/NavTop.jsx';
import {setTitle,Url,MoneyFormat} from 'buddy-util';
import jumpPage from '../../core/jumpPage'
class ContractDetail extends React.Component{
    constructor(){
        super();
        this.state = {
            rows : {}
        }
    }
    componentDidMount(){
        setTitle('合同详情');
        let {actions} = this.props;
        actions.getLocalUser();
        actions.creditLoan_contractDetail({contractid:Url.getUrlParam().contractid})/*.then((data)=>{
            console.log(data);
        })*/
    }
    render() {
        let {contractDetail} = this.props;
        let rows = {
            '借款人':contractDetail.name,
            '借款金额':MoneyFormat(contractDetail.amount*0.01||0)+'元',
            '手机号':this.props.phone,
            '日利率':contractDetail.day_interest_rate+'%',
            '日利息':MoneyFormat(contractDetail.dailyinterest*0.01||0)+'元',
            '生效时间':(contractDetail.start_dt_ui||"").split(" ")[0],
            '结束时间':(contractDetail.end_dt_ui||"").split(" ")[0],
            '营业部':contractDetail.sales_department

        };
        return (
            <div id="contract" style={{paddingTop:5,background:'#eff0f4',overflow:'auto',height:window.innerHeight}}>
                <NavTop
                    handleImgClick = {()=>jumpPage('me')}
                    avatar = {this.props.avatar}/>
                <DetailCard
                    rows = {rows}
                    />
                <div style={{width:'100%',marginTop:'2px'}}>
                    <div
                        style={{width:'100%',height:'40px',lineHeight:'40px',background:'#f7f7f7',padding:'0 10px 0 15px',borderBottom:'1px solid #efefef'}}
                        onClick = {()=>{jumpPage(`RepaymentPlan?contractid=${this.props.contractid}`)}}
                        >还款计划
                        <icon style={{fontSize:20,float:'right',color:'#a2a2a2'}} className="iconfont">&#xe602;</icon>
                    </div>
                    <div
                        style={{width:'100%',height:'40px',lineHeight:'40px',background:'#f7f7f7',padding:'0 10px 0 15px'}}
                        onClick = {()=>{jumpPage(`OverdueRecord?contractid=${this.props.contractid}`)}}
                        >逾期记录
                        <icon style={{fontSize:20,float:'right',color:'#a2a2a2'}} className="iconfont">&#xe602;</icon>
                    </div>
                    <button
                        style={{marginTop:15,width:'80%',height:'40px',margin:'10px auto',background:'#4076e6'}}
                        className="btn btn-info btn-block"
                        onClick = {()=>{alert('请转账到米丽钱包,平台会自动扣款9999')}}
                        >提前还款</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        avatar: state.user.isReady?state.user.user.avatar : '',
        phone : state.user.isReady?state.user.user.phone : '',
        contractDetail: state.contractDetail,
        contractid: state.contractDetail.contractid
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(ContractDetail)


class DetailCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {rows} = this.props;
        //模拟数组的map
        let row = ((callback)=>{
            let res = [];
            for(let a in rows){
                res.push(
                    callback(a,rows[a])
                )
            }
            return res;
        })(function(key,value){
            return(
                <Row
                    key   = {key}
                    title = {key}
                    value = {value}
                    />
            )
        });
        return (
            <div style={styles.container}>
                {row}
            </div>
        );
    }
}
class Row extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let {title,value} = this.props;
        return(
            <div style={styles.row}>
                <div style={styles.left}>{title}</div>
                <div style={styles.right}>{value}</div>
            </div>
        )
    }
}
let styles = {
    container : {
        padding    : '0 15px 5px 15px',
        background : '#fff'
        //border: '1px solid red'
    },
    row : {
        borderBottom:'1px solid #eee',
        height:'35px',
        lineHeight:'35px',
        width:'100%',
        overFlow:'hidden'
    },
    left:{
        color:'#808080',
        width:'20%',
        float:'left'
    },
    right:{
        textAlign:'right',
        float:'right',
        width:'80%'
    }

};