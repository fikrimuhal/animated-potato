/**
 * Created by MYigit on 8.8.2016.
 */
import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import {browserHistory} from 'react-router'
export default  class FormIntro extends React.Component {
    constructor(props) {
        super(props)
    }

    goToTest = function () {
        browserHistory.push("/skilltest?companyToken=fikrimuhal&trackno=new")
    }
    render = ()=> {
        return (
            <div>
                <h5>Mülakat Sınavı</h5>
                <p>
                    Şirket prensibleri gereği bu mülakata girerek bizimle çalışmak için uygun olup olmadağınız
                    saptanacaktır.
                </p>
                <FlatButton label="Mülakat Sınavına Başla" primary={true} style={{float: "right"}}
                            onClick={this.goToTest}></FlatButton>
            </div>
        )
    }
}