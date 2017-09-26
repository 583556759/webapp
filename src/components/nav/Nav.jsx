/**
 * Created by henry on 16/4/4.
 */
import React from 'react';
/* exported variableName */
export default class Nav extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const {handleClick,className,icon,name} = this.props;
        return(
            <div onClick={handleClick}  className={className}>
                <icon style={{fontSize:'24px'}} className="iconfont">{icon}</icon>
                <p style={{fontFamily:'Microsoft Yahei',fontSize:12,fontWeight:600}} >{name}</p>
            </div>
        );
    }
};
