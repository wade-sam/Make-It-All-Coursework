import React, {Component} from 'react';

import Nav from '../../components/Nav';
import Profile from '../../components/Profile';
import QueryOverview from './QueryOverview';
import SpecialistsOverview from './SpecialistsOverview';
import axios from "axios";

class Dashboard extends Component {
    constructor (props) {
        super(props);

        this.state =  {
            userData: [{
                name: '',
                type: '',
                username: '',
                password: '',
            }],
        }
    }

    componentWillMount() {
        axios.get('/api/login').then(res => {
            this.setState({
                userData: res.data.filter(user => {
                    return user.username === this.props.location.state.username;
                })
            });
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { userData } = this.state;
        let initials = userData[0].name.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

        return (
            <div className="page" id="dashboard">
                {/*Render the nav and profile components*/}
                <Nav />
                <Profile
                    initials={initials}
                    type={userData[0].type}
                />
                <h1>Welcome, {userData[0].name}</h1>
                {/*Render the query overview component*/}
                <QueryOverview type={userData[0].type} />
                {/*Render the specialist overview component twice for active and inactive specialists*/}
                <SpecialistsOverview title="Online Specialists" status="active" />
                <SpecialistsOverview title="Offline Specialists" status="inactive" />
            </div>
        );
    }
}

export default Dashboard;