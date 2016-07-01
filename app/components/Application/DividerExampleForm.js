import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const style = {
  marginLeft: 20,
};

const DividerExampleForm = () => (
  <Paper zDepth={2}>
    <TextField hintText="Ad" style={style} underlineShow={false} />
    <Divider />
    <TextField hintText="Soyad" style={style} underlineShow={false} />
    <Divider />
    <TextField hintText="Mail Adres" style={style} underlineShow={false} />
    <Divider />
    <TextField hintText="Şifre" style={style} underlineShow={false} />
    <Divider />
  </Paper>
);

export default DividerExampleForm;
