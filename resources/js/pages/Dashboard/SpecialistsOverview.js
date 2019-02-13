import React, { Component } from 'react';

import Specialist from './Specialist';

const specialist = [
    {
        name: 'John Doe',
        photo: 'https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-512.png',
        wip: 3,
        overdue: 5,
    }
];

class SpecialistsOverview extends Component {
    render() {
        return (
            <div className="container card specialists-overview">
                <div className="row">
                    <h2>{this.props.title}</h2>
                </div>
                <div className="row">
                    <Specialist
                        name={specialist[0].name}
                        photo={specialist[0].photo}
                        wip={specialist[0].wip}
                        overdue={specialist[0].overdue}
                    />
                </div>
            </div>
        );
    }
}

export default SpecialistsOverview;