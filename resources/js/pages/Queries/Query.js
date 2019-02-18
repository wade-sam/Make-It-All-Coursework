import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Query extends Component {
    render() {
        const {hardware, type, title, id, reporter, reportDate, dueDate, specialist, priority, status, deleteQuery} = this.props;

        return (
            <Link to={`/queries/${id}`}>
                <div className="container card query-card" onClick={this.expandQuery}>
                    <div className="row">
                        <span className="key-tag">{hardware}</span>
                        <span className="key-tag">{type}</span>
                        <span className="delete-query" onClick={deleteQuery}><i className="fas fa-trash bin-icon" /></span>
                    </div>
                    <div className="row">
                        <h2>{title} #{id}</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-3"><b>Reporter:</b> {reporter}</div>
                        <div className="col-md-3"><b>Reported:</b> {reportDate}</div>
                        <div className="col-md-3"><b>Due:</b> {dueDate}</div>
                    </div>
                    <div className="additional-info-right">
                        <p><i className="fas fa-exclamation-triangle" />{priority}</p>
                        <p><i className="fas fa-chart-line" /> {status}</p>
                        <p><i className="fas fa-user" /> {specialist}</p>
                    </div>
                </div>
            </Link>

        );
    }
}

export default Query;