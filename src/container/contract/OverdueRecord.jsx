/**
 * Created by 123 on 2017/7/18.
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
class OverdueRecord extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    componentDidMount(){
        setTitle('逾期记录');
        let {actions}=this.props;
        actions.getLocalUser();
        actions.creditloan_overdueRecord({contractid:Url.getUrlParam().contractid})
    }
    pullToRefresh(event){
        event.preventDefault();
        let {actions,nextPage} = this.props;
        if(Boolean(nextPage) && this.state.isLastPullReady){
            this.setState({
                isLastPullReady : false
            });
            actions.creditloan_overdueRecord({'next_page':nextPage}).then(()=>{
                this.setState({
                    isLastPullReady : true
                })
            });
        }
    }
    render(){
        let {records} = this.props;
        //console.log(this.props.records);
        let overdueRecord = records.length !== 0
            ?
            records.map(function(record){
                return(
                    <Card
                        key = {record.recordid}
                        //contractid = {"合同编号:"+plan.contractid}
                        //onClick={()=>{jumpPage(`contractDetail?contractid=${plan.contractid}`)}}
                        //detailUrl = {urlPath+'index.html?contractid='+contract.contractid+'#/contractDetail'}
                        >
                        <Row
                            itemLeftTitle =  '逾期费用'
                            itemLeftValue =  {record.amount*0.01+'元'}
                            itemRightTitle =  '类型'
                            itemRightValue =  {record.payed_amount}
                            />
                        <Row
                            itemLeftTitle =  '何时开始逾期'
                            itemLeftValue =  {record.date}
                            itemRightTitle =  '已还逾期费用'
                            itemRightValue =  {record.payed_amount+'元'}
                            />
                    </Card>
                )
            })
            :<div style={{color:'#808080',textAlign:'center'}}>没有逾期记录</div>;
        return(
            <div>
                <NavTop
                    handleImgClick = {()=>jumpPage('me')}
                    avatar = {this.props.avatar}/>
                {/*<div style={{width:'100%',background:'skyblue',height:100}}>占位符</div>*/}
                <PullToRefresh
                    handleRefresh={this.pullToRefresh.bind(this)}>
                    {overdueRecord}
                </PullToRefresh>
            </div>
        )
    }
}
function mapStateToProps(state){

    return {
        avatar: state.user.isReady?state.user.user.avatar : '',
        records: state.overdueRecord.records
    }
}
function mapDispatchToProps(dispatch){
    return {
        actions:bindActionCreators(Actions,dispatch)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(OverdueRecord)