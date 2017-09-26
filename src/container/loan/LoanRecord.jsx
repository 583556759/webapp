import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../actions/actions';
import {setTitle,MoneyFormat} from 'buddy-util';
import {getCurrentUser,urlPath} from '../../core/config';
import NavTop from '../../components/nav/NavTop.jsx';
import {PullToRefresh} from 'buddyui'
import LoanRecordCard from '../../components/loan/LoanRecordCard.jsx';
import jumpPage from '../../core/jumpPage';
class LoanRecord extends React.Component{
    constructor(props){
        super(props);
        getCurrentUser(this.props.actions);
        this.state = {
            isLastPullReady : true
        }
    }
    componentDidMount(){
        setTitle('借款记录');
        let {actions} = this.props;
        actions.getLocalUser();
        actions.creditLoan_contractQuery({'next_page':1});
    }
    pullToRefresh= (event)=>{
        event.preventDefault();
        let {actions,nextPage} = this.props;
        actions.getLocalUser();
        if(!!nextPage && this.state.isLastPullReady){
            this.setState({
                isLastPullReady : false
            });
            actions.creditLoan_contractQuery({'next_page':nextPage}).then(()=>{
                this.setState({
                    isLastPullReady : true
                })

            });
        }
    }
    render(){
        let {nextPage,avatar,contracts} = this.props;
        let LoanRecordCards = contracts.length !== 0 ?contracts.map(function(contract,index){
            return(
                <LoanRecordCard

                    handleClick = {()=>jumpPage(`contractDetail?contractid=${contract.contractid}`)}
                    key    = {contract.contractid+index}
                    amount = {MoneyFormat(contract.amount*0.01||0)}
                    time   = {contract.start_dt_ui.split(" ")[0]}
                    title  = {contract.product_type}
                    status = {contract.status}
                />
            )
        }) : <div style={{color:'#808080',textAlign:'center'}}>您没有借款记录</div>;
        return(
            <div style={{background:'#eee'}}>
                <NavTop
                    avatar={avatar}/>
                <div style={{display:'flex',textAlign:'center',flexDirection:'column',justifyContent:'center',background:'#fff',color:'skyblue',marginBottom:10,height:20}}>
                </div>
                <PullToRefresh
                    nextPage = {nextPage}
                    handleRefresh={this.pullToRefresh}>
                    {LoanRecordCards}
                </PullToRefresh>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        avatar   : state.user.isReady?state.user.user.avatar : '',
        nextPage : state.contracts.nextPage,
        contracts: state.contracts.contracts||[]
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(LoanRecord)
