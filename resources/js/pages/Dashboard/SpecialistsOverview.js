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
        // Axios get request to get the specialists list from the API
        axios.get('/api/dashboard/specialistsStatus').then(res => {
            // Filter them based on status, i.e active and inactive and store results in constants
            const activeSpecialists = res.data.filter(specialist => specialist.personel_status === 'Active');
            const inactiveSpecialists = res.data.filter(specialist => specialist.personel_status === 'Inactive');

            // Save those constants in state
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
                        // Render only the active operators:
                        status === 'active' ? (
                            activeSpecialists.map((specialist, i) => {
                                return (
                                    <Specialist
                                        name={specialist.name}
                                        photo="https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-512.png"
                                        key={i}
                                    />
                                )
                            })
                        ) : (
                            // Render only the inactive operators:
                            inactiveSpecialists.map((specialist, i) => {
                                return (
                                    <Specialist
                                        name={specialist.name}
                                        photo="https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-512.png"
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
