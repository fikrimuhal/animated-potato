import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const style = {

  margin: '0 32px 16px 0',
  width: '165px'
};
const MenuExampleSimple = () => (
  <div>
    <Paper style={style}>
      <Menu>
        <MenuItem primaryText="Home" />
        <MenuItem primaryText="About" />
        <MenuItem primaryText="Solutions" />
        <MenuItem primaryText="Industries" />
        <MenuItem primaryText="Products" />
        <MenuItem primaryText="Careers" />
        <MenuItem primaryText="Blog" />
        <MenuItem primaryText="Contact" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Sign out" />
      </Menu>
    </Paper>
  </div>
);

export default MenuExampleSimple;
