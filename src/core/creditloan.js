/**
 * Created by HuangJinYu on 2017/4/23.
 */
import Xdock from 'xdock'
export default class Creditloan extends Xdock{
    constructor(param){
        super(param.sig_kv,param.skey);
        this.appName  = param.appName;
        this.version  = param.version;
        this.appid    = param.appid;
        this.platform = param.platform;
    }
    getHeaders(){
        //获得需要设置的headers
        return {
            'Content-Type' : 'application/x-www-form-urlencoded',
            // 'User-Agent'   : this.appName+"/"+this.platform+"/"+this.appid+"/"+this.version
        };
    }
    //设置请求数据中的公共部分
    dataInit(jsondata){
        jsondata.appid    = this.appid;
        jsondata.platform = this.platform;
        jsondata.token    = localStorage.token ? localStorage.token:null;
        jsondata.uid      = localStorage.uid   ? localStorage.uid:"1";
        return jsondata;
    }
    contractQuery(urlpath,param){
        return super.globalFetch(urlpath,this.getHeaders(),this.dataInit(param));
    }
    contractDetail(urlpath,param){
        return super.globalFetch(urlpath,this.getHeaders(),this.dataInit(param));
    }
    contractRepaymentPlan(urlpath,param){
        return super.globalFetch(urlpath,this.getHeaders(),this.dataInit(param));
    }
    contractOverDuerecord(urlpath,param){
        return super.globalFetch(urlpath,this.getHeaders(),this.dataInit(param));
    }
}