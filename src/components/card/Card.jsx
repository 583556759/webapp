/**
 * Created by 123 on 17/4/23.
 */
import React from 'react';
import './Card.less';
export default class Card extends React.Component{
    render(){
        return(
            <div className="investCard"
                 onClick = {this.props.onClick}
                /*onClick = {()=>{
                   window.location.href = this.props.detailUrl;
                }}*/
                >
                <p className="investName">
                    <span style={{fontSize:16}}>{this.props.contractid}</span>
                    <span className="Right">{this.props.productTitle}</span>
                </p>
                <div className="row" style={{marginBottom:'5px',zIndex:-100}}>
                    {this.props.children}
                </div>
            </div>

        );
    }
}