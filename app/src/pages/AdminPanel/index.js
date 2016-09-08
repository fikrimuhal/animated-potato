import React from 'react'
import {log2} from '../../utils'
import * as mockData from '../../utils/mock_data'
const log = log2("Dashboard");
export default class AdminPanel extends React.Component {

    constructor(props){
        super(props);
        //mockData.MockQuestionCreator.initQuestions();
    }

    render = ()=>{
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
