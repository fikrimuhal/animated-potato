/**
 * Created by MYigit on 5.10.2016.
 */
import React from 'react'
export default  class PieView extends React.Component {
    constructor(props) {
        super(props)
    }

    render = ()=> {
        return (
            <div>
                Pieview
            </div>
        )
    }
}

PieView.propTypes = {
    data: React.PropTypes.object.isRequired
}