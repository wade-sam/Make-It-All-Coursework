import React, {Component} from 'react';
import HardwareItem from './HardwareItem';
import axios from "axios";

class HardwareGroup extends Component {
    constructor (props) {
        super(props);

        this.state =  {
            hardwares: [],
        }
    }

    componentWillMount() {
        // Geting the list of hardware assets from the API and storing them in state
        axios.get('/api/assets/hardware').then(res => {
            this.setState({
                hardwares: res.data,
            });
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { hardwares } = this.state;

        return (
            <div className="container card asset-card">
                <h1>Hardware</h1>

                {
                    // Map through hardware assets list and render each one of them in the HardwareItem component
                    hardwares ? (
                        hardwares.map(hardware => {
                            return (
                                <HardwareItem
                                    title={hardware.type}
                                    make={hardware.make}
                                    serialNo={hardware.serial_number}
                                    key={hardware.serial_number}
                                />
                            )
                        })
                    ) : null
                }
            </div>
        );
    }
}

export default HardwareGroup;