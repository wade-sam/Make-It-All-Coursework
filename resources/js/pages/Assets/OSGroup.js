import React, {Component} from 'react';

import OSItem from './OSItem';

const itemData = [
    {
        title: "Linux",
        license: "Lorem ipsum license",
        serialNo: 897,
    }
];

class OSGroup extends Component {
    render() {
        return (
            <div className="container card asset-card">
                <h1>OS</h1>
                <OSItem
                    title={itemData[0].title}
                    license={itemData[0].license}
                    serialNo={itemData[0].serialNo}
                />
            </div>
        );
    }
}

export default OSGroup;