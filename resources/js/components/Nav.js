import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    render() {
        const {user} = this.props;

        return (
            <Container>
                {/*Nav component, which is later rendered on every page*/}
                <nav>
                    <ul>
                        <li>
                            <Link
                                to={{
                                    pathname: '/dashboard',
                                    state: {
                                        username: user
                                    }
                                }}
                            >
                                <i className="fas fa-home" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={{
                                    pathname: '/queries',
                                    state: {
                                        username: user
                                    }
                                }}
                            >
                                <i className="fas fa-bug" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={{
                                    pathname: '/assets',
                                    state: {
                                        username: user
                                    }
                                }}
                            ><i className="fas fa-layer-group" /></Link>
                        </li>
                        <li>
                            <Link
                                to="/analytics">
                                <i className="fas fa-chart-pie" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/operators"><i className="fas fa-headset" /></Link>
                        </li>
                    </ul>
                </nav>
            </Container>
        );
    }
}

export default Nav;