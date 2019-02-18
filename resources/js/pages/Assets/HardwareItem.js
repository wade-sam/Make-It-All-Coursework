import React, {Component} from 'react';

class HardwareItem extends Component {
    render() {
        // Getting the props from HardwareGroup.js
        const {title, make, serialNo} = this.props;
        
        return (
            <div className="container asset">
                <h3>{title}</h3>
                <p>Make: {make}</p>

                <span className="serial-no">{serialNo}</span>
            </div>
        );
    }
}

export default HardwareItem;