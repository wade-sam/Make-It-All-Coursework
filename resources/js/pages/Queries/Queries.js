import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Nav from '../../components/Nav';
import Profile from '../../components/Profile';
import Query from './Query';


// const queryData = [
//     {
//         hardware: 'Printer',
//         serialNo: 23,
//         title: 3,
//         id: 5566,
//         reporter: 'John Doe',
//         reportDate: '10.10.2019',
//         dueDate: '20.11.2019',
//         specialist: 'Olivia Oliver'
//     }
// ];

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
                                    hardware="Hardware"
                                    serialNo="Serial No"
                                    title={query.query_title}
                                    id={query.query_id}
                                    reporter="Reporter"
                                    reportDate={query.updated_at}
                                    dueDate={query.due_date}
                                    specialist="Specialist"
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