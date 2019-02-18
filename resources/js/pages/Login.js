import React, { Component } from 'react';
import axios from 'axios';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png';


export default class Login extends Component {
    constructor (props) {
        super(props);

        this.state =  {
            username: '',
            pass: '',
        }
    }

    onSubmit () {
        //console.log(this.state);
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
        const {username, pass} = this.state;
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
                        <Button type='submit'>
                            {/*<Link to="/dashboard">*/}
                            Log In
                            {/*</Link>*/}
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

