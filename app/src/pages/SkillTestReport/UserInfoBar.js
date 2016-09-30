/**
 * Created by MYigit on 8.9.2016.
 */
import React        from 'react'
import {Row, Col}   from 'react-flexbox-grid'
import * as s       from '../../layouts/style'

var avatar = require("!file!../../assets/images/test-report-avatar.png");

export default  class UserInfoBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render = ()=> {
        var info = this.props.userInfo;
        return (
            <div style={{height: "100%", marginTop: "10px"}}>
                <Row>
                    <Col lg={4} md={4}>
                        <img
                            src={avatar}
                            style={s.GraphStyles.avatar}/>
                    </Col>
                    <Col lg={8} md={8}>
                        <Row>
                            <Col lg={12} md={12} style={s.GraphStyles.userInfoCol}>
                                <text><b>Name:</b> {info.name}</text>
                            </Col>
                            <Col lg={12} md={12} style={s.GraphStyles.userInfoCol}>
                                <text><b>Lastname:</b> {info.lastName}</text>
                            </Col>
                            <Col lg={12} md={12} style={s.GraphStyles.userInfoCol}>
                                <text><b>Email:</b>{info.email}</text>
                            </Col>
                            <Col lg={12} md={12} style={s.GraphStyles.userInfoCol}>
                                <text><b>Phone:</b>{info.phone}</text>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </div>
        )
    }
}
//TODO: #BACKEND-> info.phone kısmına soyadı kısmı geliyor. backend tarafında düzeltilecek
UserInfoBar.propTypes = {
    userInfo: React.PropTypes.object.isRequired
};