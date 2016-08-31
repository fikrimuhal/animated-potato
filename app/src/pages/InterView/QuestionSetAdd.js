import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'

export default class QuestionSetAdd extends React.Component {
  render() {
    return (
        <div>
          <h2>Soru Seti Ekle</h2>
          <div>
            <TextField
              hintText="Soru Seti Adı"/><br />
          </div>
          <RaisedButton label="Ekle" secondary={true}/>
      </div>
    );
  }
}
