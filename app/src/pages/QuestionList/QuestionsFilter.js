import React from 'react'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
const styles = {
  flexContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent: "flexStart",
    flexFlow:"row wrap"
  },
  child:{
    width:"40%",
    marginTop:"5px",
    marginLeft:"15px"
  }
};
export default class QuestionsFilter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (

          <div style={styles.flexContainer}>
            <SelectField value={1} style={styles.child}>
              <MenuItem value={1} primaryText="Set Türü" />
              <MenuItem value={2} primaryText="Back-End Set" />
              <MenuItem value={3} primaryText="Front-End Set" />
              <MenuItem value={3} primaryText="Sistem Yönetimi Set" />
            </SelectField>

            <SelectField value={1} style={styles.child}>
              <MenuItem value={1} primaryText="Soru Türü" />
              <MenuItem value={2} primaryText="Back-End" />
              <MenuItem value={3} primaryText="Front-End" />
              <MenuItem value={3} primaryText="Sistem Yönetimi" />
            </SelectField>
          </div>
    );
  }
}
QuestionsFilter.propTypes = {

}
