import React, {Component} from 'react';

class Query extends Component {
    render() {
        const {hardware, serialNo, title, id, reporter, reportDate, dueDate, specialist, priority, status} = this.props;

        return (
            <div className="container card query-card">
                <div className="row">
                    <span className="key-tag">{hardware}</span>
                    <span className="key-tag">{serialNo}</span>
                </div>
                <div className="row">
                    <h2>{title} #{id}</h2>
                </div>
                <div className="row">
                    <div className="col-md-3">Reporter: {reporter}</div>
                    <div className="col-md-3">Reported: {reportDate}</div>
                    <div className="col-md-3">Due: {dueDate}</div>
                </div>
                <div className="additional-info-right">
                    <p>{priority}</p>
                    <p>{status}</p>
                    <p>{specialist}</p>
                </div>
            </div>
        );
    }
}

export default Query;