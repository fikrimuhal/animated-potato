/**
 * Created by MYigit on 25.8.2016.
 */
import React                from 'react'
import TextField            from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd           from 'material-ui/svg-icons/content/add';
import IconDone             from 'material-ui/svg-icons/action/done';
import IconClose            from 'material-ui/svg-icons/content/clear'

import * as s           from '../../layouts/style'
export default  class SetCreateToolbar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            mode:"create"
        }
    }

    render = ()=>{
        var textfieldDisplay = (this.state.mode == "create") ? "none" : "";
        var addButtonDisplay = (this.state.mode == "create") ? "" : "none";
        var iconButtons = ()=>{
            if(this.state.mode == "create") {
                return (<FloatingActionButton ><ContentAdd /></FloatingActionButton>);
            }
            else {
                return (<span>
                    <FloatingActionButton > <IconClose /> </FloatingActionButton>
                    <FloatingActionButton > <IconDone/></ FloatingActionButton ></span>
                );
            }
        };
        return (
            <div style={s.questionSetDetailPage.setCreateToolbar}>
                <TextField hintText={"Soru seti adınını giriniz"} style={{display:textfieldDisplay}}></TextField>
                <FloatingActionButton ><ContentAdd /></FloatingActionButton>

                <FloatingActionButton ><IconClose /></FloatingActionButton>
                <FloatingActionButton ><IconDone /></FloatingActionButton>

            </div>
        )
    }
}