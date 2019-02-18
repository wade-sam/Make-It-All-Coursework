import React, { Component } from 'react';
import axios from 'axios';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import Logo from '../../images/logo.png';


export default class Login extends Component {
    constructor (props) {
        super(props);

        this.state =  {
            username: '',
            pass: '',
            usernames: [],
            passwords: [],
            authorisedPass: true,
            authorisedUser: false,
        }
    }

    onSubmit () {
        axios.get('/api/login').then(res => {
            // Store usernames and passwords in constants
            res.data.map(user => {
                this.setState({
                    usernames: [...this.state.usernames, user.username],
                    passwords: [...this.state.passwords, user.password],
                })
            });

            // Call the login function
            this.login();
        }).catch(err => {
            console.log(err);
        })
    }

    login() {
        // Map through all the usernames and check whether the current username is there
        this.state.usernames.map(username => {
            if (this.state.username === username) {
                this.setState({
                    authorisedUser: true,
                });
            }
        });

        // Map through all the passwords and check whether the current password is there
        this.state.passwords.map(password => {
            if (this.state.password === password) {
                this.setState({
                    authorisedPass: true,
                });
            }
        });
    }

    // Save the username in state as the user is typing
    handleUsername (event) {
        this.setState({username: event.target.value});
    }

    // Save the password in state as the user is typing
    handlePass (event) {
        this.setState({pass: event.target.value});
    }

    render() {
        const {username, pass, authorisedPass, authorisedUser} = this.state;

        return (
            <div className="container-fluid" id="login">
                <div className="container">
                    <img src={Logo} alt="Logo" width='15%'/>

                    <Form
                        id="login-form"
                        onSubmit={() => this.onSubmit()}
                    >
                        <Form.Field>
                            <input placeholder='Username' value={username} onChange={(e) => this.handleUsername(e)} />
                        </Form.Field>
                        <Form.Field>
                            <input type="password" placeholder='Password' value={pass} onChange={(e) => this.handlePass(e)} />
                        </Form.Field>

                        {
                            // If the username and password are correct, login and redirect to dashboard
                            authorisedPass && authorisedUser ? (
                                <Redirect to="/dashboard"/>
                            ) : null
                        }

                        <Button type='submit'>
                            Log In
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

