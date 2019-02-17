import React, { Component } from 'react';

class Specialist extends Component {
    render() {
        return (
            <div className="container specialist">
                <div className="row">
                    <div className="col-md-4">
                        <img width="40px" src={this.props.photo} alt="Profile Picture" />
                    </div>
                    <div className="col-md-8">
                        <h4>{this.props.name}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default Specialist;