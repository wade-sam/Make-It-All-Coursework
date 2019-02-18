import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from "react-router-dom";
import axios from "axios";

import Login from './pages/Login';
import Dashboard from "./pages/Dashboard/Dashboard";
import Queries from "./pages/Queries/Queries";
import Assets from "./pages/Assets/Assets";
import Analytics from "./pages/Analytics/Analytics";
import Operators from "./pages/Operators/Operators";
import AddQuery from "./pages/Query/AddQuery";
import ExpandedQuery from "./pages/Query/ExpandedQuery";

// Starting point of the application with all the front-end routes
export default class Index extends Component {
    constructor (props) {
        super(props);

        this.state =  {
            queries_id: [],
        }
    }

    // Axios get request to get the queries list from the API
    componentWillMount() {
        axios.get('/api/query').then(res => {
            // Loop through all the queries to store all the IDs
            const ids = res.data.map(query => query.query_id);

            // Save all the IDs in state
            this.setState({
                queries_id: ids
            });
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { queries_id } = this.state;
        return (
            <BrowserRouter>
                {/*All the routes:*/}
                <div className="main-app">
                    <Route exact path="/" component={Login} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/queries" component={Queries} />
                    <Route exact path="/assets" component={Assets} />
                    <Route exact path="/analytics" component={Analytics} />
                    <Route exact path="/operators" component={Operators} />
                    <Route exact path="/query" component={AddQuery} />

                    {
                        // Generate a route for each individual query:
                        queries_id.map((id, i) => {
                            return (
                                <Route exact path={`/queries/${id}`} component={ExpandedQuery} key={i}/>
                            )
                        })
                    }
                </div>
            </BrowserRouter>
        );
    }
}

if (document.getElementById('App')) {
    ReactDOM.render(<Index />, document.getElementById('App'));
}
