import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <Container>
                <nav>
                    <ul>
                        <li>
                            <Link to="/dashboard"><i className="fas fa-home" /></Link>
                        </li>
                        <li>
                            <Link to="/queries"><i className="fas fa-bug" /></Link>
                        </li>
                        <li>
                            <Link to="/assets"><i className="fas fa-layer-group" /></Link>
                        </li>
                        <li>
                            <Link to="/analytics"><i className="fas fa-chart-pie" /></Link>
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