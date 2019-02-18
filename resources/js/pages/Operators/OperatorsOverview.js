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
        // Getting the operators list from the API
        axios.get('/api/operators/status').then(res => {
            // Filtering based on status, i.e active and inactive and storing both lists in constants
            const activeOperators = res.data.filter(operator => operator.personel_status === 'Active');
            const inactiveOperators = res.data.filter(operator => operator.personel_status === 'Inactive');

            // Saving those constants in state
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
                        // Mapping through all the ACTIVE operators and displaying them through the Operator component
                        status === 'active' ? (
                            activeOperators.map((operator, i) => {
                                return (
                                    <Operator
                                        name={operator.name}
                                        photo="https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-512.png"
                                        key={i}
                                    />
                                )
                            })
                        ) : (
                            // Mapping through all the INACTIVE operators and displaying them through the Operator component
                            inactiveOperators.map((operator, i) => {
                                return (
                                    <Operator
                                        name={operator.name}
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