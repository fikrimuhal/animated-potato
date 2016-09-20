/**
 * Created by MYigit on 7.9.2016.
 */
import  React  from 'react'
import Radar   from '../../components/GraphComponents/Radar'
import * as mockApi from '../../utils/mock_api'
import LinearProgress from 'material-ui/LinearProgress';
import log2 from '../../utils/log2'
const log = log2("RadarWidget")
export default  class RadarWidget extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dataLoaded:false
        };
        this.createGraph();
    }

    createGraph = function (){
        var _this=this;

        mockApi.getRadarData().then(json=>{
            log("received json=>",json);
            var data = [];
            ["score","companyScore","generalScore"].forEach(scoreType=>{
                var layerData = [];
                layerData = json[scoreType].map(valueItem=>{
                    return {
                        axis:valueItem.category,
                        value:valueItem.score
                    }
                });
                data.push(layerData);
            });
            _this.setState({
                data:data,
                dataLoaded:true
            })
        });
    };
    getContent = function (){
        if(this.state.dataLoaded) {
            return <Radar data={this.state.data}/>
        }
        else {
            return <LinearProgress mode="indeterminate" color="red"
            />
        }
    };
    render = ()=>{æ
        return (
            <div>
                {this.getContent()}

            </div>
        )
    }
}