import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField'
const styles = {
    radioButton: {
        marginBottom: 16,
    },
    fieldDiv: {
        position: 'relative',
        float: 'left',
        width: '30%'
    },
    w100: {
        width: 'auto'
    },
    fullWidth: {
        width: '100%',
        float: 'left'
    },
    secenekBox: {
        border: '1px solid teal',
        borderRadius: '5px',
        padding: '5px 5px 5px 5px',
        marginBottom: '5px',
        marginLeft: '10px',
        float: 'left'
    }
};

class Secenek extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSliderValueChange = function (secenekItem, event, value) {
        var model = this.props.parent.state.data;
        var index = _.findIndex(model.options, function (o) {
            return o.id == secenekItem.id;
        });
        console.dir(index);
        console.dir(model.options[index]);
        model.options[index].weight = value;
        this.props.parent.setState({
            data: model
        });
        console.dir(this.props.parent.state.data);
    }

    deleteOption = function (item, event) {
        var model = this.props.parent.state.data;
        model.options = _.dropWhile(model.options, function (o) {
            return o.id == item.id;
        });

        this.props.parent.setState({
            data: model
        });
        console.dir(this.props.parent.state.data);
    }
    render = ()=> {
        //console.dir(this.handleSliderValueChange);7
        log("secenek")
        var _this = this;
        return (
            <div>
                {
                    this.props.secenekler.map(function (item) {

                        return (
                            <div key={item.id} style={styles.secenekBox}>
                                <p>Seçenek Detayları</p>
                                <hr/>
                                <TextField hintText="Seçenek" defaultValue={item.text}/><br />
                                <Slider onChange={_this.handleSliderValueChange.bind(_this, item)}
                                        defaultValue={item.weight}/>
                                <b>Ağırlık: {item.weight}</b>
                                <RaisedButton onClick={_this.deleteOption.bind(_this, item)}> Sil</RaisedButton>
                            </div>
                        )
                    })
                }

            </div>
        )
    }
}
