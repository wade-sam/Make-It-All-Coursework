import React, {Component} from 'react';

import HardwareItem from './HardwareItem';

const itemData = [
    {
        title: "John Doe's Laptop",
        location: "Lorem ipsum loc",
        make: "Lorem ipsum make",
        serialNo: 245,
    }
];

class HardwareGroup extends Component {
    render() {
        return (
            <div className="container card asset-card">
                <h1>Hardware</h1>
                <HardwareItem
                    title={itemData[0].title}
                    location={itemData[0].location}
                    make={itemData[0].make}
                    serialNo={itemData[0].serialNo}
                />
            </div>
        );
    }
}

export default HardwareGroup;