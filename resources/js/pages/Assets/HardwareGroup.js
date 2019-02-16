import React, {Component} from 'react';
import HardwareItem from './HardwareItem';
import axios from "axios";
import Query from "../Queries/Query";

const itemData = [
    {
        title: "John Doe's Laptop",
        location: "Lorem ipsum loc",
        make: "Lorem ipsum make",
        serialNo: 245,
    }
];

class HardwareGroup extends Component {
    constructor (props) {
        super(props);

        this.state =  {
            hardwares: [],
        }
    }

    componentWillMount() {
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