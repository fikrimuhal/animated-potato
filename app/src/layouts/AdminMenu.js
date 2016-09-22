import React           from 'react'
import Menu            from 'material-ui/Menu';
import MenuItem        from 'material-ui/MenuItem';
import {Link}          from 'react-router'
import GroupIcon       from 'material-ui/svg-icons/social/group';
import LabelIcon       from 'material-ui/svg-icons/action/label-outline';
import DescriptionIcon from 'material-ui/svg-icons/action/description';
import PersonIcon      from 'material-ui/svg-icons/social/person';
import DbIcon          from 'material-ui/svg-icons/action/settings'
import AdminIcon       from 'material-ui/svg-icons/action/assignment-ind';
import Divider         from  'material-ui/Divider'
import * as  s         from '../layouts/style'
export default class AdminMenu extends React.Component {
    shouldComponentUpdate = function (nextProps, nextState) {
        return false;
    }
    render = function () {
        return (

            <Menu onItemTouchTap={this.props.menuClick} style={s.AdminLayoutStyle.adminMenuBar}>

                <MenuItem primaryText="Participants" leftIcon={<GroupIcon />}
                          containerElement={<Link to='/dashboard/ListofParticipants'></Link>}/>

                <Divider/>

                <MenuItem primaryText="Questions" leftIcon={<LabelIcon />}
                          containerElement={<Link to='/dashboard/QuestionList'></Link>}/>

                <Divider/>

                <MenuItem primaryText="Question Sets" leftIcon={<DescriptionIcon/>}
                          containerElement={ <Link to='/dashboard/ListOfQuestionSet'></Link>}/>

                <Divider/>

                <MenuItem primaryText="Users List" leftIcon={<PersonIcon/>}
                          containerElement={<Link to='/dashboard/ListofUser'></Link>}/>

                <Divider/>

                <MenuItem primaryText="Staff List" leftIcon={<PersonIcon/>}
                          containerElement={ <Link to='/dashboard/ListofStaff'></Link>}/>

                <Divider/>

                <MenuItem primaryText="DB Initialization" leftIcon={<DbIcon/>}
                          containerElement={<Link to='/dashboard/initialization'></Link>}/>

                {/*<Divider/>*/}
                {/*<Link to='/dashboard/AdminProfile'>*/}
                {/*<MenuItem primaryText="Admin Info" leftIcon={<AdminIcon/>}/>*/}
                {/*</Link>*/}
            </Menu>

        );
    }
}
AdminMenu.propTypes = {
    menuClick: React.PropTypes.func
}