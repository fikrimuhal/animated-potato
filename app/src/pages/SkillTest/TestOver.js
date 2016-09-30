/**
 * Created by MYigit on 10.8.2016.
 */
//core imports
import  React           from 'react'
import FlatButton       from 'material-ui/FlatButton'
import {browserHistory, RoutingContext} from "react-router"
import * as db          from '../../utils/data'
import * as util        from '../../utils/utils'
import log2             from '../../utils/log2';

const log = log2("TestOverPanel");
//React component
export default  class TestOverPanel extends React.Component {
    constructor(props) {
        super(props);
        util.bindFunctions.call(this, ['getContent'])
    }

    onClick = function () {
        browserHistory.push("/home");
    };
    navigateTo = path=>()=> {
        browserHistory.push(path);
    };
    getContent = function () {
        var reqQuery = this.props.query;
        var content;
        log(this.props.validUser, db.isLoggedIn(), reqQuery)
        if (this.props.validUser && db.isLoggedIn()) {
            content = <div>
                <p>Yeterlililik testine katıldığınız için teşekkür ederiz.<br/>
                    Sonuçlarınızı anasayfada görebilirsiniz.
                </p>
                <FlatButton label={"Anasayfama git"} backgroundColor={"teal"}
                            onClick={this.navigateTo("/")}></FlatButton>
            </div>;
        }
        else if (!reqQuery.companyToken && !reqQuery.trackNo && !this.props.validUser) {
            content = <div>
                <p>Yeterlililik testine katıldığınız için teşekkür ederiz<br/>
                    Kullanıcı bilgilerinizle sisteme giriş yapıp sonuçlarınızı görüntüleyebilirsiniz.
                </p>
                <FlatButton label={"Üye ol"} backgroundColor={"teal"} onClick={this.navigateTo("/signin")}></FlatButton>
            </div>;
        }
        else {
            content = <div>
                <p>Yeterlililik testine katıldığınız için teşekkür ederiz<br/>
                    Sonuçlarını görebilmek için sisteme üye olup giriş yapınız.
                </p>
                <FlatButton label={"Üye ol"} backgroundColor={"teal"} onClick={this.navigateTo("/signup")}></FlatButton>
            </div>;
        }
        log(content);
        return content;
    };
    render = ()=> {
        log(this)
        return (
            <div>
                {
                    this.getContent()
                }
            </div>
        )
    }
}

TestOverPanel.propTypes = {
    validUser: React.PropTypes.bool.isRequired
};