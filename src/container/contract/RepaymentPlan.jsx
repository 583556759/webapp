/**
 * Created by 123 on 2017/7/13.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../actions/actions';
import NavTop from '../../components/nav/NavTop.jsx';
import {setTitle,Url,MoneyFormat} from 'buddy-util';
import jumpPage from '../../core/jumpPage';
import {PullToRefresh} from 'buddyui'
import Card from '../../components/card/Card.jsx';
import Row from '../../components/row/Row.jsx';
class RepaymentPlan extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        setTitle('还款计划');
        let {actions}=this.props;
        actions.getLocalUser();
        actions.creditloan_repaymentPlan({contractid:Url.getUrlParam().contractid});
    }
    pullToRefresh(event){
        event.preventDefault();
        let {actions,nextPage} = this.props;
        if(Boolean(nextPage) && this.state.isLastPullReady){
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
        let {plans} = this.props;
        //console.log(plans);
        let Cards = plans.map(function(plan){
            return(
                <Card
                    key = {plan.planid}
                    //contractid = {"合同编号:"+plan.contractid}
                    //onClick={()=>{jumpPage(`contractDetail?contractid=${plan.contractid}`)}}
                    //detailUrl = {urlPath+'index.html?contractid='+contract.contractid+'#/contractDetail'}
                    >
                    <Row
                        itemLeftTitle =  '借款金额'
                        itemLeftValue =  {plan.amount*0.01}
                        itemRightTitle =  '已还本金'
                        itemRightValue =  {plan.payed_amount}
                        />
                    <Row
                        itemLeftTitle =  '还款时间'
                        itemLeftValue =  {plan.date}
                        itemRightTitle =  '利息'
                        itemRightValue =  {plan.interest*0.01}
                        />
                </Card>
            )
        });
        return(
            <div>
                <NavTop
                    handleImgClick = {()=>jumpPage('me')}
                    avatar = {this.props.avatar}/>
                    {/*<div style={{width:'100%',background:'skyblue',height:100}}>占位符</div>*/}
                <PullToRefresh
                    handleRefresh={this.pullToRefresh.bind(this)}>
                    {Cards}
                </PullToRefresh>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        avatar: state.user.isReady?state.user.user.avatar : '',
        plans: state.repaymentPlan.plans
    }
}
function mapDispatchToProps(dispatch){
    return {
        actions:bindActionCreators(Actions,dispatch)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(RepaymentPlan)

