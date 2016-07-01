import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 10,
};

const RaisedButtonExampleSimple = () => (
  <div>

    <RaisedButton label="Temizle" secondary={true} style={style} />
    <RaisedButton label="Kayıt" secondary={true} style={style} />

  </div>
);

export default RaisedButtonExampleSimple;
