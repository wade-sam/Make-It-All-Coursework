import React, {Component} from 'react';

class OSItem extends Component {
    render() {
        const {title, license, serialNo} = this.props;

        return (
            <div className="container asset">
                <h3>{title}</h3>
                <p>License: {license}</p>

                <span className="serial-no">{serialNo}</span>
            </div>
        );
    }
}

export default OSItem;