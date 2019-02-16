import React, { Component } from 'react';

class Specialist extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <img width="40px" src={this.props.photo} alt="Profile Picture" />
                    </div>
                    <div className="col-md-8">
                        <h4>{this.props.name}</h4>
                        <span><i className="fas fa-tools" /> {this.props.wip}</span>
                        <span><i className="far fa-clock" /> {this.props.overdue}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Specialist;