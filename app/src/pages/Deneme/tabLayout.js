import React        from 'react'
import {Tabs, Tab} from 'material-ui/Tabs';
import UserProfile from './userProfile'
import FormIntro    from './formIntro'
import * as db      from  '../../utils/data'
import * as util    from '../../utils/utils'

//Styles
const styles = {
    paperStyle: {
        width: "80%",
        height: 300,
        margin: "0 auto",
        marginTop: "10px",
        padding: "10px"
    },
    rightFloated: {
        float: "right",
        marginRight: "5px"
    }
}
const user = db.getUserInfo();
export default class UserHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'profile',
            user: user
        };
        util.bindFunctions.call(this, ['handleChange']);
    }

    handleChange = function handleChange(value) {
        this.setState({
            value: value,
            user: user
        });
    }
    handleTabChanced = function handleTabChanced(value) {
        this.setState({
            value: value,
        });
    }
    onSave = function (newValues, oldValues) {

    }
    render = function () {
        console.log("bu tab", this.state.value)
        console.log("bu tab fonksiyonu", this.handleTabChanced)
        return (
            <div>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Tab label="Profil" value="profile">
                        <UserProfile user={this.state.user} onSave={this.onSave} tabChanced={this.handleTabChanced}/>
                    </Tab>
                    <Tab label="Yeterlilik Formu" value="form">
                        <FormIntro/>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}
