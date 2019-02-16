import React, {Component} from 'react';

import Nav from '../../components/Nav';
import Profile from '../../components/Profile';
import OperatorsOverview from './OperatorsOverview';


class Operators extends Component {
    render() {
        return (
            <div className="page" id="assets">
                <Nav />
                <Profile />
                <h1> Operators </h1>
                <OperatorsOverview
                    title="Active Operators"
                    status="active"
                />

                <OperatorsOverview
                    title="Inactive Operators"
                    status="inactive"
                />
            </div>
        );
    }
}

export default Operators;