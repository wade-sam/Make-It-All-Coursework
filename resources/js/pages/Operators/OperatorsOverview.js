import React, { Component } from 'react';

import Operator from './Operator';
import axios from "axios";

class OperatorsOverview extends Component {
    constructor (props) {
        super(props);

        this.state =  {
            activeOperators: [],
            inactiveOperators: [],
        }
    }

    componentWillMount() {
        axios.get('/api/operators/status').then(res => {
            const activeOperators = res.data.filter(operator => operator.operator_status === 'Active');
            const inactiveOperators = res.data.filter(operator => operator.operator_status === 'Inactive');

            this.setState({
                activeOperators: activeOperators,
                inactiveOperators: inactiveOperators
            })

        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { status } = this.props;
        const { activeOperators, inactiveOperators } = this.state;

        return (
            <div className="container card operators-overview">
                <div className="row">
                    <h2>{this.props.title}</h2>
                </div>
                <div className="row">
                    {
                        status === 'active' ? (
                            activeOperators.map((operator, i) => {
                                return (
                                    <Operator
                                        name={`${operator.first_name} ${operator.last_name}`}
                                        photo="https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-512.png"
                                        key={i}
                                    />
                                )
                            })
                        ) : (
                            inactiveOperators.map((operator, i) => {
                                return (
                                    <Operator
                                        name={`${operator.first_name} ${operator.last_name}`}
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

export default OperatorsOverview;