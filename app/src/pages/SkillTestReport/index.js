import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import NavigateBefore from 'material-ui/svg-icons/navigation/arrow-back';
export default  class  SkillTestReportContainer extends  React.Component{
    constructor(props){
    super(props)
    }
    render = ()=>{
    return(
    <div>
        <FlatButton label={"Back to list"} icon={<NavigateBefore/>}></FlatButton>
        Participant Skill Test Report
    </div>
    )
    }
}

