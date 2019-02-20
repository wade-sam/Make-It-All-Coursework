import React, { Component } from 'react';
import { Container} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class Profile extends Component {
    // Profile component which is later rendered on every page

    render() {
        return (
            <Container id="profile">
                <div className="row">
                    <div className="col-sm-5">
                        <img width="60px" src="https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-512.png" alt="profile-pic"/>
                        <div className="user-type">{this.props.type}</div>
                    </div>
                    <div className="col-sm-7">
                        <h1>{this.props.initials}</h1>
                        <Link to="/">Log out</Link>
                    </div>
                </div>
            </Container>
        );
    }
}

export default Profile;