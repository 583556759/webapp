/**
 * Created by HuangJinYu on 2017/5/1.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getCurrentUser} from '../core/config';
import {setTitle} from 'buddy-util';
import * as Actions from '../actions/actions';

class Templet extends React.Component{
    constructor(props){
        super(props);
        getCurrentUser(this.props.actions);
    }
    componentDidMount(){
        setTitle('templet');
    }
    render(){
        return (
            <div>Templet</div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        post: state.post
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Index)
