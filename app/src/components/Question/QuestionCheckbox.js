import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
  button:{
    marginRight: 12,
  },
  position: 'absolute',
  display: 'inline-block',
  alignItems: 'center',
  marginLeft: 250,
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
  };
export default React.createClass({
  render() {
      return (
      <div>
      <p>{this.props.questionId}) {this.props.question} </p>
            {(this.props.answers).map((option, i) => (
            <Checkbox
                key={option.value}
                value={option.value}
                label={option.title}
              />
          ))}
      </div>
    )}
})
