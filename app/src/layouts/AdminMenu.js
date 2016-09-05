import React           from 'react'
import Menu            from 'material-ui/Menu';
import MenuItem        from 'material-ui/MenuItem';
import {Link}          from 'react-router'
import GroupIcon       from 'material-ui/svg-icons/social/group';
import LabelIcon       from 'material-ui/svg-icons/action/label-outline';
import DescriptionIcon from 'material-ui/svg-icons/action/description';
import PersonIcon      from 'material-ui/svg-icons/social/person';
import AdminIcon       from 'material-ui/svg-icons/action/assignment-ind';
import Divider         from  'material-ui/Divider'
import * as  s         from '../layouts/style'
export default class AdminMenu extends React.Component {
    shouldComponentUpdate = function (nextProps,nextState){
        return false;
    }
    render = function (){
        return (

            <Menu onItemTouchTap={this.props.menuClick} style={s.AdminLayoutStyle.adminMenuBar}>
                <Link to='/dashboard/ListofParticipants'>
                    <MenuItem primaryText="Participants" leftIcon={<GroupIcon />}/>
                </Link>
                <Divider/>
                <Link to='/dashboard/QuestionList'>
                    <MenuItem primaryText="Questions" leftIcon={<LabelIcon />}/>
                </Link>
                <Divider/>
                <Link to='/dashboard/ListOfQuestionSet'>
                    <MenuItem primaryText="Question Sets" leftIcon={<DescriptionIcon/>}/>
                </Link>
                <Divider/>
                <Link to='/dashboard/ListofUser'>
                    <MenuItem primaryText="Users List" leftIcon={<PersonIcon/>}/>
                </Link>
                <Divider/>
                <Link to='/dashboard/ListofStaff'>
                    <MenuItem primaryText="Stuff List" leftIcon={<PersonIcon/>}/>
                </Link>
                <Divider/>
                <Link to='/dashboard/AdminProfile'>
                    <MenuItem primaryText="Admin Info" leftIcon={<AdminIcon/>}/>
                </Link>
            </Menu>

        );
    }
}
AdminMenu.propTypes = {
    menuClick:React.PropTypes.func
}