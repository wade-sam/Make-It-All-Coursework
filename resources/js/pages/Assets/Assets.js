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
                {/*Generating hardware, software and OS items in different components*/}
                <div className="row">
                    <div className="col-md-4"><HardwareGroup /></div>
                    <div className="col-md-4"><SoftwareGroup /></div>
                    <div className="col-md-4"><OSGroup /></div>
                </div>
            </div>
        );
    }
}

export default Assets;