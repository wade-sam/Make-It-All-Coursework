import React, {Component} from 'react';

class OSItem extends Component {
    render() {
        // Getting the props from OSroup.js
        const {title, id} = this.props;

        return (
            <div className="container asset">
                <h3>{title}</h3>

                <span className="serial-no">{id + 1}</span>
            </div>
        );
    }
}

export default OSItem;