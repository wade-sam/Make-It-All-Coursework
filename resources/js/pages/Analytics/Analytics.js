import React, {Component} from 'react';

import Nav from '../../components/Nav';
import Profile from '../../components/Profile';
import AnalyticsItem from './AnalyticsItem';

const itemData = [
    {
        title: "Avg query resolving time",
        number: 4.5,
        unit: 'days',
    }
];

class Analytics extends Component {
    render() {
        return (
            <div className="page" id="assets">
                <Nav />
                <Profile />
                <h1> Analytics </h1>
                <AnalyticsItem
                    title={itemData[0].title}
                    number={itemData[0].number}
                    unit={itemData[0].unit}
                />
            </div>
        );
    }
}

export default Analytics;