import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";


class QueryOverview extends Component {
    constructor (props) {
        super(props);

        this.state =  {
            high: 0,
            medium: 0,
            low: 0,
        }
    }

    componentWillMount() {
        // Axios get request to get the queries list from the API
        axios.get('/api/dashboard/queriesOverview').then(res => {
            // Group queries based on priority and save each group in a variable
            const high = res.data.filter(query => query.priority === 'High');
            const medium = res.data.filter(query => query.priority === 'Medium');
            const low = res.data.filter(query => query.priority === 'Low');

            // Count each priority group and save number in state
            this.setState({
                high: high.length,
                medium: medium.length,
                low: low.length,
            })

        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const {high, medium, low} = this.state;

        return (
            <div className="container card" id="queries-overview">
                <div className="row">
                    <h2>Queries overview:</h2>
                    {
                        this.props.type === 'Operator' ? (
                            <span id="add-new-btn"><Link to="/query"> Add new + </Link></span>
                        ) : null
                    }
                </div>
                <div className="row query-numbers">
                    <div className="col-sm-4">
                        <h3>High</h3>
                        {/*Render the number of queries of high priority*/}
                        <span>{high}</span>
                    </div>
                    <div className="col-sm-4">
                        <h3>Medium</h3>
                        {/*Render the number of queries of medium priority*/}
                        <span>{medium}</span>
                    </div>
                    <div className="col-sm-4">
                        <h3>Low</h3>
                        {/*Render the number of queries of low priority*/}
                        <span>{low}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default QueryOverview;