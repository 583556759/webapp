/**
 * Created by HuangJinYu on 2017/6/12.
 */
import {serverUrl,constructorParam} from '../core/config';
import CreditLoan from '../core/creditloan';
const creditLoan = new CreditLoan(constructorParam);

export const QUERYCONTRACT       = 'QUERYCONTRACT';
export const CONTRACTDETAIL      = 'CONTRACTDETAIL';
export const REPAYMENTPLAN       = 'REPAYMENTPLAN';
export const OVERDUERECORD       = 'OVERDUERECORD';

export function creditLoan_contractQuery(param){
    return {
        type          : QUERYCONTRACT,
        urlpath       : serverUrl+'mily/creditloan/contract/query',
        core          : creditLoan,
        interfaceName : 'contractQuery',
        params        : param
    }
}

export function creditLoan_contractDetail(param){
    return {
        type          : CONTRACTDETAIL,
        urlpath       : serverUrl+'mily/creditloan/contract/detail',
        core          : creditLoan,
        interfaceName : 'contractDetail',
        params        : param
    }
}
export function creditloan_repaymentPlan(param){
    return {
        type          : REPAYMENTPLAN,
        urlpath       : serverUrl+'mily/creditloan/contract/repaymentplan',
        core          : creditLoan,
        interfaceName : 'contractRepaymentPlan',
        params        : param
    }
}
export function creditloan_overdueRecord(param){
    return {
        type          : OVERDUERECORD,
        urlpath       : serverUrl+'mily/creditloan/contract/overduerecord',
        core          : creditLoan,
        interfaceName : 'contractOverDuerecord',
        params        : param
    }
}