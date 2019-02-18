import React, {Component} from 'react';

class SoftwareItem extends Component {
    render() {
        // Getting the props from SoftwareGroup.js
        const {title, license } = this.props;

        return (
            <div className="container asset">
                <h3>{title}</h3>
                <p>License: {license}</p>
            </div>
        );
    }
}

export default SoftwareItem;