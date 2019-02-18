import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Nav from '../../components/Nav';
import Profile from '../../components/Profile';
import Query from './Query';


class Queries extends Component {
    constructor (props) {
        super(props);

        this.state =  {
            queres: [],
        }
    }

    componentWillMount() {
        // Get queries list from the API
        axios.get('/api/query').then(res => {
            // Store the queries in state
            this.setState({
                queries: res.data,
            });
        }).catch(err => {
            console.log(err);
        })
    }

    // Delete query on bin icon press
    deleteQuery (id, e) {
        e.preventDefault();

        alert(`Are you sure you want to delete query ${id}`);
        console.log(id -1);

        axios.delete(`/api/query/${this.state.queries[id-1]}`);

        // Create a copy of current queries array
        const newQueries = [...this.state.queries];
        // Splice the one you want to delete
        newQueries.splice((id - 1), 1);
        // Set the state to the new queries array
        this.setState({
            queries: newQueries,
        });
    }

    render() {
        const { queries } = this.state;
        return (
            <div className="page" id="queries">
                <Nav />
                <Profile />
                <h1> Queries </h1>
                <span><Link to="/query"> Add new + </Link></span>
                {
                    queries ? (
                        // Map through all the queries to render each one of them in the Query component and pass it's properties:
                        queries.reverse().map(query => {
                            return (
                                <Query
                                    hardware={query.system_name}
                                    type={query.type}
                                    title={query.title}
                                    id={query.query_id}
                                    reporter={query.operator_name}
                                    reportDate={query.created_at}
                                    dueDate={query.due_date}
                                    specialist={query.specialist_name}
                                    priority={query.priority}
                                    status="status"
                                    key={query.query_id}
                                    deleteQuery={(e) => this.deleteQuery(query.query_id, e)}
                                />
                            )
                        })
                    ) : null
                }
            </div>
        );
    }
}

export default Queries;
