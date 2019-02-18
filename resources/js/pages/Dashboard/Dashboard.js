import React, {Component} from 'react';

import Nav from '../../components/Nav';
import Profile from '../../components/Profile';
import QueryOverview from './QueryOverview';
import SpecialistsOverview from './SpecialistsOverview';

class Dashboard extends Component {
    render() {
        return (
            <div className="page" id="dashboard">
                {/*Render the nav and profile components*/}
                <Nav />
                <Profile />
                <h1>Welcome, Simona</h1>
                {/*Render the query overview component*/}
                <QueryOverview />
                {/*Render the specialist overview component twice for active and inactive specialists*/}
                <SpecialistsOverview title="Online Specialists" status="active" />
                <SpecialistsOverview title="Offline Specialists" status="inactive" />
            </div>
        );
    }
}

export default Dashboard;