import React, {Component} from 'react';

import SoftwareItem from './SoftwareItem';

const itemData = [
    {
        title: "John Doe's Laptop",
        license: "Lorem ipsum license",
        serialNo: 2455,
    }
];

class SoftwareGroup extends Component {
    render() {
        return (
            <div className="container card asset-card">
                <h1>Software</h1>
                <SoftwareItem
                    title={itemData[0].title}
                    license={itemData[0].license}
                    serialNo={itemData[0].serialNo}
                />
            </div>
        );
    }
}

export default SoftwareGroup;