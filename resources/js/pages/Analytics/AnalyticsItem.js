import React, {Component} from 'react';

class OSGroup extends Component {
    render() {
        const {title, number, unit} = this.props;

        return (
            <div className="container card analytics-card">
                <h3>{title}</h3>
                <hr/>
                <h1>{number}</h1>
                {/*<h2>{unit}</h2>*/}
            </div>
        );
    }
}

export default OSGroup;