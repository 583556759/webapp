import React from 'react'
export default class LoanRecordCard extends React.Component{
    constructor(args){
        super(args);
    }
    render(){
        let {title,status,amount,time,handleClick} = this.props;
        let newStatus = ((status)=>{
            switch (status){
                case 'started':
                    return '生效中';
                case 'terminated':
                    return '已结束';
                case 'editing':
                    return '编辑中';
                default:
                    return '未知'
            }
        })(status)
        return(
            <div
                 style={styles.loanRecordCard}
                 onClick = {handleClick}
            >
                <div style={styles.item1}>
                    <p style={{fontSize:18}}>{title}</p>
                    <p style={{color:'#808080',margin:0}}>{newStatus}</p>
                </div>
                <div style={styles.item2}>
                    <p style={{fontSize:18,textAlign:'right'}}>{amount}</p>
                    <p style={{color:'#808080',margin:0,textAlign:'right'}}>{time}</p>
                </div>
                <div style={styles.next}>
                    <icon className="iconfont">&#xe602;</icon>
                </div>
            </div>
        )
    }
}
var styles = {
    loanRecordCard:{
        background:'#fff',
        marginBottom:10,
        width:'100%',
        padding:10,
        display:'flex'
    },
    item1:{
        width:'45%',
        display:'inlineFlex'
    },
    item2:{
        width:'50%',
        display:'inlineFlex',
        justifyContent:'flex-end',
        padding:'0 10px'
    },
    next:{
        height:'inherit',
        width:'5%',
        display:'inline-flex',
        flexDirection:'column',
        justifyContent:'center',
        textAlign:'right'
    }
}