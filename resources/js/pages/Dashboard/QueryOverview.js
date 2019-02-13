import React, { Component } from 'react';

const queryNum = [
    {
        high: 7,
        medium: 5,
        low: 3,
    }
];

class QueryOverview extends Component {
    render() {
        return (
            <div className="container card" id="queries-overview">
                <div className="row">
                    <h2>Queries overview:</h2>
                </div>
                <div className="row query-numbers">
                    <div className="col-sm-4">
                        <h3>High</h3>
                        <span>{queryNum[0].high}</span>
                    </div>
                    <div className="col-sm-4">
                        <h3>Medium</h3>
                        <span>{queryNum[0].medium}</span>
                    </div>
                    <div className="col-sm-4">
                        <h3>Low</h3>
                        <span>{queryNum[0].low}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default QueryOverview;