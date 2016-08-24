/**
 * Created by MYigit on 8.8.2016.
 */
import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import {browserHistory} from 'react-router'
export default  class  FormIntro extends  React.Component{
    constructor(props){
    super(props)
    }
    goToTest=function () {
        browserHistory.push("/skilltest?companyToken=fikrimuhal&trackno=new")
    }
    render = ()=>{
    return(
    <div>
        <h4>Yeterlilik Formu</h4>
        <p>
            Şirket prensibleri gereği bu formu doldurmanız gerekmektedir. Formda kısaca bilgileriniz kaydedilecek ve bizimle
            çalışmak için uygun olup olmadağınız saptanacaktır.
        </p>
        <FlatButton label="Teste Başla" primary={true} style={{float:"right"}} onClick={this.goToTest}></FlatButton>
    </div>
    )
    }
}