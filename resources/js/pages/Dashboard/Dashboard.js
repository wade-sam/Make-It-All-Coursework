import React, {Component} from 'react';

import Nav from '../../components/Nav';
import Profile from '../../components/Profile';
import QueryOverview from './QueryOverview';
import SpecialistsOverview from './SpecialistsOverview';

class Dashboard extends Component {
    render() {
        return (
            <div className="page" id="dashboard">
                <Nav />
                <Profile />
                <h1>Welcome, Simona</h1>
                <QueryOverview />
                <SpecialistsOverview title="Online Specialists" />
                <SpecialistsOverview title="Offline Specialists" />
            </div>
        );
    }
}

export default Dashboard;