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
        axios.get('/api/query').then(res => {
            this.setState({
                queries: res.data,
            });
        }).catch(err => {
            console.log(err);
        })
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
                        queries.map(query => {
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
