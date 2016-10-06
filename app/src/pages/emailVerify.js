/**
 * Created by MYigit on 6.10.2016.
 */
import React from 'react'
import {browserHistory} from 'react-router'
import CircularProgress from 'material-ui/CircularProgress'
import * as mockAPI from '../utils/mock_api'
import * as db from '../utils/data'
import  log2 from '../utils/log2'
const log = log2("EmailVerify");
export default  class EmailVerify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            waiting: true
        };
        var requestParams = this.props.location.query;
        var _this = this;
        if (db.isLoggedIn()) {
            browserHistory.push("/");
        }
        else {
            if (requestParams.token) {
                mockAPI.verifyEmail().then(response=> {
                    log("verify response", response)
                    if (response.status == "OK") {
                        _this.setState({
                            waiting: false
                        });
                        setTimeout(()=> {
                            browserHistory.push("/signin");
                        }, 5000)
                    } else {
                        browserHistory.push("/signin");
                    }
                })
            }
            else {
                browserHistory.push("/signin");
            }
        }


    }

    getContent = ()=> {
        if (this.state.waiting) {
            return <CircularProgress size={1}/>
        } else {
            return <div>Eposta adresiniz doğrulanmıştır. Giriş sayfasına yönlendiriliyorsunuz...</div>
        }
    }
    render = ()=> {
        return (
            <div>
                {
                    this.getContent()
                }
            </div>
        )
    }
}