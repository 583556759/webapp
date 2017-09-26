/**
 * Created by HuangJinYu on 2017/3/11.
 */
import {combineReducers} from 'redux';
import * as user from './user';
import * as wallet from './wallet';
import * as creditloan from './creditloan';

export default combineReducers({
    login           : user.saveUser,
    user            : user.getLocalUser,
    contracts       : creditloan.queryContract,
    contractDetail  : creditloan.contractDetail,
    repaymentPlan   : creditloan.repaymentPlan,
    overdueRecord   : creditloan.overdueRecord,
    balance         : wallet.balanceQuery
});
