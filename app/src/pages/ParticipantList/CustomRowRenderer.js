/**
 * Created by MYigit on 17.8.2016.
 */
import React            from 'react'
import log2             from '../../utils/log2'
import {Row,Cell}       from 'react-data-grid'
import FlatButton       from 'material-ui/FlatButton'
const log=log2("CustomRowRenderer")
export default  class CustomRowRenderer extends React.Component {
    constructor(props) {
        super(props);
        log(Row,Cell);
    }

    render=()=> {
        return (
            <div>
                <Row ></Row>

            </div>
        )
    }
}