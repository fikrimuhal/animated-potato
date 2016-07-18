import React from 'react';
import TextField from 'material-ui/TextField';

export default React.createClass({
  render() {
      return (
          <div>
            <p><b>{this.props.questionid})</b>
                  {this.props.question}</p>
              <TextField
                hintText="Cevabınız"
                multiLine={this.props.multiLine}
              />
          </div>
      )}
  })
