import React, {Component} from 'react';

import Nav from '../../components/Nav';
import Profile from '../../components/Profile';
import HardwareGroup from './HardwareGroup';
import SoftwareGroup from './SoftwareGroup';
import OSGroup from './OSGroup';

class Assets extends Component {
    render() {
        return (
            <div className="page" id="assets">
                <Nav />
                <Profile />
                <h1> Assets </h1>
                <HardwareGroup />
                <SoftwareGroup />
                <OSGroup />
            </div>
        );
    }
}

export default Assets;