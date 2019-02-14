import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Nav from '../../components/Nav';
import Profile from '../../components/Profile';
import Query from './Query';


const queryData = [
    {
        hardware: 'Printer',
        serialNo: 23,
        title: 3,
        id: 5566,
        reporter: 'John Doe',
        reportDate: '10.10.2019',
        dueDate: '20.11.2019',
        specialist: 'Olivia Oliver'
    }
];

class Queries extends Component {
    constructor (props) {
        super(props);

        this.state =  {
            query: [],
        }
    }

    componentWillMount() {
        axios.get('/api/query').then(res => {
            this.setState({
               query: res.data,
            });
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="page" id="queries">
                <Nav />
                <Profile />
                <h1> Queries </h1>
                <span><Link to="/query"> Add new + </Link></span>
                <Query
                    hardware={queryData[0].hardware}
                    serialNo={queryData[0].serialNo}
                    title={queryData[0].title}
                    id={queryData[0].id}
                    reporter={queryData[0].reporter}
                    reportDate={queryData[0].reportDate}
                    dueDate={queryData[0].dueDate}
                    specialist={queryData[0].specialist}
                />
            </div>
        );
    }
}

export default Queries;