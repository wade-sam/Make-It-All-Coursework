import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from "react-router-dom";

import Login from './pages/Login';
import Dashboard from "./pages/Dashboard/Dashboard";
import Queries from "./pages/Queries/Queries";
import Assets from "./pages/Assets/Assets";
import Analytics from "./pages/Analytics/Analytics";
import Operators from "./pages/Operators/Operators";
import AddQuery from "./pages/Query/AddQuery";

export default class Index extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="main-app">
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/queries" component={Queries} />
                    <Route exact path="/assets" component={Assets} />
                    <Route exact path="/analytics" component={Analytics} />
                    <Route exact path="/operators" component={Operators} />
                    <Route exact path="/" component={AddQuery} />
                </div>
            </BrowserRouter>
        );
    }
}

if (document.getElementById('App')) {
    ReactDOM.render(<Index />, document.getElementById('App'));
}
