import React from 'react'
import Snackbar from 'material-ui/Snackbar';
export default class Toast extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <Snackbar
                    open={this.props.settings.open}
                    message={this.props.settings.message}
                    autoHideDuration={this.props.settings.duration}

                />
            </div>
        );
    }
}
Toast.propTypes = {
    settings:React.PropTypes.object.isRequired
};
