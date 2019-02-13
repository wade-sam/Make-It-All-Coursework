import React, { Component } from 'react';

import Operator from './Operator';

const specialist = [
    {
        name: 'John Doe',
        photo: 'https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-512.png',
        engagement: 'Currently in Call',
    }
];

class OperatorsOverview extends Component {
    render() {
        return (
            <div className="container card operators-overview">
                <div className="row">
                    <h2>{this.props.title}</h2>
                </div>
                <div className="row">
                    <Operator
                        name={specialist[0].name}
                        photo={specialist[0].photo}
                        engagement={specialist[0].engagement}
                    />
                </div>
            </div>
        );
    }
}

export default OperatorsOverview;