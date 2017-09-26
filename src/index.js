import React from 'react';
import NavBottom from './components/nav/NavBottom.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getCurrentUser,urlPath} from './core/config';
import {setTitle,MoneyFormat} from 'buddy-util';
import * as Actions from './actions/actions';
import jumpPage from './core/jumpPage';
import LoanRecord from './container/loan/LoanRecord.jsx'

class Index extends React.Component{
    constructor(props){
        super(props);
        getCurrentUser(this.props.actions);
    }
    componentDidMount(){
        setTitle('米丽金融借款');
        let {actions,nextPage} = this.props;
        actions.creditLoan_contractQuery({next_page:nextPage})
    }
    render(){
        return (
            <div style={{height:window.innerHeight,background:'#eee',paddingTop:0}}>
                <div style={{width:'100%',height:'1.4rem',background:'#fff',textAlign:'center',paddingTop:48}}>
                    <span style={{fontSize:24,textAlign:'center'}}>已借金额(元)</span>
                    <p style={{fontSize:40,color:'orange',textAlign:'center'}}>{MoneyFormat(this.props.totalAmount||'')}</p>
                </div>
                {/*<div style={{padding:'0.5rem 25%'}}>
                    <a onClick={()=>{jumpPage('loanRecord')}}  style={{borderColor:'skyblue',color:'skyblue'}} className="btn btn-default form-control">还款管理</a>
                </div>*/}
                <LoanRecord/>
                <NavBottom/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        totalAmount : state.contracts.totalAmount||'',
        nextPage    : state.contracts.nextPage|1
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Index)
