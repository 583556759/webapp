/**
 * Created by henry on 2017/3/4.
 */
import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import FetchMiddleware from 'fetchMiddleware';
import {createStore,applyMiddleware,compose} from 'redux';
import {Router,IndexRoute,Route,browserHistory} from 'react-router';
import milyapp from './reducers/reducers';
import Root from './root';
import HandlePage from './components/HandlePage.jsx';
import Me from './me';
import Index from './index';
import Middle from './middle';
import Signup from './container/signup/Signup.jsx';
import Login from './container/login/Login.jsx';
import Contract from './container/contract/Contract.jsx';
import ContractDetail from './container/contract/ContractDetail';
import RepaymentPlan from './container/contract/RepaymentPlan.jsx';
import OverdueRecord from './container/contract/OverdueRecord.jsx';
import LoanRecord from './container/loan/LoanRecord.jsx';
import Balance from './container/wallet/balance/Balance.jsx';
import Recharge from './container/wallet/recharge/Recharge.jsx'
import Withdraw from './container/wallet/withdraw/Withdraw.jsx'
import './views/css/main.css';
import '../lib/bootstrap/css/bootstrap.css';
//发布的时候去掉window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//微信中不支持
//let store;
//if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
//    store = compose(applyMiddleware(FetchMiddleware))(createStore)(falyapp);
//} else if (window.location.href.indexOf('localhost') > 0) {
//    store = compose(applyMiddleware(FetchMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())(createStore)(falyapp);
//} else {
    //store = compose(applyMiddleware(FetchMiddleware))(createStore)(milyapp);
//}
let store = compose(applyMiddleware(FetchMiddleware))(createStore)(milyapp);
/*if (location.href.indexOf('localhost')<0){
    store = compose(applyMiddleware(FetchMiddleware))(createStore)(milyapp);
}else {
    store = compose(applyMiddleware(FetchMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())(createStore)(milyapp);
}*/

ReactDOM.render(
    <Provider store = {store}>
        <Router history={browserHistory}>
            <Route path="/" component={Root}>
                <IndexRoute component={HandlePage}/>
                <Route path="/me" component={Me}/>
                <Route path="/index" component={Index}/>
                <Route path="/middle" component={Middle}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/login" component={Login}/>
                <Route path="/contract" component={Contract}/>
                <Route path="/contractDetail" component={ContractDetail}/>
                <Route path="/loanRecord" component={LoanRecord}/>
                <Route path="/balance" component={Balance}/>
                <Route path="/recharge" component={Recharge}/>
                <Route path="/withdraw" component={Withdraw}/>
                <Route path="/repaymentPlan" component={RepaymentPlan}/>
                <Route path="/overdueRecord" component={OverdueRecord}/>
            </Route>
        </Router>
    </Provider>
    ,document.getElementById('navigator'));
