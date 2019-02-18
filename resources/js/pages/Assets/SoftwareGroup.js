import React, {Component} from 'react';
import SoftwareItem from './SoftwareItem';
import axios from "axios";
import HardwareItem from "./HardwareItem";

class SoftwareGroup extends Component {
    constructor (props) {
        super(props);

        this.state =  {
            softwares: [],
        }
    }

    componentWillMount() {
        // Geting the list of software assets from the API and storing them in state
        axios.get('/api/assets/software').then(res => {
            this.setState({
                softwares: res.data,
            });
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { softwares } = this.state;

        return (
            <div className="container card asset-card">
                <h1>Software</h1>

                {
                    // Map through software assets list and render each one of them in the SoftwareItem component
                    softwares ? (
                        softwares.map(software => {
                            return (
                                <SoftwareItem
                                    title={software.software_name}
                                    license={software.software_licence}
                                    key={software.software_licence}
                                />
                            )
                        })
                    ) : null
                }


            </div>
        );
    }
}

export default SoftwareGroup;