import React, {Component} from 'react';

class OSGroup extends Component {
    render() {
        const {title, number, unit} = this.props;

        return (
            <div className="container card analytics-card">
                <h4>{title}</h4>
                <h2>{number}</h2>
                <h2>{unit}</h2>
            </div>
        );
    }
}

export default OSGroup;