import React, {Component} from 'react';

import Nav from '../../components/Nav';
import Profile from '../../components/Profile';
import AnalyticsItem from './AnalyticsItem';
import axios from "axios";

// const itemData = [
//     {
//         title: "Avg query resolving time",
//         number: 4.5,
//         unit: 'days',
//     }
// ];


class Analytics extends Component {
    constructor (props) {
        super(props);

        this.state =  {
            queriesToday: 0,
            closeWeek: 0,
            typeWeek: []
        }
    }

    componentWillMount() {
        // Get analytics from the API:

        axios.get('/api/analytics/queriesToday').then(res => {
            // Store the queries in state
            this.setState({
                queriesToday: res.data,
            });
        }).catch(err => {
            console.log(err);
        })

        axios.get('/api/analytics/closeWeek').then(res => {
            // Store the queries in state
            this.setState({
                closeWeek: res.data,
            });
        }).catch(err => {
            console.log(err);
        })

        axios.get('/api/analytics/typeWeek').then(res => {
            // Store the queries in state
            this.setState({
                typeWeek: res.data[0].type,
            });
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const {queriesToday, closeWeek, typeWeek} = this.state;

        return (
            <div className="page" id="assets">
                <Nav />
                <Profile />
                <h1> Analytics </h1>
                <AnalyticsItem
                    title="Queries Today:"
                    number={queriesToday}
                />
                <AnalyticsItem
                    title="Close Week:"
                    number={closeWeek}
                />
                <AnalyticsItem
                    title="Type This Week:"
                    number={typeWeek}
                />
            </div>
        );
    }
}

export default Analytics;