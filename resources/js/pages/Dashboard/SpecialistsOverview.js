import React, { Component } from 'react';

import Specialist from './Specialist';
import axios from "axios";

class SpecialistsOverview extends Component {
    constructor (props) {
        super(props);

        this.state =  {
            activeSpecialists: [],
            inactiveSpecialists: [],
        }
    }

    componentWillMount() {
        axios.get('/api/dashboard/specialistsStatus').then(res => {
            const activeSpecialists = res.data.filter(specialist => specialist.specialist_status === 'Active');
            const inactiveSpecialists = res.data.filter(specialist => specialist.specialist_status === 'Inactive');

            this.setState({
                activeSpecialists: activeSpecialists,
                inactiveSpecialists: inactiveSpecialists
            })

        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { status } = this.props;
        const { activeSpecialists, inactiveSpecialists } = this.state;

        return (
            <div className="container card specialists-overview">
                <div className="row">
                    <h2>{this.props.title}</h2>
                </div>
                <div className="row">
                    {
                        status === 'active' ? (
                            activeSpecialists.map((specialist, i) => {
                                return (
                                    <Specialist
                                        name={`${specialist.first_name} ${specialist.last_name}`}
                                        photo="https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-512.png"
                                        wip='wip'
                                        overdue='odue'
                                        key={i}
                                    />
                                )
                            })
                        ) : (
                            inactiveSpecialists.map((specialist, i) => {
                                return (
                                    <Specialist
                                        name={`${specialist.first_name} ${specialist.last_name}`}
                                        photo="https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-512.png"
                                        wip='wip'
                                        overdue='odue'
                                        key={i}
                                    />
                                )
                            })
                        )
                    }

                </div>
            </div>
        );
    }
}

export default SpecialistsOverview;
