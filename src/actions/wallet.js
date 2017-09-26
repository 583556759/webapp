/**
 * Created by HuangJinYu on 2017/6/12.
 */
import {serverUrl,constructorParam} from '../core/config';
import Wallet from 'wallet';
const wallet = new Wallet(constructorParam);

//Wallet
export const BALANCEQUERY = 'BALANCEQUERY';

export function wallet_balanceQuery(param){
    return {
        type: BALANCEQUERY,
        urlpath: serverUrl + 'mily/wallet/balance/query',
        core: wallet,
        interfaceName: 'balanceQuery',
        params: param
    }
}
