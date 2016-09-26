/**
 * Created by MYigit on 25.8.2016.
 */
import React                from 'react'
import TextField            from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd           from 'material-ui/svg-icons/content/add';
import IconDone             from 'material-ui/svg-icons/action/done';
import IconClose            from 'material-ui/svg-icons/content/clear'
import * as s               from '../../layouts/style'
import * as util            from '../../utils/utils'
import log2                 from '../../utils/log2'
const log = log2("SetCreateToolbar");


export default  class SetCreateToolbar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            mode:"create"
        }
        util.bindFunctions.call(this,['toogleMode','saveQuestionSet']);

    }

    toogleMode = function (){
        log("toogleMode",this.refs);
        if(this.refs.txtSetNam != null) {
            this.refs.txtSetName.input.value = "";
        }
        this.setState({
            mode:this.state.mode == "create" ? "edit" : "create"
        });
    };
    saveQuestionSet = function (){
        var setName = this.refs.txtSetName.input.value;
        if(setName != null && setName != "") {
            this.props.saveQuestionSet(setName);
        }

    };
    iconButtons = ()=>{
        if(this.state.mode == "create") {
            return (<FloatingActionButton onClick={this.toogleMode}><ContentAdd /></FloatingActionButton>);
        }
        else {
            return (<div>
                    <TextField hintText={"Soru seti adınını giriniz"} ref="txtSetName"></TextField>
                    <FloatingActionButton onClick={this.toogleMode}> <IconClose /> </FloatingActionButton>
                    <FloatingActionButton secondary={true} onClick={this.saveQuestionSet}>
                        <IconDone/></ FloatingActionButton ></div>
            );
        }
    };

    render = ()=>{
        var title = this.context.title;
        log(title);

        return (
            <div style={s.questionSetDetailPage.setCreateToolbar}>
                {this.iconButtons()}
            </div>
        )
    }
}

SetCreateToolbar.contextTypes = {
    title:React.PropTypes.string,
    showMessage:React.PropTypes.func
};
SetCreateToolbar.propTypes = {
    saveQuestionSet: React.PropTypes.func.isRequired
}