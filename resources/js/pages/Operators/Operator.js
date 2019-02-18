import React, { Component } from 'react';

class Operator extends Component {
    render() {
        // Getting props from OperatorsOverview.js
        const {name, overdue, photo} = this.props;

        return (
            <div className="container operator">
                <div className="row">
                    <div className="col-md-3">
                        <img width="40px" src={photo} alt="Profile Picture" />
                    </div>
                    <div className="col-md-7">
                        <h4>{name}</h4>
                        <span>{overdue}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Operator;