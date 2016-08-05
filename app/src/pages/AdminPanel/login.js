/**
 * Created by MYigit on 5.8.2016.
 */
import  React from 'react'
import {browserHistory} from 'react-router'
import Paper        from 'material-ui/Paper'
import TextField    from 'material-ui/TextField'
import RaisedButton    from 'material-ui/RaisedButton'
import {log2, util}   from '../../utils/'
import db from '../../utils/data.js'
import {Toast}          from '../../components/MyComponents'

//Styles
const styles = {
    paperStyle: {
        width: "500px",
        height: 300,
        margin: "0 auto",
        marginTop: "20px",
        padding: "10px",
        paddingLeft: "5%"
    },
    rightFloated: {
        float: "right",
        marginRight: "5px"
    }
}
export default  class  AdminLogin extends  React.Component{
    constructor(props){
    super(props)
    }
    render = ()=>{
    return(
    <div>

    </div>
    )
    }
}

