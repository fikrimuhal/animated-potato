/**
 * Created by MYigit on 10.8.2016.
 */
//core imports
import React from 'react'
import Spinner from 'react-spin';
export default  class  WaitingPanel extends  React.Component{
    constructor(props){
    super(props)
    }
    render = ()=>{
        var spinCfg = {
            lines: 5 // The number of lines to draw
            , length: 0 // The length of each line
            , width: 35 // The line thickness
            , radius: 10 // The radius of the inner circle
            , scale: 0.5 // Scales overall size of the spinner
            , corners: 1 // Corner roundness (0..1)
            , color: 'rgb(0, 188, 212)' // #rgb or #rrggbb or array of colors
            , opacity: 0.2 // Opacity of the lines
            , rotate: 26 // The rotation offset
            , direction: 1 // 1: clockwise, -1: counterclockwise
            , speed: 1 // Rounds per second
            , trail: 95 // Afterglow percentage
            , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
            , zIndex: 2e9 // The z-index (defaults to 2000000000)
            , className: 'spinner' // The CSS class to assign to the spinner
            , top: '25%' // Top position relative to parent
            , left: '50%' // Left position relative to parent
            , shadow: false // Whether to render a shadow
            , hwaccel: true // Whether to use hardware acceleration
            , position: 'absolute' // Element positioning
        };
    return(
    <div>
        <Spinner config={spinCfg} />
    </div>
    )
    }
}