/**
 * Created by MYigit on 10.8.2016.
 */
//core imports
import  React           from 'react'
import FlatButton from 'material-ui/FlatButton'
import {browserHistory} from "react-router"

//React component
export default  class  TestOverPanel extends  React.Component{
    constructor(props){
    super(props)
    }
    onClick =function () {
        browserHistory.push("/home");
    };
    render = ()=>{
    return(
    <div>
        <p>Yeterlililik testine katıldığınız için teşekkürler.<br/>
        En kısa sürede puanınız hesaplanacaktır. Profilinizden görüntüleyebilirsiniz.

        </p>
        <FlatButton label={"Anasayfama git"} backgroundColor={"teal"} onClick={this.onClick}></FlatButton>
    </div>
    )
    }
}