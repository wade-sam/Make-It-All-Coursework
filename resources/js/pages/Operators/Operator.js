import React, { Component } from 'react';

class Operator extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <img width="40px" src={this.props.photo} alt="Profile Picture" />
                    </div>
                    <div className="col-md-7">
                        <h4>{this.props.name}</h4>
                        <span>{this.props.overdue}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Operator;