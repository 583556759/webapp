import React from 'react';
import {Url,Security} from 'buddy-util';
import {urlPath} from '../core/config';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/actions';
import {connect} from 'react-redux';
import jumpPage from '../core/jumpPage';
class HandlePage extends React.Component{
    constructor(props){
        super(props);
        document.title = '加载中...';
        let urlParam = Url.getUrlParam();
        if(urlParam.code){
            let param = {
                'thirdtype': 'weixin',
                'oauthcode': urlParam.code
            };
            if(urlParam.codefor == 'login'){
                this.props.actions.xuser_login(param).then(()=>{
                    let url = localStorage.path||'index';
                    jumpPage(url);
                },(meta)=>{
                    if(meta.code == 400){
                        jumpPage('signup?step=1')
                    }
                });
            }else if(urlParam.codefor == 'bind') {
                let that = this;
                this.props.actions.xuser_bindThirdAccount(param).then((data)=>{
                    //绑定微信后同步一次数据
                    that.props.actions.xuser_synUserData().then((data)=>{
                        if(!localStorage.user.user.name){
                            jumpPage('signup?step=2')
                        }else {
                            jumpPage('index')
                        }
                    })
                },(data)=>{
                    if(!JSON.parse(localStorage.user).user.name){
                            jumpPage('signup?step=2')
                        }else {
                            jumpPage('index')
                        }
                });
            }
        }else {
            jumpPage('index');
        }
    }

    render(){
        return <div></div>
    }
};

function mapStateToProps(state){
    return{
        // fetch:state.post.fetch
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(HandlePage)