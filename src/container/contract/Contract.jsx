import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../actions/actions';
import {setTitle,Page} from 'buddy-util';
import {getCurrentUser,urlPath} from '../../core/config';
import NavTop from '../../components/nav/NavTop.jsx';
import {PullToRefresh} from 'buddyui'
import jumpPage from '../../core/jumpPage';

import {ContractCard,Row} from '../../components/contractCard/ContractCard.jsx'

class Contract extends React.Component{
    constructor(props){
        super(props);
        getCurrentUser(this.props.actions);
        this.state = {
            bottomDisplay : 'none',
            isLastPullReady:true
        }
    }
    componentDidMount(){
        setTitle('我地合同');
        let {actions} = this.props;
        actions.getLocalUser();
        actions.creditLoan_contractQuery({'next_page':1});
    }
    /*componentDidUpdate(){
        console.log(Object.prototype.toString.call(this.props.contracts));
    }*/
    pullToRefresh(event){
        event.preventDefault();
        var {actions,nextPage} = this.props;
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
        let {contracts,nextPage} = this.props;
        let contractCard = contracts.map(function(contract){
            return(
                <ContractCard
                    key = {contract.contractid}
                    contractid = {"合同编号:"+contract.contractid}
                    onClick = {()=>jumpPage(`contractDetail?contractid=${contract.contractid}`)}
                    //detailUrl = {urlPath+'index.html?contractid='+contract.contractid+'#/contractDetail'}
                >
                    <Row
                        itemLeftTitle =  '借款金额'
                        itemLeftValue =  {contract.amount*0.01}
                        itemRightTitle =  '日利率'
                        itemRightValue =  {contract.day_interest_rate+"%"}
                    />
                    <Row
                        itemLeftTitle =  '起息日期'
                        itemLeftValue =  {contract.start_dt_ui.split(" ")[0]}
                        itemRightTitle =  '到期日期'
                        itemRightValue =  {contract.end_dt_ui.split(' ')[0]}
                    />
                </ContractCard>
            )
        });
        return (
            <div>
                <div style={{width:'100%',background:'skyblue',height:100}}>占位符</div>
                <PullToRefresh
                    nextPage = {nextPage}
                    handleRefresh={this.pullToRefresh.bind(this)}>
                    {contractCard}
                </PullToRefresh>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        avatar   : state.user.isReady?state.user.user.avatar : '',
        nextPage : state.contracts.nextPage,
        contracts: state.contracts.contracts
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Contract)
