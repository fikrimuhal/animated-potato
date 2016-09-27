import React        from 'react'
import {Tabs, Tab} from 'material-ui/Tabs';
import UserProfile from './userProfile'
import FormIntro    from './formIntro'
import * as db      from  '../../utils/data'
import * as util    from '../../utils/utils'
import * as s  from '../../layouts/style'
import Paper from 'material-ui/Paper'
import  ExamResult from './ExamResult'
//Styles
const styles = {
    paperStyle: {
        width: "80%",
        height: 300,
        margin: "0 auto",
        marginTop: "10px",
        padding: "10px"
    },
    tabPage:{
        paddingLeft:"10px"
    }

}
var user = null;
export default class UserHome extends React.Component {
    constructor(props) {
        super(props);
        user = db.getUserInfo();
        this.state = {
            value: 'profile',
            user: user
        };
        util.bindFunctions.call(this, ['handleChange']);

    }

    handleChange = (value) => {
        this.setState({
            value: value,
            user: user
        });
    }
    onSave = function (newValues, oldValues) {

    }
    render = function () {
        return (

            <Paper style={s.userLayoutStyles.paperStyle}>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Tab label="Profil" value="profile" style={styles.tabPage}>
                        <UserProfile user={this.state.user} onSave={this.onSave}/>

                    </Tab>
                    <Tab label="Mülakat Sınavı" value="form" style={styles.tabPage}>
                        <FormIntro/>
                    </Tab>
                    <Tab label="Mülakat Sınavı Sonucum" value="report" style={styles.tabPage}>
                        <ExamResult/>
                    </Tab>
                </Tabs>
            </Paper>

        )
    }
}
