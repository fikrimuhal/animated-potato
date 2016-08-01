import React from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import {db} from '../../utils/'

import {Table} from 'material-ui/Table';
import THead from './THead'
import TBody from './TBody'
import OrderFilterPanel from './OrderFilterPanel'
const styles = {
  customWidth: {
   width: 150,
 },
};
const data = db.getApplicantList();
export default class ParticipantList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data : data
    };
  }
  render() {
    console.log(this.state.data);
    return (
              <div>
                <h2>Katılımcı Listesi</h2>
                <OrderFilterPanel />
                <div>
                  <Table>
                    <THead columns={['Ad Soyad','Date','Score','Settings']} />
                    {
                        // <TBody rows={this.state.data}/>
                      }
                  </Table>
                </div>
              </div>
    );
  }
}
