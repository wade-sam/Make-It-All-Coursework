import React, { Component } from 'react';
import axios from 'axios';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    render() {
        return (
            <div className="container-fluid" id="login">
                <div className="container">
                    <h1>Logo</h1>

                    <Form
                        id="login-form"
                        onSubmit={this.onSubmit}
                    >
                        <Form.Field>
                            <input placeholder='Username' />
                        </Form.Field>
                        <Form.Field>
                            <input placeholder='Password' />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label='Remember me' />
                        </Form.Field>
                        <Button type='submit'><Link to="/dashboard">Log In</Link></Button>
                    </Form>
                </div>
            </div>
        );
    }
}

