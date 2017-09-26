/**
 * Created by HuangJinYu on 17/4/24.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './NavTop.less';
let handleClick = ()=>{
    if(document.referrer !='' && history.length > 2){
        window.history.go(-1);
    }else {
        window.location.href = location.origin+'/index'
    }
};
export default class NavTop extends React.Component{
    constructor(props){
        super(props);
    }
    static propTypes = {
        navClass:PropTypes.string,
        headImageDisplay:PropTypes.string,
        handleClick:PropTypes.func
    }
    static defaultProps={
        navClass : 'nav-white',
        headImageDisplay:'block',
        handleClick:handleClick
    };
    render(){
        return (
            <div  className = {"nav-default " + this.props.navClass} style={{background:this.props.background}}>
                <a className="col-xs-10" onClick = {this.props.handleClick}>
                    <img src={require('./left.png')}
                         style={{height:'30px',width:'30px',paddingBottom:3}}/>
                </a>
                <div
                    style={{display:this.props.headImageDisplay}}
                    onClick={()=>{window.location.href = location.origin+'/me'}}
                    className='navAvatar col-xs-2'>
                    <img src={this.props.avatar}
                         style={{height:'30px',width:'30px'}}/>
                </div>
            </div>
        );
    }
}