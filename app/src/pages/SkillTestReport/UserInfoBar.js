/**
 * Created by MYigit on 8.9.2016.
 */
import React from 'react'
import {Row,Col} from 'react-flexbox-grid'
import * as s from '../../layouts/style'
export default  class UserInfoBar extends React.Component {
    constructor(props){
        super(props)
    }

    render = ()=>{
        var info = this.props.userInfo;
        return (
            <div style={{height:"100%",marginTop:"10px"}}>
                <Row>
                    <Col lg={4}>
                        <img
                            src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR8Xp0Ea_kGjAIUzscs7OVlu2qIAwgIk9wJouMQpA_NZ5_rDRxKWJu6opc"
                            style={s.GraphStyles.avatar}/>
                    </Col>
                    <Col lg={8}>
                        <Row>
                            <Col lg={12} style={s.GraphStyles.userInfoCol}>
                                <text><b>Name:</b> {info.name}</text>
                            </Col>
                            <Col lg={12} style={s.GraphStyles.userInfoCol}>
                                <text><b>Lastname:</b> {info.lastname}</text>
                            </Col>
                            <Col lg={12} style={s.GraphStyles.userInfoCol}>
                                <text><b>Email:</b> {info.email}</text>
                            </Col>
                            <Col lg={12} style={s.GraphStyles.userInfoCol}>
                                <text><b>Tel:</b> {info.tel}</text>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

UserInfoBar.propTypes = {
    userInfo:React.PropTypes.object.isRequired
};