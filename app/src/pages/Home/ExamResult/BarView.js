/**
 * Created by MYigit on 5.10.2016.
 */
import React from 'react'
export default  class BarView extends React.Component {
    constructor(props) {
        super(props)
    }

    render = ()=> {
        return (
            <div>
                BarView
            </div>
        )
    }
}

BarView.propTypes = {
    data: React.PropTypes.object.isRequired
}