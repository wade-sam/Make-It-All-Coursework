import React, {Component} from 'react';

class OSItem extends Component {
    render() {
        const {title} = this.props;

        return (
            <div className="container asset">
                <h3>{title}</h3>
            </div>
        );
    }
}

export default OSItem;