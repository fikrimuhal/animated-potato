import React from 'react'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router'
import GroupIcon from 'material-ui/svg-icons/social/group';
import LabelIcon from 'material-ui/svg-icons/action/label-outline';
import DescriptionIcon from 'material-ui/svg-icons/action/description';
import PersonIcon from 'material-ui/svg-icons/social/person';
import AdminIcon from 'material-ui/svg-icons/action/assignment-ind';


export default class AdminMenu extends React.Component{
    shouldComponentUpdate= function(nextProps, nextState) {
      return false;
    }
    render= function() {
        return (

        <Menu onItemTouchTap={this.props.menuClick}>
            <Link to='/adminpanel/listofparticipants'>
                <MenuItem primaryText="Participants" leftIcon={<GroupIcon />}/>
            </Link>
            <Link to='/adminpanel/questionlist'>
                <MenuItem primaryText="Questions" leftIcon={<LabelIcon />}/>
            </Link>
            <Link to='/adminpanel/questionsetdetails'>
                <MenuItem primaryText="Soru Set Bilgileri" leftIcon={<DescriptionIcon/>}/>
            </Link>
            <Link to='/adminpanel/usersprofile'>
                <MenuItem primaryText="All User" leftIcon={<PersonIcon/>}/>
            </Link>
            <Link to='/adminpanel/adminprofile'>
                <MenuItem primaryText="Admin Info" leftIcon={<AdminIcon/>}/>
            </Link>
        </Menu>

    );
  }
}
AdminMenu.propTypes={
    menuClick:React.PropTypes.func
}