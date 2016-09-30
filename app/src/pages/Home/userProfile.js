import React        from 'react'
import FlatButton   from 'material-ui/FlatButton';
import FontIcon     from 'material-ui/FontIcon';
import {pink500}    from 'material-ui/styles/colors';
import Paper        from 'material-ui/Paper';
import TextField    from 'material-ui/TextField';
import log2         from '../../utils/log2'
import * as db      from '../../utils/data'
import  ContactIcon from 'material-ui/svg-icons/communication/contacts'
import  ContactEmailIcon from 'material-ui/svg-icons/communication/contact-mail'
import  ContactPhoneIcon from 'material-ui/svg-icons/communication/contact-phone'
import * as util    from '../../utils/utils'
import colors from '../../utils/material-colors'
import {Row, Col}   from 'react-flexbox-grid'
import Divider      from 'material-ui/Divider'
const styles = {
    paperStyle: {
        width: '100%',
        margin: 20,
        padding: "10px"


    },
    infoRow: {
        marginTop: "5px",
        borderBottom: "1px dashed teal",
        padding: "5px",
        fontSize: "15px",

    },
    infoLabel: {
        fontWeight: "bold",
        color: "teal"
    }
}
export default  class UserProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeForm: true
        }
        util.bindFunctions.call(this, ['goToUpdate', 'nameChanced']);

    }

    nameChanced = function (event, value) {
        console.log(value)
        //var oldUser = this.props.user
    }
    goToUpdate = function () {

        this.setState({
            activeForm: false
        })
    }
    render = ()=> {
        var user = this.props.user;
        return (
            <div>
                <h5>Profil Bilgileri</h5>
                <Row>
                    <Col lg={12} md={12}>

                        <Row style={styles.infoRow}>
                            <Col lg={1} md={1}><ContactIcon color={colors.teal.x300}/></Col>
                            <Col lg={1} md={2} style={styles.infoLabel}>Ad:</Col>
                            <Col lg={10} md={8}>{user.name}</Col>
                        </Row>
                        <Row style={styles.infoRow}>
                            <Col lg={1} md={1}><ContactIcon color={colors.teal.x300}/></Col>
                            <Col lg={1} md={2} style={styles.infoLabel}>Soyad:</Col>
                            <Col lg={10} md={8}>{user.lastname}</Col>
                        </Row>
                        <Row style={styles.infoRow}>
                            <Col lg={1} md={1}><ContactEmailIcon color={colors.teal.x300}/></Col>
                            <Col lg={1} md={2} style={styles.infoLabel}>Email:</Col>
                            <Col lg={10} md={8}>{user.email}</Col>
                        </Row>
                        <Row style={styles.infoRow}>
                            <Col lg={1} md={1}><ContactPhoneIcon color={colors.teal.x300}/></Col>
                            <Col lg={1} md={2} style={styles.infoLabel}>Phone:</Col>
                            <Col lg={10} md={8}>{user.phone}</Col>
                        </Row>
                        {/*<Row>*/}
                        {/*<Col lg={12}>*/}
                        {/*<FlatButton label="İptal" style={{float: "right"}} secondary={true}*/}
                        {/*disabled={this.state.activeForm}/>*/}
                        {/*<FlatButton label="Düzenle" style={{float: "right"}} secondary={true}*/}
                        {/*onClick={this.goToUpdate}/>*/}
                        {/*</Col>*/}

                        {/*</Row>*/}

                    </Col>
                </Row>

            </div>
        )
        console.log(this.state.activeForm)
    }
}
UserProfile.propTypes = {
    user: React.PropTypes.object.isRequired
}