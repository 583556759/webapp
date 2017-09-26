/**
 * Created by henry on 16/5/31.
 */
import React from 'react';
export default class Root extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div>{this.props.children}</div>
    }
}
